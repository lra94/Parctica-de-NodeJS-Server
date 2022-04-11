console.clear()
import express from 'express';
import dotenv from 'dotenv';
import accountRouter from './routes/account.js'
import authRouter from './routes/auth.js';
import authSessionRouter from  './routes/auth_session.js'
import authTokenRouter from './routes/auth_token.js'
import cookieParser from  "cookie-parser"

dotenv.config()

const port = process.env.port || 3000
const expressApp = express()

expressApp.use(cookieParser());
expressApp.use(express.json());
expressApp.use(express.text());

expressApp.use("/account",accountRouter);
expressApp.use("/auth", authRouter);

expressApp.use("/auth-token", authTokenRouter);
expressApp.use("/auth-session", authSessionRouter);


expressApp.get("/raiz",(req,res)=>{
    res.send('Raiz')
})

expressApp.listen(port, ()=>{
    console.log(`Servidor corriendo en el PUERTO ${port}`)
})

