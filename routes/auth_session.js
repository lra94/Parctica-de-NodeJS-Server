import { Router } from "express";
import authByEmailPwd from "../helpers/auth-by-email-pwd.js";
import { nanoid } from "nanoid";
import { USER_BBDD } from "../bbdd.js";

const sessions = [];
const authSessionRouter = Router();

//login con email y password
authSessionRouter.post("/login", (req,res)=>{
    const {email, password} = req.body;

    if (!email || !password) return res.sendStatus(400);

    try {
       const {_id} =  authByEmailPwd(email, password);
        const sessionId = nanoid();
        sessions.push({sessionId, _id});

        res.cookie('sessionId', sessionId,{
            httpOnly:true
        })

        return res.send();
    } catch (error) {
        return res.sendStatus(401);
    }
})

//Solicitud autenticada con sesion para obtener el perfil del usuario
authSessionRouter.get("/profile", (req,res) => {
   // console.log(req.cookies)
    const {cookies} = req;
    if(!cookies.sessionId) return res.sendStatus(401);
    const userSession = sessions.find(session => session.sessionId === cookies.sessionId);

    if(!userSession) return res.sendStatus(401);

    const user = USER_BBDD.find(user => user._id === userSession._id);
    if(!user) return res.sendStatus(401);

    delete user.passdword;

    return res.send(user)
})

export default authSessionRouter;

