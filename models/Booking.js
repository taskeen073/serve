module.exports = (sequelize, DataTypes) => {
        const Booking = sequelize.define('Booking', {

            b_slip: DataTypes.STRING,
            b_status: DataTypes.STRING,
        })
        Booking.associate = function(models) {
            Booking.belongsTo(models.Schedule),
                Booking.belongsTo(models.User)


        }

        return Booking
    }
    //dont touch
    //dont touch