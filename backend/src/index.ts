import "dotenv/config"
import express from  "express" 
import cors from "cors"
import { clerkMiddleware } from "@clerk/express"
import { ClerkWebHookHandler } from "./webhooks/index.js"
const app= express()
import { getEnv } from "./lib/env.js"
const env=getEnv()

const rawJson=express.raw({type:"application/json",limit:"1mb"})

app.post("/webhooks/clerk",rawJson,(req,res)=>{
    void ClerkWebHookHandler(req,res)
})

 app.use(express.json())
 app.use(cors())
 app.use(clerkMiddleware())


app.listen(env.FRONTEND_URL,()=>console.log("listening on port 3001"))
