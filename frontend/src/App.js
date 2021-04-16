import React from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Header, CPrivateRoute, AdminHeader } from './components'
import { connect } from 'react-redux';
import { PENDING } from './redux/action';
import { Spinner } from 'react-bootstrap';
import { CategoriesPage, CategoryGoodsPage, GoodPage, CartPage, AuthPage, UserOrdersPage, OrderPage } from './pages'
import { APordersPage, APaddGood, APupdateGood, APregister, APuserPage, APcategories, APgoods } from './pages/AdminPages'
import {user, admin, vasyaPupkin} from "./redux/authReducer"



const AdminRouting = ({match}) => {

  const root = match.url

  return <>
    <main>
      <Route path={`${root}`} exact component={APordersPage}/>
      <Route path={`${root}/addGood`} component={APaddGood}/> 
      <Route path={`${root}/categories`} component={APcategories}/>
      <Route path={`${root}/goods`} component={APgoods}/>
      <Route path={`${root}/updateGood/:id`} component={APupdateGood}/>
      <Route path={`${root}/registerAdmin`} component={APregister}/>
    </main>
  </>
}


const Page404 = () => 
<h1>Page404</h1>

function App({state: {status}}) {
  return <>
      
      <Switch>
        <Route path="/admin" component={AdminHeader}/>
        <Route component={Header}/>
      </Switch>

      {
        status === PENDING &&

        <Spinner animation="border" role="status">
                <span className="sr-only">Loading...</span>
        </Spinner> 
      }

      <main className="overflow-scroll">
        <Switch>
            <CPrivateRoute path="/admin" roles={[admin]} component={AdminRouting}/>
            <CPrivateRoute path="/" roles={[user, vasyaPupkin]} exact component={CategoriesPage}/>
            <Redirect from="/categories" to="/"/>
            <CPrivateRoute path="/category/:id" roles={[user, vasyaPupkin]} component={CategoryGoodsPage}/>
            <CPrivateRoute path="/good/:id" roles={[user, vasyaPupkin]} component={GoodPage}/>
            <CPrivateRoute path="/user/:id" roles={[admin]} component={APuserPage}/>
            <CPrivateRoute path="/authorize" roles={[vasyaPupkin]} component={AuthPage}/>
            <CPrivateRoute path="/cart" roles={[user, vasyaPupkin]} component={CartPage}/>
            <CPrivateRoute path="/orders" roles={[user]} component={UserOrdersPage}/>
            <CPrivateRoute path="/order/:id" roles={[user, admin]} component={OrderPage}/>
            <Route component={Page404}/>
        </Switch>
      </main>

  </>
}

export default connect(state => ({state: state.promise}))(App)

