module.exports = (sequelize, DataTypes) => {
        const User = sequelize.define('User', {
            username: {
                type: DataTypes.STRING,
                unique: true,
            },
            password: DataTypes.STRING,
            name: DataTypes.STRING,
            surname: DataTypes.STRING,
            status: DataTypes.BOOLEAN,
            type: DataTypes.STRING
        })


        return User
    }
    //dont touch