const mongoose = require('mongoose')
mongoose.connect("mongodb://localhost:27017/Store", { useUnifiedTopology: true, useNewUrlParser: true });

const schemas = {
    category: new mongoose.Schema({
        name: String,
        goods: [{type: mongoose.Schema.Types.ObjectId, ref: 'Good'}]
    }),
    good: new mongoose.Schema({
        name: String,
        price: Number,
        img: [String],
        description: String,
        quantity: Number,
        category: {type: mongoose.Schema.Types.ObjectId, ref: 'Category'}
    }),
    order: new mongoose.Schema({
        user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
        goods: [{id: {type: mongoose.Schema.Types.ObjectId, ref: 'Good'}, price: Number, count: Number, name: String}],
        created: Date,
        total: Number
    }),
    user: new mongoose.Schema({
        login: {
            type: String,
            unique: true,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        isAdmin: {
            type: Boolean,
            default: false
        },
        orders: [{type: mongoose.Schema.Types.ObjectId, ref: 'Order'}]
    }),
    review: new mongoose.Schema({
        text: String,
        user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
        good: {type: mongoose.Schema.Types.ObjectId, ref: 'Good'}
    })
}

const models = {
    Category: mongoose.model('Category', schemas.category),
    Good: mongoose.model('Good', schemas.good),
    User: mongoose.model('User', schemas.user),
    Order: mongoose.model('Order', schemas.order),
    Review: mongoose.model('Review', schemas.review)
}
module.exports = {models}