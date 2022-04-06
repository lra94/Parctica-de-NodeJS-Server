import {Router} from "express";
import {USER_BBDD} from '../bbdd.js'

const accountRouter = Router();

//Middleware que loguea la ip
accountRouter.use((req,res, next)=>{
    console.log(req.ip)
    next()
})

//Obtener los detalles de una cuenta a partir del  _id
accountRouter.get('/:_id',(req,res)=>{
    const {_id} = req.params;
    const user = USER_BBDD.find(user => user._id === req.params._id);
    if (!user) return res.status(404).send();
    return res.send(user)
});

//Crear una cuenta nueva a partir de _id y name
accountRouter.post("/",(req,res)=>{
    const {_id, name} = req.body;
    if(!_id || !name) return res.state(400).send();

    const user = USER_BBDD.find((user) => user._id === _id);
    if (user) return res.status(409).send();

    USER_BBDD.push({
        _id,
        name
    });

   return res.send()
});

//Actualizar el nombre de una cuenta
accountRouter.patch("/:_id",(req,res)=>{
    const {_id} = req.params;
    const {name} = req.body;
    if(!name) return res.state(400).send();

    const user = USER_BBDD.find(user => user._id === _id);
    if (!user) return res.status(404).send();

    user.name = name;

    return res.send()
});

//Eliminar cuenta
accountRouter.delete("/:_id",(req,res)=>{
    const {_id} = req.params;
    const userIndex = USER_BBDD.findIndex(user => user._id === _id);
    if (!userIndex === -1) return res.status(404).send();

    USER_BBDD.splice(userIndex,1)
    return res.send()
});

export default accountRouter;