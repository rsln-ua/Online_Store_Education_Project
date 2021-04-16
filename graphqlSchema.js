const { buildSchema } = require('graphql')


module.exports = buildSchema(`
type Query {
    getGoods(id: String, name: String, price: Int, category: String) : [Good]
    getGood(id: String!) : Good
    getCategories : [Category]
    getUsers : [User]
    getOrders : [Order]
    getOrder(id: String!) : Order
    login(login: String!, password: String!) : String
    getUser : User
    getUserById(id: String!) : User
    getCategoryById(id: String!) : Category
    totalPrice(goods: [String!]) : Int
}
type Mutation {
    addCategory(name: String!) : Category
    addGood(name: String!, price: Int!, category: String!, img: [String], description: String) : Good
    registerAdmin(login: String!, password: String!) : String
    register(login: String!, password: String!) : String
    createOrder(goods: String) : Order
    updateGood(id: String!, name: String!, price: Int!, img: [String], description: String) : Good
    addGood2Cart(id: String!) : GoodOrder
    removeCategory(id: String!) : String
    removeGood(id: String!) : String
}
type Category {
    id: String
    name: String
    goods: [Good]
}
type Good {
    id: String
    name: String
    price: Int
    img: [String]
    description: String
    category: Category
}
type User {
    id: String
    login: String
    orders: [Order]
}
type Order {
    id: String
    user: User
    goods: [GoodOrder]
    total: Int
    created: String
}
type GoodOrder {
    id: String
    count: Int
    price: Int
    name: String
}
`)