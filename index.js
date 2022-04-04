console.clear()
import express from 'express';
import dotenv from 'dotenv';
import {USER_BBDD} from './bbdd.js'

dotenv.config()

const port = 3000
const expressApp = express()

expressApp.use(express.json())
expressApp.use(express.text())

//Obtener los detalles de una cuenta a partir del  _id
expressApp.get('/account/:_id',(req,res)=>{
    const {_id} = req.params;
    const user = USER_BBDD.find(user => user._id === req.params._id);
    if (!user) return res.status(404).send();
    return res.send(user)
});

//Crear una cuenta nueva a partir de _id y name
expressApp.post("/account",(req,res)=>{
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
expressApp.patch("/account/:_id",(req,res)=>{
    const {_id} = req.params;
    const {name} = req.body;
    if(!name) return res.state(400).send();

    const user = USER_BBDD.find(user => user._id === _id);
    if (!user) return res.status(404).send();

    user.name = name;

    return res.send()
});

//Eliminar cuenta
expressApp.delete("/account/:_id",(req,res)=>{
    const {_id} = req.params;
    const userIndex = USER_BBDD.findIndex(user => user._id === _id);
    if (!userIndex === -1) return res.status(404).send();

    USER_BBDD.splice(userIndex,1)
    return res.send()
});


expressApp.listen(port, ()=>{
    console.log(`Servidor corriendo en el PUERTO ${port}`)
})

