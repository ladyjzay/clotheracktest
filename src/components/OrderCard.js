import {useState, useEffect, useContext, Fragment} from 'react'
import {Col, Table, Button, Row, Container} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import Swal from 'sweetalert2'
import UserContext from '../UserContext' 

import '../App.css'

export default function OrderCard(){

	//console.log(orderProp)
	//console.log(prodProp)

	//const {cartList, productId, quantity, subTotal, totalAmount, status, purchasedOn, orderId} = orderProp
	//console.log(cartList)
	//const {name,description, price, _id, category, onSale, inStock, img} = prodProp

	const {user} = useContext(UserContext)


	//order
	const [orderId, setOrderId] = useState('')
	const [userId, setUserId] = useState('')
	const [cartList, setCartList] = useState([])
	const [quantity, setQuantity] = useState('')
	const [subTotal, setSubTotal] = useState('')
	const [totalAmount, setTotalAmount] = useState('')
	const [status, setStatus] = useState('') 
	const [purchasedOn, setPurchasedOn] = useState('')
	console.log(orderId)
	//prod
	const [name, setName] = useState('')
	//const [productId, setProductId] = useState('')
	const [price, setPrice] = useState('')
	const [category, setCategory] = useState('')
	const [inStock, setInStock] = useState('')

	useEffect(() => {

		fetch(`http://localhost:4000/orders/myOrder`, {
			headers: {
				Authorization: `Bearer ${localStorage.getItem("token")}`
			}
		})
		.then(res => res.json())
		.then(data => {
			data = data[0];
			console.log(data);

			// console.log(data[0])
		 	setOrderId(data._id)
			setUserId(data.userId)
			setCartList(data.cartList)
			// setQuantity(data.quantity)
			// setSubTotal(data.subTotal)
			setTotalAmount(data.totalAmount)
			setStatus(data.status)
			setPurchasedOn(data.purchasedOn)
		})
	}, [])

	// 	useEffect(() => {
	// 	console.log(productId)

	// 	fetch(`http://localhost:4000/products/${productId}`)
	// 	.then(res => res.json())
	// 	.then(data => {
	// 		console.log(data)

	// 	})
	// }, [productId])

	function renderCartListCards (cartList) {
		return cartList.map(cartItem => {
			return (
				
					<tr>
						<td>{cartItem.productId}</td>
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
			<Row>
				
			Order ID: {orderId} <br/>
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
					  		<td>
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