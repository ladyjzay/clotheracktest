import {useState, useEffect, useContext, Fragment} from 'react'
import {Col, Container, Row, Table} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import Swal from 'sweetalert2'
import UserContext from '../UserContext' 

import '../App.css'

export default function AdminOrderCard({adminOrderProp}){

	const {_id, userId, cartList, totalAmount, purchasedOn, status } = adminOrderProp


	const {user} = useContext(UserContext)

	function renderCartListCards (cartList) {
		return cartList.map(cartItem => {
			return (
				<tr>
						<td>{cartItem.productId}</td>
						<td>{}</td>
						<td>{}</td>
						<td>{cartItem.quantity}</td>
						<td>{cartItem.subTotal}</td>
					</tr>
			)
		})
	}

	return(

				<Fragment>
			<Container>
			<Row className="my-4">
				
			Order ID: {_id} <br/>
			User ID: {userId} <br/>
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
					  	{renderCartListCards(cartList)}
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