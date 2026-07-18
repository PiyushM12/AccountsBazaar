import express from "express"
import "dotenv/config"
import cors from "cors"
import {clerkMiddleware} from '@clerk/express'
import {serve} from "inngest/express"
import { inngest, functions} from './inngest/index.js'

const app = express()
app.use(express.json());
app.use(cors())
app.use(clerkMiddleware())

app.get("/",(req,res)=>res.send("Server IS live!"))

app.use("/api/inngest",serve({client:inngest,functions}))

const PORT = process.env.PORT || 3000;

app.listen(PORT,()=>console.log(`Server is Live on Port ${PORT}`))