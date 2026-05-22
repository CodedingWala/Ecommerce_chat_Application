import "dotenv/config"
import express from "express"
import cors from "cors"
import { clerkMiddleware } from "@clerk/express"
import { ClerkWebHookHandler } from "./webhooks/index.js"
import path from "node:path"
import fs from "node:fs"
const app = express()
import { getEnv } from "./lib/env.js"
const env = getEnv()

const rawJson = express.raw({ type: "application/json", limit: "1mb" })

app.post("/webhooks/clerk", rawJson, (req, res) => {
    void ClerkWebHookHandler(req, res)
})


app.use(express.json())
app.use(cors({
    origin: env.FRONTEND_URL,  // Only allow your frontend
    credentials: true
}))
app.use(clerkMiddleware())


const publicDirectory = path.join(process.cwd(), "public")
if (fs.existsSync(publicDirectory)) {
    app.use(express.static(publicDirectory))
    app.get("/(.*)", (req, res, next) => {
        if (req.method != "GET" && req.method != "HEAD") {
            next()
            return
        }
        if (req.path.startsWith("/api") || req.path.startsWith("/webhooks")) {
            next()
            return
        }
        res.sendFile(path.join(publicDirectory, "index.html"), (err) => next(err))
    })
}


app.listen(env.PORT, () => console.log("listening on port 3001"))
