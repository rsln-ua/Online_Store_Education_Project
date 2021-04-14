import React, { useState } from 'react'
import { Form, Button, Jumbotron, Container, ButtonGroup, Alert } from 'react-bootstrap'
import { connect } from 'react-redux'
import { actionLogin, actionDataSender } from '../../redux/actionCreater'
import { history } from '../../App'
import { mutation } from '../../graphql'
import { AUTHORIZED, LOGIN_FAILED } from '../../redux/action'
import { Redirect } from 'react-router'

const AuthForm = ({actionDataSender}) => {

    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')

 return (
 <Container fluid className='auth-container'>
    <Container>
        <Jumbotron className='auth-jumb'>
            <Form>
                <Form.Group value={login} onChange={e => setLogin(e.target.value)}>
                    <Form.Label>Логин</Form.Label>
                    <Form.Control placeholder="Введите логин"/>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Пароль</Form.Label>
                    <Form.Control type="password" placeholder="Пароль" value={password} onChange={e => setPassword(e.target.value)}/>
                </Form.Group>

                <ButtonGroup className="mr-2">
                    <Button variant="success" onClick={() => 
                    actionDataSender(mutation.registerAdmin, {login, password}, () => alert("admin зарегистрирован"))}>
                        Регистрация
                    </Button>
                </ButtonGroup>
            </Form>
        </Jumbotron>
    </Container>    
</Container>
)}

export const RegisterAdminPage = connect( state => ({state: state.promise}) ,{actionDataSender})(AuthForm)