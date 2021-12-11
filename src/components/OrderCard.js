import {useState, useEffect, useContext, Fragment} from 'react'
import {Image, Col, Table, Button, Row, Container, Modal} from 'react-bootstrap'
import {Navigate, useNavigate, Link} from 'react-router-dom'
import Swal from 'sweetalert2'
import UserContext from '../UserContext' 

import '../App.css'

export default function OrderCard(){

	//console.log(orderProp)
	//console.log(prodProp)

	const {user} = useContext(UserContext)

	const history = useNavigate()

	//order
	const [orderId, setOrderId] = useState('')
	const [userId, setUserId] = useState('')
	const [cartList, setCartList] = useState([])
	const [quantity, setQuantity] = useState('')
	const [subTotal, setSubTotal] = useState('')
	const [totalAmount, setTotalAmount] = useState('')
	const [status, setStatus] = useState('') 
	const [purchasedOn, setPurchasedOn] = useState('')
	//console.log(orderId)

	//prod
	const [name, setName] = useState('')
	const [productId, setProductId] = useState('')
	
	const [price, setPrice] = useState('')
	const [category, setCategory] = useState('')
	const [inStock, setInStock] = useState('')

	// const [show, setShow] = useState(false);



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

			if(data !== undefined){
		 	setOrderId(data._id)
			setUserId(data.userId)
			setCartList(data.cartList)
			setProductId(data.productId)
			// setQuantity(data.quantity)
			// setSubTotal(data.subTotal)
			setTotalAmount(data.totalAmount)
			setStatus(data.status)
			setPurchasedOn(data.purchasedOn)
			} else {
				setOrderId('')
			}

		})
	}, [])

	

	function renderCartListCards (cartList) {
		return cartList.map(cartItem => {
			return (
				
					<tr>
						<td><Image src={`../../images/${cartItem.productId.name}.jpg`} className="rounded mx-auto d-block" style={{ height: "10rem"}} /></td>
						<td>{cartItem.productId.name}</td>
						<td>{cartItem.productId.price}</td>
						<td>{cartItem.quantity}</td>
						<td>{cartItem.subTotal}</td>
						<td><Button variant = 'secondary' type= 'submit' id = 'submitBtn' size="sm" onClick={(e) => removeCartItem(e)}>Remove</Button></td>
					</tr>
				
				
			)
		});
	}

	
	function removeCartItem(e) {

		
		fetch(`http://localhost:4000/orders/${orderId}/deleteItem`, {
			method: 'DELETE',
			headers: {
				'Content-Type' : 'application/json',
				Authorization: `Bearer ${localStorage.getItem("token")}`
			},
			body: JSON.stringify({
				productId: productId
			})
		})
		.then(res => res.json())
		.then(data => {
			console.log(data)
		})
	} 

	// useEffect(() => {
	// 	fetch(`http://localhost:4000/orders/myOrder`, {
	// 		headers: {
	// 			Authorization: `Bearer ${localStorage.getItem("token")}`
	// 		}
	// 	})
	// 	.then(res => res.json())
	// 	.then(data => {
	// 		//data = data[0];

	// 		console.log(data)
	// 		setProductId(data.productId._id)
	// 	})
	// }, [])


	function confirmDelete(e) {
		Swal.fire({
  			title: 'Are you sure?',
			  text: "You won't be able to revert this!",
			  icon: 'warning',
			  showCancelButton: true,
			  confirmButtonColor: '#3085d6',
			  cancelButtonColor: '#d33',
			  confirmButtonText: 'Yes, delete it!'
		}).then((result) => {
 			 if (result.isConfirmed) {
  			deleteOrder(result)
  			console.log(result)
  }
})
	}

	function deleteOrder(e){
		// e.preventDefault(e)
		console.log(orderId)

		fetch(`http://localhost:4000/orders/${orderId}/delete`, {
			method: 'DELETE',
			headers: {
				Authorization:  `Bearer ${localStorage.getItem("token")}`
			}
		})
		.then(res => res.json())
		.then(data => {
				console.log(data)

				  Swal.fire(
     			 'Deleted!',
      			'Your cart is now empty.',
      			'success'
    	)
				history('/')
		})
	}


		return(
			(orderId === undefined) ?
				<h1>CART EMPTY</h1>
			:
			

			
			<Fragment>
			<Container >
			<Row className="my-4">
				
			Order ID: {orderId} <br/>
			Date purchase : {purchasedOn}
			<Button variant = 'secondary' type= 'submit' id = 'delete-btn' onClick={(e) => confirmDelete(e)}>Delete Order</Button>
			<Table striped bordered hover>
					  <thead>
					    <tr>
					      <th>Product</th>
					      <th>Name</th>
					      <th>Price</th>
					      <th>Quantity</th>
					      <th>Subtotal</th>
					      <th>Action</th>
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