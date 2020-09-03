import { Router,Request,
    Response } from "express"

const usuariosRutas = Router()


// crear usuario
usuariosRutas.post('/crear', (req:Request, res:Response)=>{
    const usuario={
        nombre: req.body.nombre,
        password: req.body.password
   } 
   
   res.json({
       ok:true,
       usuario
   })
});

export default usuariosRutas