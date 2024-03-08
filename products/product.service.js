const bcrypt = require('bcryptjs');
const db = require('_helpers/db');

module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

async function getAll() {
    return await db.Product.findAll();
}

async function getById(id) {
    return await getProduct(id);
}

async function create(params) {
    //validate
    if (await db.Product.findOne({ where: {name: params.name}})) {
        throw params.name + 'is already registered';
    }

    const product = new db.Product(params);

    //save product
    await product.save();
}

async function update(id, params) {
    const product = await getProduct(id);

    //validate
    const productnameChanged = params.name && user.name !== params.name;
    if (productnameChanged && await db.Product.findOne({ where: { name: params.name}})) {
        throw 'Product name: "' + params.name + '"is already taken';
    }

    //copy params to user and save 
    Object.assign(product, params);
    await product.save();
}

async function _delete(id) {
    const product = await getProduct(id);
    await product.destroy();
}

//helper functions

async function getProduct(id) {
    const product = await db.Product.findByPk(id);
    if(!product) throw 'Product not found';
    return product;
}