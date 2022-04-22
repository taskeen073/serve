let {Booking} = require('../models')
let { Schedule } = require('../models')
const { request } = require('express');
let {User} = require('../models')
const { Op } = require("sequelize");


module.exports ={
    async call_schedule_by_user(req,res){
        try{
  
            let b= await Booking.findAll({
                
                where: {ScheduleId: {[Op.eq]: req.body.ScheduleId},b_status:'active'},

                include: [{
                    model: User
                },{
                    model: Schedule,
                    
                    include: [{
                        model: User
                    }]
                }],
                
            });
            res.send(b)

        }
        catch (e) { 
            console.log(e)
        }
},

    async getallbook(req,res){
        try{
            let booking= await Booking.findAll({
            });
            res.send(booking)

        }
        catch (e) { 
            console.log(e)
        }

    },
    async getid(req,res){
        try{
            let booking= await Booking.findAll({
                where: {BookingId: req.body.UserId}
            })
        }
        catch(e){}
    },

    async addbook(req,res){
        try{
            let { UserId, scheduleId}= req.body
            
            let find_s = await Schedule.findOne({
                where:{
                    id:scheduleId,
                }
            })
            console.log(find_s.s_count)
            if(find_s.s_count>0){
                let booking= await Booking.create({ 
                    UserId:UserId,
                    ScheduleId:scheduleId,

                })
                let s=find_s.s_count
                let count=s-1
                
                let update_s = await Schedule.update({

                    s_count:count
                },{
                    where:{
                        id:scheduleId
                    }
                })
                res.send(booking)

            }

            // let booking= await Booking.create({
            //     ScheduleId:req.body.scheduleid,
            //     UserId:req.body.userid
            // })
            // res.send(booking)
            // console.log(booking)

        }
        catch (e) { 
            console.log(e)
        }

    }
    }