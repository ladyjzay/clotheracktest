import {useState, Fragment, useEffect} from 'react'
//import {Row, Col, Card, Button} from 'react-bootstrap'
import {Row, Col, Card, Container, ButtonGroup, Button, Modal, Form} from 'react-bootstrap'
//import {Link} from 'react-router-dom'
import Swal from 'sweetalert2'

import '../App.css'

export default function AdminProdCard({adminProdProp}){

	//console.log(adminProdProp)

	const {name, description, price, _id, img, inStock} = adminProdProp
	const { productsData, fetchData } = adminProdProp;

		// States to open/close modals
	const [showEdit, setShowEdit] = useState(false);
	const [showAdd, setShowAdd] = useState(false);

	// Functions to toggle the opening and closing of the "Add Course" modal
	const openAdd = () => setShowAdd(true);
	const closeAdd = () => setShowAdd(false);

	const openEdit = (productId) => { 

		fetch(`${ process.env.REACT_APP_API_URL}/products/${ productId }`)
		.then(res => res.json())
		.then(data => {

		})

		setShowEdit(true)
	}

	const editProduct = (e, productId) => {

		fetch(`${ process.env.REACT_APP_API_URL }/products/${ productId }`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${ localStorage.getItem('token') }`
			},
			body: JSON.stringify({
				name: name,
				description: description,
				price: price
			})
		})
			.then(res => res.json())
	.then(data => {
		fetchData();
	})

	}

	return(
		<Fragment>
		<Container>
		<Row className = "my-3">
			<Col>
				<Card className = "p-1">
					<Card.Body>
					<Container>
					<Row>

						<Col md={4} className="text-center" >
						<Card.Img variant= "left" src={`../../images/${name}.jpg`} style={{ height: "28rem"}} className="img-adminView"/>
						</Col>
						<Col md={2} className= "my-auto mx-auto">
						<Card.Title>{name}</Card.Title>
						<Card.Subtitle>Description:</Card.Subtitle>
						<Card.Text>{description}</Card.Text>
						
						</Col>

						<Col md={2}  className= "my-auto">
						<Card.Subtitle>in Stock: {inStock}</Card.Subtitle>
						<Card.Subtitle>Price: Php {price}</Card.Subtitle>
						</Col >
						

						<Col md={3} className= "my-auto">
							<ButtonGroup aria-label="Basic example">
  <Button variant="secondary" onClick={() => openEdit({_id})}>Edit</Button>
  <Button variant="secondary"className="mx-3">Archive</Button>
  
</ButtonGroup>
						</Col>
						</Row>
					</Container>
					</Card.Body>
				</Card>
			</Col>
		</Row>
		</Container>
		</Fragment>
	)
}