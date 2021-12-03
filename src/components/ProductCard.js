import {useState} from 'react'
import {Col, Card, CardGroup} from 'react-bootstrap'
import {Link} from 'react-router-dom'

import '../App.css'

export default function ProductView({prodProp}){

	console.log(prodProp)
	

	const {name,description, price, _id, category, onSale, inStock} = prodProp


	return(
			
				<Col md={4} className="text-center">
					<CardGroup>
					<Card className= 'm-3 border-light'>
					<Card.Img variant= "top" src={`../images/${name}.jpg`} style={{ height: "28rem"}}/>
					<Card.Body >
						<Card.Title>{name}</Card.Title>
						<Card.Subtitle>{description}</Card.Subtitle>
						<Card.Text>Php {price}</Card.Text>

						<Link className= "btn btn-secondary mx-2" to = {`/products/${_id}`}>See Details</Link>
						<Link className= "btn btn-secondary mx-2" to = {`/products/${_id}`}>Add to Cart</Link>
					</Card.Body>
					</Card>
					</CardGroup>
				</Col>
			
		
	)
}