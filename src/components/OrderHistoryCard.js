import {useState, useEffect, useContext, Fragment} from 'react'
import {Image, Col, Table, Button, Row, Container} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import Swal from 'sweetalert2'
import UserContext from '../UserContext' 

import '../App.css'

export default function OrderHistoryCard({orderHistoryProp}){

	const {_id, userId, cartList, totalAmount, purchasedOn, status, productId } = orderHistoryProp

	const {user} = useContext(UserContext)

	console.log(orderHistoryProp)
	function renderOrderHistoryListCards (cartList) {
		return cartList.map(cartItem => {
			return (
				
					<tr>
						<td><Image src={`../../images/${cartItem.productId.name}.jpg`} className="rounded mx-auto d-block" style={{ height: "10rem"}} /></td>
						<td>{cartItem.productId.name}</td>
						<td>{cartItem.productId.price}</td>
						<td>{cartItem.quantity}</td>
						<td>{cartItem.subTotal}</td>
					</tr>
				
				
			)
		});
	}


		return(
			<Fragment>
			<Container>
			<Row className="my-4">
				
			Order ID: {_id} <br/>
			Date purchase : {purchasedOn}

			<Table striped bordered hover>
					  <thead>
					    <tr>
					      <th>Product</th>
					      <th>Name</th>
					      <th>Price</th>
					      <th>Quantity</th>
					      <th>Subtotal</th>
					    </tr>
					  </thead>
					  <tbody>
					  	{renderOrderHistoryListCards(cartList)}
					  	<tr>
					  		<td colSpan="5" className="text-end">
					  		Total Amount : {totalAmount}
					  		</td>
					  	</tr>
					  </tbody>

					</Table>
			</Row>
			</Container>
			</Fragment>
		)
}
