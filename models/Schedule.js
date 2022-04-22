module.exports = (sequelize, DataTypes) => {
        const Schedule = sequelize.define('Schedule', {

            time_start: {
                type: DataTypes.TIME,
                allowNull: true,
                set(valueToBeSet) {
                    this.setDataValue('timestart', valueToBeSet)
                }
            },
            time_stop: {
                type: DataTypes.TIME,
                allowNull: true,
                set(valueToBeSet) {
                    this.setDataValue('timestop', valueToBeSet)
                }
            },
            time_date: DataTypes.DATE,
            s_sex: DataTypes.STRING,
            s_count: DataTypes.INTEGER,
            s_status: DataTypes.STRING,
            s_detail: DataTypes.STRING,
        })
        Schedule.associate = function(models) {
            Schedule.belongsTo(models.User)


        }

        return Schedule
    }
    //dont touch