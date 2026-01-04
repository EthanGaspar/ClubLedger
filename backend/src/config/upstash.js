const { Ratelimit }  = require("@upstash/ratelimit")
const { Redis } = require("@upstash/redis")

require("dotenv").config()

const ratelimit = new Ratelimit({
    redis: Redis.fromEnv(),
    //10 requests, per 20 second
    limiter:Ratelimit.slidingWindow(10,"20 s")
})

module.exports = ratelimit