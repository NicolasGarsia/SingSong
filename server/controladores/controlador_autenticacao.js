import Express from "express";
import { User } from "../db.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

const app = Express();
app.use(Express.json());

const registroFuncao = async (req, res) => {
  try {
    const { nome, dataNascimento, email, senha } = req.body;
    if (!nome || !dataNascimento || !email || !senha) {
      return res.status(406).send({ message: "Preencha todos os campos" });
    }
    if (await User.findOne({ where: { email: email } })) {
      return res.status(418).send({ message: "Email já cadastrado" });
    }
    
    const senhaCriptografada = bcryptjs.hashSync(senha, 10);

    let novoUsuario = User.create({
      nome: nome,
      dataNascimento: dataNascimento,
      email: email,
      senha: senhaCriptografada,
    });
    return res.status(201).send({ message: "Usuário criado" });
  } catch (error) {
    return res
      .status(error)
      .send({ message: "Erro ao conectar com banco de dados" });
  }
};

const loginFuncao = async (req, res) => {
  try {
    const { email, senha } = req.body;
    if (!email || !senha) {
      return res.status(406).send({ message: "Preencha todos os campos" });
    }
    const usuario = await User.findOne({ where: { email: email } }); 
    if (!usuario) {
      return res.status(404).send({ message: "Email não encontrado" }); 
    }
    if (!bcryptjs.compareSync(senha, usuario.senha)) {
      
      return res.status(400).send("Senha incorreta");
    }
   
    const token = jwt.sign(
      { nome: usuario.nome, email: usuario.email, status: usuario.status }, 
      "chavecriptografiasupersegura",
      {
        expiresIn: "7d",
      }
    );
    
    return res
      .status(200)
      .send({ message: "Usuário logado com sucesso", token: token, id: usuario.id });
  } catch (error) {
    return res
      .status(error)
      .send({ message: "Erro ao conectar com banco de dados" });
  }
};

export { registroFuncao, loginFuncao };
