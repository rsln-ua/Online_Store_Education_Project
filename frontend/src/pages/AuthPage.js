import React, { useState } from 'react'
import { Form, Button, Jumbotron, Container, ButtonGroup } from 'react-bootstrap'
import { connect } from 'react-redux'
import { actionRegister, actionAuthorize } from '../redux/actionCreater'

const AuthPage = ({actionAuthorize, actionRegister}) => {

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
                    <Button variant="primary" disabled={login.length < 4 || password.length < 4} 
                    onClick={() => actionAuthorize({login, password})}>
                        Войти
                    </Button>
                </ButtonGroup>

                <ButtonGroup className="mr-2" aria-label="Second group">
                    <Button variant="success" disabled={login.length < 4 || password.length < 4} 
                        onClick={() => actionRegister({login, password})}>
                        Регистрация
                    </Button>
                </ButtonGroup>
            </Form>
        </Jumbotron>
    </Container>    
</Container>
)}

export const CAuthPage = connect( null , {actionAuthorize, actionRegister})(AuthPage)