import {useState} from 'react'
//import {Row, Col, Card, Button} from 'react-bootstrap'
import {Row, Col, Card, Container, Button, ButtonGroup} from 'react-bootstrap'
//import {Link} from 'react-router-dom'

import '../App.css'

export default function AdminEditProdCard({adminEditProdProp}){

	console.log(adminEditProdProp)

	const {name, description, price, _id, img, inStock} = adminEditProdProp


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
	)
}
