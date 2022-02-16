// @ts-nocheck
let {User} = require('../models')
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken')

function jwtSignUser(user) {
    const ONE_WEEK = 60 * 60 * 24 * 7
    return jwt.sign(user, "keen", {
        expiresIn: ONE_WEEK
    })
}
module.exports={
    async login(req,res){
        try{
            let {username, password} = req.body
            let username_check = await User.findOne({
                where:{
                    username:username
                }
            })
            if(username_check){
                if (bcrypt.compareSync(password, username_check.password)){
                    const userJson = username_check.toJSON()
                    res.send({
                        user: userJson,
                        token: jwtSignUser(userJson)
                    })

                }else{
                    res.send("password is incorrect")
                }
            }else{
                res.status(400).send("not found username")
            }
        }catch(err){
            console.log(err)
        }
    },

    async register(req,res){
        try{
            req.body.password = bcrypt.hashSync(req.body.password, saltRounds);
            let check = await User.create(req.body)
            res.send("register successful")
        }catch{
            res.status(400).send({
                error: "User is already registered"
            })
        }
    }
}