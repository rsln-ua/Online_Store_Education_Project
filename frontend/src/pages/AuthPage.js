import React, { useState } from 'react'
import { Form, Button, Jumbotron, Container, ButtonGroup, Alert } from 'react-bootstrap'
import { connect } from 'react-redux'
import { actionLogin, actionDataSender } from '../redux/actionCreater'
import { mutation, query } from '../graphql'

const AuthPage = ({state: {status}, actionLogin, actionDataSender}) => {

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

                <ButtonGroup className="mr-2" aria-label="First group">
                    <Button variant="primary" onClick={() => actionDataSender(query.login, {login, password}, actionLogin)}>
                        Войти
                    </Button>
                </ButtonGroup>

                <ButtonGroup className="mr-2" aria-label="Second group">
                    <Button variant="success" onClick={() => actionDataSender(mutation.signin, {login, password}, () => alert("Регистрация прошла успешно."))}>
                        Регистрация
                    </Button>
                </ButtonGroup>
            </Form>
        </Jumbotron>
    </Container>    
</Container>
)}

export const CAuthPage = connect( state => ({state: state.auth}), { actionLogin, actionDataSender })(AuthPage)