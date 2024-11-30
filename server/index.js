import Express from "express";
import cors from 'cors'
import { rotas_autenticacao } from "./rotas/rotasAutenticacao.js";
import { rotas_usuario } from "./rotas/rotasUsuarios.js";
import { User, criarTabelas } from "./db.js";

const app = Express();
app.use(Express.json());
app.use(cors())
app.use('/autenticacao', rotas_autenticacao)
app.use('/usuario', rotas_usuario)

// criarTabelas();

// const verificarTabelaUser = async () => {
//   try {
//     const result = await User.findOne();
//     if (result) {
//       console.log('Tabela "user" existe');
//       return true;
//     } else {
//       console.log('Tabela "user" não existe');

//       return false;
//     }
//   } catch (error) {
//     console.log('Erro ao verificar tabela "user"');
//     return false;
//   }
// };

// verificarTabelaUser()


app.listen(8000);