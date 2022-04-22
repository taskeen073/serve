let {Booking} = require('../models')
let { Schedule } = require('../models')
let {User} = require('../models')

module.exports ={
async getid(req,res){
    try{
        let id = req.params.id
        let data = await Schedule.findOne({
            where:{
                id:id
            }
        })
        res.send(data)
    }
    catch (err){
        console.log(err)
      
    }
}
    ,
async getallschedules(req,res){
    try{
        let data = await Schedule.findAll({
            
        })
        res.send(data)
    }
    catch (err){

    }
}
    ,

    async testjoin(req,res){
        try{
            let a=req.body
            let data = await Booking.findAll({
                include:[{
                    model:Schedule,
                    attributes:['s_name','s_date','s_time','s_count','s_price','s_status','s_img']
                }]
            })
            res.send(data)
        }catch(err){
            console.log(err)
        }
    },
    async getactive(req,res){
        try{

            let b= await Booking.findAll({
                
                where: {b_status:'active'},

                include: [{
                    model: User,
                    where: {status: 'active'}

                },{
                    model: Schedule,
                    where: {s_status: 'active'},
                    
                    include: [{
                        model: User,
                        where: {status: 'active'}

                    }]
                }],
                
            });
            res.send(b)        }
        catch(err){
            console.log(err)
        }
    }, 
        async createschedule(req,res){
            try{
                let data = await Schedule.create(req.body)
                res.send(data)
            }catch(err){
                console.log(err)
            }
        },
        async updateschedule(req,res){
            try{
                let data = await Schedule.update(req.body,{
                    where:{
                        id:req.query.id
                    }
                })
                res.send(data)
            } catch (err){
                console.log(err)
            }
        }
}