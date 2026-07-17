import express from "express"
import "dotenv/config"
import cors from "cors"

const app = express()
app.use(express.json());
app.use(cors())

app.get("/",(req,res)=>res.send("Server IS live!"))

const PORT = process.env.PORT || 3000;

app.listen(PORT,()=>console.log(`Server is Live on Port ${PORT}`))