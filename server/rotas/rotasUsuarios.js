import express from "express";
import { get_user, updateImagem, updatePassword } from "../controladores/controlador_usuario.js";

const rotas_usuario = express.Router()

rotas_usuario.get('/:id', get_user)
rotas_usuario.post('/:id/updateImagem', updateImagem)
rotas_usuario.post('/:id/updatePassword', updatePassword)


export {rotas_usuario}