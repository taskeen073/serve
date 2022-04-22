let {User} = require('../models')
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const { request } = require('express');

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
                    username:username,
                    password:password
                }
            })
            if(username_check){
                // if (bcrypt.compareSync(password, username_check.password))
                if(password, username_check.password)
                {
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
            // req.body.password = bcrypt.hashSync(req.body.password, saltRounds);
            // let check = await User.create(req.body)
            // res.send("register successful")
            console.log(req.body)
            let results = await User.create(req.body)
            console.log(results)
        }catch{
            res.status(400).send({
                error: "User is already registered"
            })
        }
    },

    async getUsername(req,res){
        try{
            let username = await User.findAll(
            )
            res.send(username)
        }
        catch (e) { 
            console.log(e)
        }
    },
    async gettype(req,res){
        try{ 
        let {username} = req.body
        let username_check = await User.findOne({
            where:{
                username:req.query.username
            }
        })
        console.log(req.query.username)
        res.send(username_check)
        }
        catch (e) { 
            console.log(e)
        }
    },
    async getuserid(req,res){
     try{   
         let id = req.params.id
        let user = await User.findOne({
            where:{
                id:id
            }})
        res.send(user)}

        catch (err){ 
            console.log(err)
        }

    }
}