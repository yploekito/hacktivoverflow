require('dotenv').config()
const bcrypt = require('bcryptjs')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

class userController{
    static signin(req, res){
        let {email, password} = req.body
        User
            .findOne({email:email})
            .then((oneUser)=>{
                if(oneUser){
                    if(bcrypt.compareSync(password, oneUser.password)){
                        let payload = oneUser
                        let token = jwt.sign({payload}, process.env.SECRET) //don't forget to use .env
                        res.status(200).json({
                            data: oneUser,
                            token: token
                        })
                    } else {
                        res.status(400).json({msg: 'password/email wrong'})
                    }
                }else{
                    res.status(400).json({msg:'password/email wrong'})
                }
            })
            .catch( err => {
                console.log(err)
                res.status(500).json(err)
            })
    }
    static signup(req, res){
        let inputObj = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        }
        console.log(inputObj, '---<')
        User
            .create(inputObj)
            .then((newUser)=>{
                res.json(newUser)
            })
            .catch( err => {
                console.log(err)
                res.status(500).json({error: err})
            })
    }
}
module.exports= userController