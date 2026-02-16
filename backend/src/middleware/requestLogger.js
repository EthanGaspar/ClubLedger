const requestLogger = (req, res, next) => {
    const start = process.hrtime()

    res.on("finish", () => {
        const [seconds, nanoseconds] = process.hrtime(start)
        const durationMs = (seconds * 1000 + nanoseconds / 1e6).toFixed(1)
        console.log(`[PERF] ${req.method} ${req.originalUrl} ${res.statusCode} — ${durationMs}ms`)
    })

    next()
}

export default requestLogger
