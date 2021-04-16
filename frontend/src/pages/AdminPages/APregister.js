import React, { useState } from 'react'
import { Form, Button, Jumbotron, Container, ButtonGroup, Alert } from 'react-bootstrap'
import { connect } from 'react-redux'
import { actionRegisterAdmin } from '../../redux/actionCreater'

const Page = ({actionRegisterAdmin}) => {

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
                    <Button variant="success" disabled={login.length < 6 || password.length < 8} onClick={() => 
                    actionRegisterAdmin({login, password})}>
                        Регистрация
                    </Button>
                </ButtonGroup>
            </Form>
        </Jumbotron>
    </Container>    
</Container>
)}

export const APregister = connect( state => ({state: state.promise}) ,{actionRegisterAdmin})(Page)