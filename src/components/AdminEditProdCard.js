import {useState} from 'react'
//import {Row, Col, Card, Button} from 'react-bootstrap'
import {Row, Col, Card, Container, Button, ButtonGroup} from 'react-bootstrap'
//import {Link} from 'react-router-dom'
import Swal from 'sweetalert2'

import '../App.css'

export default function AdminEditProdCard({adminEditProdProp}){

	console.log(adminEditProdProp)

	const {name, description, price, _id, img, inStock, isActive} = adminEditProdProp


	function archiveProduct(e){
		e.preventDefault(e);

		fetch(`http://localhost:4000/products/${_id}/archive`, {
			method: 'PUT',
			headers: {
				Authorization: `Bearer ${localStorage.getItem("token")}`
			}
		})
		.then(res => res.json())
		.then(data => {
			if(data){
				Swal.fire({
					title: 'Archive Successful!',
					icon: 'success',
					text: 'Product archived'
				})

				window.location.reload(false);
				
			} else {
				Swal.fire({
					title: 'Authentication Failed',
					icon: 'error',
					text: 'Check your login details'
				})
			}
		})
	}

	function reactivateProduct(e){
	

		fetch(`http://localhost:4000/products/${_id}/reactivate`, {
			method: 'PUT',
			headers: {
				Authorization: `Bearer ${localStorage.getItem("token")}`
			}
		})
		.then(res => res.json())
		.then(data => {
			if(data){
				console.log(data)
				Swal.fire({
					title: 'Success!',
					icon: 'success',
					text: 'Product is now available'
				})
				 window.location.reload(false);
				
			} else {
				Swal.fire({
					title: 'Authentication Failed',
					icon: 'error',
					text: 'Check your login details'
				})
			}
		})
	}
	return(
		<Container>
		<Row className = "my-3">
			<Col>
				<Card className = "p-1">
					<Card.Body>
					<Container>
					<Row>

						<Col md={5} className="text-center" >
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
								  <Button variant="secondary" >Edit</Button>
								  { (isActive === true) ?
								  <Button variant="secondary"className="mx-3" onClick={(e)=> archiveProduct(e)} >Archive</Button>
								  : 
								  <Button variant="secondary"className="mx-3" onClick={(e)=> reactivateProduct(e)} >Activate</Button>

								  }
							</ButtonGroup>
						</Col>
						</Row>
					</Container>
					</Card.Body>
				</Card>
			</Col>
		</Row>
		</Container>
	)
}
