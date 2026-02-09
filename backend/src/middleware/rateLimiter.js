import rateLimit from "../config/upstash.js"

const rateLimiter = async (req,res,next) => {
    try {
        const ip = req.ip || req.connection.remoteAddress || "unknown-ip"
        const key = `ip:${ip}:route:${req.baseUrl || ""}${req.path}` //prefix to avoid collisons
        const { success, remaining, reset } = await rateLimit.limit(key)

        if (!success) {
            return res.status(429).json(
                {
                    message: "Too many requests for this route, try again later",
                    //reset and date.now are UNIX timestamps, their difference is the retry time
                    retryAfterSeconds: Math.ceil(((reset - Date.now()) / 1000))
                }
            )
        }
        res.setHeader("X-RateLimit-Remaining", remaining)
        next()
    } catch (error) {
        return res.status(500).json({ message: "Rate limiter unavailable" })
    }
}

export default rateLimiter
