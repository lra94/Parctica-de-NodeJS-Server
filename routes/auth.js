import {Router} from "express";
import {USER_BBDD} from '../bbdd.js'
import authByEmailPwd from "../helpers/auth-by-email-pwd.js";

const authRouter = Router();

//Endponit publico (No autenticado y no autorizado)
authRouter.get("/publico",(req,res)=>{
    res.send("Endpoint Publico")
})

//Endponit autenticado para todos usuario registrado
authRouter.post("/autenticado", (req,res)=>{
    const {email, password} = req.body;

    if (!email || !password) return res.sendStatus(400)

    try {
        const user = authByEmailPwd(email, password)
        return res.send(`Usurio ${user.user} esta autenticado!`)
    } catch (error) {
        return res.sendStatus(401)
    }

})

//Endponit autorizado a admin
authRouter.post("/autorizado", (req, res)=>{
    const {email, password} = req.body;

    if (!email || !password) return res.sendStatus(400);

    try {
        const user = authByEmailPwd(email, password);
        if(user.role !== 'admin') return res.sendStatus(403);
        return res.send(`Usurio Administrador ${user.user} esta autorizado!`)
    } catch (error) {
        return res.sendStatus(401)
    }
})
 

export default authRouter;
