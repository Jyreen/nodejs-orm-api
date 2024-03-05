const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        email: {type: DataTypes.STRING, allowNull: false},
        passwordHash: {type: DataTypes.STRING, allowNull: false},
        title: {type: DataTypes.STRING, allowNull: false},
        fisrtName: {type: DataTypes.STRING, allowNull: false},
        lastName: {ype: DataTypes.STRING, allowNull: false},
        role: {ype: DataTypes.STRING, allowNull: false}
    };

    const options = {
        defaultScope: {
            //exclude password hash by default
            attributes: {exclude : ['passwordHash']}
        },
        scopes : {
            //include hash with this scope
            withHash: { attributes: {},}
        }
    };

    return sequelize.define('User', attributes, options);
}