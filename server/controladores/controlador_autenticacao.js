import {User} from '../db.js'
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'

const registroFuncao = async (req, res) => {
    try {
        const { nome, dataNascimento, email, senha } = req.body
        if (!nome || !dataNascimento || !email || !senha) {
            return res.status(406).send({ message: 'Preencha todos os campos' })
        }

        if (await User.findOne({ where: { email: email } })) {
            res.status(400).send('usuario ja existe no sistema')
            return
        }
        const senhaSegura = bcryptjs.hashSync(senha, 10)
        const novoUsuario = new User({
            nome: nome,
            email: email,
            senha: senhaSegura,
            dataNascimento: dataNascimento
        })
        novoUsuario.save()
        console.log('criar user');
        return res.status(201).send({ message: 'Usuário criado' })
    } catch (error) {
        return res.status(error).send({ message: 'Erro ao conectar com banco de dados' })
    }
}

 const loginFuncao = async (req, res) => {
    try {
        const { email, senha } = req.body
        if (!email || !senha) {
            res.status(400).send("todos os campos devem ser preenchidos")
            return
        }
        const usuario = await User.findOne({ where: { email: email } })
        if (!usuario) {
            res.status(406).send('este email não está cadastrado')
            return
        }
        const senhaCorreta = bcryptjs.compareSync(senha, usuario.senha)
        if (!senhaCorreta) {
            res.status(404).send('a senha está incorreta')
            return
        }
        const token = jwt.sign(
            {
                nome: usuario.nome,
                email: usuario.email,
                status: usuario.status
            },
            'chavecriptografiasupersegura',
            {expiresIn:"30 days"}
        )

        res.status(200).send({msg:'voce foi logado', token: token})

    } catch (erro) {
        console.log(erro)
        res.status(500).send("houve um problema")
    }

}
export {registroFuncao, loginFuncao}