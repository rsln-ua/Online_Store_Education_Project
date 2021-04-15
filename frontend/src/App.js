import React from 'react'
import {BrowserRouter, Route, Link, Switch, Redirect} from 'react-router-dom'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { CHeader, CPrivateRoute, AdminHeader } from './components'
import { connect } from 'react-redux';
import { PENDING } from './redux/action';
import { Spinner } from 'react-bootstrap';
import { CMainPage, CCategoriesPage, CCategoryGoodsPage, CGoodPage, CCartPage, CAuthPage, CUserOrdersPage, COrderPage } from './pages'
import { COrdersPage, AddGoodPage, UpdateGoodPage, RegisterAdminPage, CUserPage, APcategories, APGoods } from './pages/AdminPage'
import {user, admin, vasyaPupkin} from "./redux/authReducer"



const AdminRouting = ({match}) => {

  const root = match.url

  return <>
    <main>
      <Route path={`${root}`} exact component={COrdersPage}/>
      <Route path={`${root}/addGood`} component={AddGoodPage}/> 
      <Route path={`${root}/categories`} component={APcategories}/>
      <Route path={`${root}/goods`} component={APGoods}/>
      <Route path={`${root}/updateGood/:id`} component={UpdateGoodPage}/>
      <Route path={`${root}/registerAdmin`} component={RegisterAdminPage}/>
    </main>
  </>
}


const Page404 = () => 
<h1>Page404</h1>

function App({state: {status}}) {
  return <>
      
      <Switch>
        <Route path="/admin" component={AdminHeader}/>
        <Route component={CHeader}/>
      </Switch>

      {
        status == PENDING &&

        <Spinner animation="border" role="status">
                <span className="sr-only">Loading...</span>
        </Spinner> 
      }

      <main className="overflow-scroll">
        <Switch>
            <CPrivateRoute path="/admin" roles={[admin]} component={AdminRouting}/>
            <CPrivateRoute path="/" roles={[user, vasyaPupkin]} exact component={CCategoriesPage}/>
            <Redirect from="/categories" to="/"/>
            <CPrivateRoute path="/category/:id" roles={[user, vasyaPupkin]} component={CCategoryGoodsPage}/>
            <Route path="/good/:id" component={CGoodPage}/>
            <CPrivateRoute path="/user/:id" roles={[admin]} component={CUserPage}/>
            <CPrivateRoute path="/authorize" roles={[vasyaPupkin]} component={CAuthPage}/>
            <CPrivateRoute path="/cart" roles={[user, vasyaPupkin]} component={CCartPage}/>
            <CPrivateRoute path="/orders" roles={[user]} component={CUserOrdersPage}/>
            <CPrivateRoute path="/order/:id" roles={[user, admin]} component={COrderPage}/>
            <Route component={Page404}/>
            {/* <CPrivateRoute path="/" roles={[user, vasyaPupkin]} exact component={CMainPage}/>
            <CPrivateRoute path="/categories" roles={[user, vasyaPupkin]} component={CCategoriesPage}/> */}
        </Switch>
      </main>

  </>
}

const CApp = connect(state => ({state: state.promise}))(App)

export default CApp
