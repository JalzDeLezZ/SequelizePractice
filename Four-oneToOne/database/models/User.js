const {Model, DataTypes} = require('sequelize');
const sequelize = require('../db');

class User extends Model { }

User.init({
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notNull:{
                msg: 'The name is required'
            },
            isAlpha: {
                args: true,
                msg: 'Name must contain only letters'
            },
            len: {
                args: [3, 50],
                msg: 'Name must be between 3 and 50 characters'
            }
        }
    },
    email: {
        type: DataTypes.STRING,
        validate:{
            isEmail: {
                args: true,
                msg: 'Invalid email'
            }
        }
    },
    age:{
        type: DataTypes.INTEGER,
        validate:{ 
            isInt: {
                args: true,
                msg: 'Age must be a number'
            },
            min: {
                args: 18,
                msg: 'Age must be at least 18'
            },
            max: {
                args: 120,
                msg: 'Age must be at most 120'
            },
            esPar(value){
                if(value % 2){
                    throw new Error('The age must be an even number')
                }
            }
        }
    },

    // 0 ? normal user : 1 ? admin
    role: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    }
},{
    sequelize,
    modelName: 'user',
    timestamps: false
})

module.exports = User;