// @ts-nocheck
const { User } = require('./models')
const mysql = require("mysql2/promise")
const { Schedule } = require('./models')
const { Booking } = require('./models')
const { Host } = require('./models')
const { Customer } = require('./models')
const { Comment } = require('./models')
const UserControl = require('./controller/UserControl')
module.exports = (app) => {

    app.post('/login', UserControl.login)
    
    app.post('/add', async(req, res) => {
            try {
                let data = await User.create(req.body)
                res.send(data)
            } catch (e) {
                res.send("email is ready")
            }
        }),
        app.post('/adds', async(req, res) => {

            let data = await Booking.create(req.body)
            res.send(data)

        }),
        app.post('/gets', async(req, res) => {
            try {
                let data = await Schedule.findAll({
                    where: {


                        s_status: 'active'
                    }
                })
                res.send(data)
            } catch (e) {
                res.send("data is error")
            }


        }),
        app.post('/geta', async(req, res) => {
            let data;
            let a;
            let s;
            let z;
            let u;
            let { ScheduleId } = req.body
            let c = { ScheduleId }
            console.log({ ScheduleId })
            let count = await Schedule.findOne({
                attributes: ['s_count'],
                where: { id: c.ScheduleId }
            })
            console.log(count.s_count > 0)
            if (count.s_count > 0) {
                a = count.s_count - 1
                data = {
                    zata: a
                }
                s = await Booking.create(req.body)
                let { ScheduleId } = req.body

                u = await Schedule.update({
                    s_count: a
                }, { where: { id: c.ScheduleId } })

            } else {
                a = "error"
                data = {
                    zata: "error"
                }
            }
            res.send(data)
            console.log(s)
            console.log(u)
        })

    ,
    app.post("/register", UserControl.register),
        app.post("/dashboard", async(req, res) => {
            // let { ScheduleId } = req.body
            // let c = { ScheduleId }
            // let count = await Schedule.findOne({
            //     attributes: ['s_count'],
            //     where: { id: c.ScheduleId }
            // })
            // if (count.s_count > 0) {
            //     let data = await Schedule.findOne({ where: { s_status: 'active', id: c.Schedule } })
            // }
            // res.send(data)


            let { ScheduleId } = req.body
            let c = { ScheduleId }
            let a = await Schedule.findOne({ attributes: ['s_count'], where: { id: c.ScheduleId } })
            if (a.s_count > 0) {

                let data = await Schedule.findOne({ where: { s_status: 'active', id: c.ScheduleId } })
                res.send(data)
            }
            // 1 find all
            // 2 active
            // 3 day on
            // 4 s_count > 0

        }),
        app.get('/gett', async(req, res) => {
            try {
                let data = await User.findAll()
                res.send(data)
                console.log(data)
            } catch (err) {
                console.error(err)
            }
        }),
        app.post('/com', async(req, res) => {
            let { message, UserId, BookingId } = req.body
            let a = { message, UserId, BookingId }
            let data = await Booking.findOne({ where: { id: a.BookingId } })
            let comments = await Comment.create({
                message: a.message,
                BookingId: a.BookingId,
                UserId: a.UserId,
            })
            res.send(a)
            console.log(a)
        })


}