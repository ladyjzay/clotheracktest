import {useState, Fragment, useEffect} from 'react'
//import {Row, Col, Card, Button} from 'react-bootstrap'
import {Row, Col, Card, Container} from 'react-bootstrap'
//import {Link} from 'react-router-dom'
import Swal from 'sweetalert2'

import '../App.css'

export default function AdminProdCard({adminProdProp}){

	//console.log(adminProdProp)

	const {name, description, price, _id, img, inStock} = adminProdProp
	
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