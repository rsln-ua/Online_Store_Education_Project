export const query = {
  getGoods: `query {
            getGoods{
            id name price quantity category {id}
            }}`,
  getUser: `query{
    getUser{
      login id
      orders {
        created total id
      }
    }
  }`,
  getUserById: `query ($id:String!){
    getUserById(id: $id){
      login id
    }
  }`,
  getOrder: `query getOrder ($id: String!){
    getOrder(id: $id){
      total user{id} goods{
        name price count
      } created
    }
  }`,
  getOrders: `query getOrders {
    getOrders{
      id total created user{id} goods{name price count}
    }
  }`,
  getCategories: `query {
        getCategories{
          name id
        }
      }`,
  getCategoryById: `query ($id: String!){
        getCategoryById(id: $id){
          id name goods{
            name id price img description
          }
        }
      }`,
  getGood: `query getGood($id: String!){
    getGood(id: $id){
      id name price description img category{name}
    }
  }`,
  getGoods: `query getGoods{
    getGoods{
      name price id img category {
        id name
      }
    }
  }`,
  login: `query ($login: String!, $password:String!){
    login(login: $login, password: $password)
  }`,
  totalPrice: `query totalPrice($goods: [String!]){
    totalPrice(goods: $goods)
  }`,
}
export const mutation = {
  changeCart: 
    `mutation ($id: String!, $count: Int!){
        changeCart(id: $id, count: $count) 
  }`,
  addGood2Cart: 
    `mutation ($id: String!){
        addGood2Cart(id: $id) 
        {count price name id }
  }`,
  createOrder:
    `mutation createOrder($goods: String!){
      createOrder(goods: $goods){
        total user {login} goods {count name id} created
      }
    }`,
  signin: `mutation ($login: String!, $password:String!){
    register(login: $login, password: $password)
  }`,
  addGood: `mutation addGood($name:String!, $price: Int!, $category: String!, $img: [String], $des: String){
    addGood(name: $name, price: $price, category: $category, img: $img, description: $des){
    id
    }
  }`,
  updateGood: `mutation update($id: String!, $name: String, $price: Int, $img: [String], $des: String, $quantity: Int){
    updateGood(id: $id, name: $name, price: $price, img: $img, description: $des, quantity: $quantity){
      id
    }
  }`,
  removeGood: `mutation remGood($id: String!){
    removeGood(id: $id)
  }`,
  removeCategory:`mutation ($id: String!){
    removeCategory(id: $id)
  }`,
  addCategory: `mutation ($name: String!){
    addCategory(name: $name){
      id
    }
  }`,
  registerAdmin: `mutation regAdmin($login: String!, $password: String!){
    registerAdmin(login: $login, password: $password)
  }`,
}