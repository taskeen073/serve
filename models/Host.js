module.exports = (sequelize, DataTypes) => {
        const Host = sequelize.define('Host', {
            h_name: DataTypes.STRING,
            h_surname: DataTypes.STRING,
            h_email: DataTypes.STRING,
            h_tel: DataTypes.STRING,
            h_address: DataTypes.STRING,
            h_sex: DataTypes.STRING,
            h_birthday: DataTypes.DATE,
            h_religion: DataTypes.STRING,
            h_rate: DataTypes.STRING

        })
        Host.associate = function(models) {
            Host.belongsTo(models.User)

        }

        return Host
    }
    //dont touch