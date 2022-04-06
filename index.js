console.clear()
import express from 'express';
import dotenv from 'dotenv';
import accountRouter from './routes/account.js'
import authRouter from './routes/auth.js';

dotenv.config()

const port = process.env.port || 3000
const expressApp = express()

expressApp.use(express.json());
expressApp.use(express.text());
expressApp.use("/account",accountRouter);
expressApp.use("/auth", authRouter);

expressApp.get("/raiz",(req,res)=>{
    res.send('Raiz')
})

expressApp.listen(port, ()=>{
    console.log(`Servidor corriendo en el PUERTO ${port}`)
})

