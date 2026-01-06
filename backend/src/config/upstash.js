import { Ratelimit } from "@upstash/ratelimit"
import { Redis } from "@upstash/redis"
import "dotenv/config"

const ratelimit = new Ratelimit({
    redis: Redis.fromEnv(),
    //10 requests, per 20 second
    limiter:Ratelimit.slidingWindow(10,"20 s")
})

export default ratelimit
