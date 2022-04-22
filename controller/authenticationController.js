module.exports ={
    register(req,res){
       res.send({message: `hello ${req.body.username} your user is registered`})
    }
}