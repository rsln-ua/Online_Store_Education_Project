import { useEffect, useRef, useState } from "react"
import { Container, FormControl, InputGroup, Form, Col, Button } from "react-bootstrap"
import { connect } from "react-redux"
import { actionGetCategories, actionAddGood } from "../../redux/actionCreater"


const ListCategories = ({state: {getCategories: categories}, actionGetCategories, val, setVal}) => {
    useEffect( 
        () =>  actionGetCategories(), []
    )

    return <Form.Control as="select" onChange={(e => setVal(e.target.value))}>
        <option>---Категория---</option>
        {
            categories?.map(c => <option value={c.id}>{c.name}</option>)
        }
    </Form.Control>
}

const CListCategories = connect(state => ({state: state.promise}), {actionGetCategories})(ListCategories)

const Page = ({actionAddGood}) => {

  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [category, setCategory] = useState('')
  const [description, setDescription] = useState('')
  const inpRef = useRef(null)

  const sendGood = async () => {

    let images

    if(!inpRef.current.files)
      images = []
    else
    {
      const fd = new FormData()
      
      for(let i of inpRef.current.files){
            fd.append('img', i)
      }

      images = await fetch('/upload', {
        method: "POST",
        headers: {Authorization: 'Bearer ' + localStorage.authToken},
        body: fd
      }).then(res => res.json())
    }
    actionAddGood({name: name, price: +price, category: category, img: images, des: description})
  }

return <Container className="py-5">

  <Form.Row>

    <Form.Group as={Col} xs={6}>
        <FormControl value={name} onChange={(e => setName(e.target.value))}
        placeholder="Название товара"
        />
    </Form.Group>

    <Form.Group as={Col} xs={1}>
      <Form.Control type={"number"} value={price} onChange={(e => setPrice(e.target.value))}
        placeholder="Цена"
        />
    </Form.Group>

    <Form.Group as={Col} controlId="formGridState">
      <CListCategories val={category} setVal={setCategory}/>
    </Form.Group>
  </Form.Row>

  <InputGroup>
    <InputGroup.Prepend>
      <InputGroup.Text>Описание</InputGroup.Text>
    </InputGroup.Prepend>
    <FormControl as="textarea" aria-label="With textarea" value={description} onChange={(e => setDescription(e.target.value))}/>
  </InputGroup>

  <Form.File multiple accept=".png, .jpg, .jpeg" ref={inpRef} label="" name="img"/>

  <div className="d-flex justify-content-end">
    <Button onClick={sendGood}  disabled={name === "" || price === "" || category === ""} >Отправить</Button>
  </div>

</Container>
}

export const APaddGood = connect(state => ({state: state.promise}), {actionAddGood})(Page)