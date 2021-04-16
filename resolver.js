const {models} = require('./model')
const { sign } = require('jsonwebtoken');
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const salt = bcrypt.genSaltSync(10)
const key = 'key'

const root = {

    //Для админа

    addGood: async (obj, {user}) => {
        if(!user || !user.isAdmin)
        throw new Error('Гуляй Вася.')

        let newGood = new models.Good(obj)
        await newGood.save()
        let goodCategory = await models.Category.findById(obj.category)
        goodCategory.goods.push(newGood._id)
        goodCategory.save()
        return newGood
    },
    updateGood: async(obj, {user}) => {
        if(!user || !user.isAdmin)
        throw new Error('Гуляй Вася.')

        let {id} = obj
        return await models.Good.findByIdAndUpdate(id, obj).populate('category')
    },
    removeGood: async({id}, {user}) => {
        if(!user || !user.isAdmin)
        throw new Error('Гуляй Вася.')

        const good = await models.Good.findById(id)

        const category = await models.Category.findById(good.category)

        category.goods = category.goods.filter(g => g._id !== id)
        category.save()

        await models.Good.findByIdAndDelete(id)

        return JSON.stringify(id)
    },
    addCategory: async (obj, {user}) => {
        if(!user || !user.isAdmin)
        throw new Error('Гуляй Вася.')

        let newCategory = new models.Category(obj)
        await newCategory.save()
        return newCategory
    },
    removeCategory: async ({id}, {user}) => {
        if(!user || !user.isAdmin)
        throw new Error('Гуляй Вася.')

        const removed = await models.Category.findByIdAndDelete(id)
        await models.Good.deleteMany({category: mongoose.Types.ObjectId(id)})
        return JSON.stringify(removed.goods)
    },
    getUsers: async ({}, {user}) => {
        if(!user || !user.isAdmin)
        throw new Error('Гуляй Вася.')

        return await models.User.find().populate('orders')
    },
    getUserById: async({id}, {user}) => {

        if(!user || !user.isAdmin)
        return JSON.stringify('Гуляй Вася.')

        return await models.User.findById(id).populate('orders')
    },
    getOrders: async ({}, {user}) => {
        if(!user || !user.isAdmin)
        throw new Error('Гуляй Вася.')

        return await models.Order.find().populate('good').populate('user')
    },
    registerAdmin: async ({login, password}, {user}) => {
        if(!user || !user.isAdmin)
        throw new Error('Гуляй Вася.')

        if(login == '')
        throw new Error('Пустая строка.')

        if(await models.User.findOne({login: login}))
        throw new Error('login занят.')

        let newAdmin= await new models.User ({login, password: bcrypt.hashSync(password, salt), isAdmin: true})
        newAdmin.save()

        return (!!newAdmin)
    },

    //Для пользователя

    getUser: async({}, {user}) => {

        if(!user)
        throw new Error("login please")

        return await models.User.findById(user._id).populate('orders')
    },
    getOrder: async ({id}, {user}) => {

        if(!user)
        throw new Error("login please")

        const order = await models.Order.findById(id).populate('user') 

        if(order.user._id == user.id || user.isAdmin)
        return order
    },
    createOrder: async({goods}, {user}) => {
        if(!user)
        throw new Error("login please")

        const total = await root.totalPrice({goods: goods})

        goods = JSON.parse(goods)

        const order = new models.Order({
            user: user._id,
            goods: goods,
            total: total,          
            created: new Date()
        })

        await order.save()

        user.orders.push(order._id)

        await user.save()

        return await models.Order.findById(order._id).populate('goods.good').populate('user')
    },

    //Для всех

    
    addGood2Cart: async({id}) => {
        const good = await models.Good.findById(id)

        return {id: id, count: 1, price: good.price, name: good.name}
    },
    totalPrice: async({goods}) => {
        if(!goods)
            return 0

        goods = JSON.parse(goods)

        const total = await goods.reduce(
            async (total ,{id, count}) => {
                const good = await models.Good.findById(id)
                return (await total) + good.price * count
            }, 0
        )

        return total
    },
    getGoods: async (obj) => {
        return await models.Good.find(obj).populate('category')
    },
    getGood: async ({id}) => {
        return await models.Good.findById(id).populate('category')
    },
    getCategories: async ({}, {user}) => {
        return await models.Category.find().populate('goods')
    },
    getCategoryById: async ({id}) => {
        return await models.Category.findById(id).populate('goods')
    },
    register: async({login, password}) => {
        if(await models.User.findOne({login: login}))
        throw new Error('login занят.')
        if(login == '' || password == '')
        throw new Error('Пустая строка.')
        let newUser = await new models.User ({login, password: bcrypt.hashSync(password, salt)})
        newUser.save()
        return JSON.stringify('Регистрация прошла успешно.')
    },
    login: async({login, password}) => {
        let user = await models.User.findOne({login: login})
        if(!user)
        throw new Error("Пользователь не найден")

        if(!bcrypt.compareSync(password, user.password))
        throw new Error("Не верный пароль")

        return sign({sub: {id: user._id, login: user.login, role: user.isAdmin ? "admin" : "user"}}, key)
    }
}

module.exports = {
    root, key
} 