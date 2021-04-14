import { useEffect, useState } from "react"
import { Container, FormControl, InputGroup, Form, Col, Button, Figure } from "react-bootstrap"
import { connect } from "react-redux"
import { history } from "../../index"
import { mutation, query } from "../../graphql"
import { actionDataGetter, actionDataSender } from "../../redux/actionCreater"

const Image = ({url, remove}) => {
  return <Figure className="m-1 position-relative">
  <Figure.Image
    width={180}
    height={180}
    src={url}
  />
  <Button onClick={remove} variant="danger" className="rounded-circle position-absolute end-0">X</Button>
</Figure>
}

export const GoodForm = ({state: {getGood}, actionDataSender, actionDataGetter, match}) => {

  const [name, setName] = useState()
  const [price, setPrice] = useState()
  const [description, setDescription] = useState()
  const [quantity, setQuantity] = useState()
  const [images, setImages] = useState()

  useEffect(
    () => actionDataGetter(query.getGood, match.params), []
  )
  useEffect(
    () => {
      setName(getGood?.name)
      setPrice(getGood?.price)
      setDescription(getGood?.description)
      setQuantity(getGood?.quantity || 0)
      setImages(getGood?.img || [])
    }, [getGood]
  )

  const updateGoodInfo = async () => {

    let newImages

    if(!test.files)
      newImages = []
    else
    {
      const fd = new FormData()
      
      for(let i of test.files){
            fd.append('img', i)
      }

      newImages = await fetch('/upload', {
        method: "POST",
        headers: {Authorization: 'Bearer ' + localStorage.authToken},
        body: fd
      }).then(res => res.json())
    }
    actionDataSender(mutation.updateGood, {id: getGood.id, name: name, price: +price, img: images.concat(newImages), des: description, quantity: quantity}, history.goBack, alert)
  }

return <Container className="py-5"> 

  <Form.Row>

    <Form.Group as={Col}>
        <FormControl value={name} onChange={(e => setName(e.target.value))} placeholder="Название товара"/>
    </Form.Group>

    <Form.Group as={Col} xs={3}>
      <Form.Control disabled value={"ID: " + getGood?.id}/>
    </Form.Group>
    
  </Form.Row>
  <Form.Row>
    <Form.Group as={Col}>
        <Form.Control type={"number"} value={price} onChange={(e => setPrice(e.target.value))} placeholder="Цена"/>
    </Form.Group>

    <Form.Group as={Col}>
      <Form.Control value={quantity} onChange={(e => setQuantity(e.target.value))} placeholder="quantity"/>
    </Form.Group>

    <Form.Group as={Col}>
      <Form.Control disabled value={getGood?.category.name}/>
    </Form.Group>

  </Form.Row>

  <InputGroup>
    <InputGroup.Prepend>
      <InputGroup.Text>Описание</InputGroup.Text>
    </InputGroup.Prepend>
    <FormControl as="textarea" aria-label="With textarea" value={description} onChange={(e => setDescription(e.target.value))}/>
  </InputGroup>

  <Form.File multiple id="test" label="" name="img"/>
  <div className="p-2">
    {
      images?.map(
        url => <Image url={url} remove={() => setImages(images.filter(Url => Url !== url))}/>
      )
    }

  </div>

  <div className="d-flex justify-content-end">
    <Button variant="danger" onClick={() => history.goBack()}>Отмена</Button>
    <Button variant="success" onClick={updateGoodInfo}>Отправить</Button>
  </div>

</Container>
}

export const UpdateGoodPage = connect(state => ({state: state.promise}), {actionDataSender, actionDataGetter})(GoodForm)
