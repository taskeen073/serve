module.exports = (sequelize, DataTypes) => {
        const Comment = sequelize.define('Comment', {
            sent_date: DataTypes.DATE,
            message: DataTypes.STRING

        })
        Comment.associate = function(models) {
            Comment.belongsTo(models.User),
                Comment.belongsTo(models.Booking)

        }

        return Comment
    }
    //dont touch