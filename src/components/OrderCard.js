import {useState, useEffect, useContext, Fragment} from 'react'
import {Image, Col, Table, Button, Row, Container, ButtonGroup} from 'react-bootstrap'
import {FaTrashAlt} from "react-icons/fa";
import {Navigate, useNavigate, Link} from 'react-router-dom'
import Swal from 'sweetalert2'
import UserContext from '../UserContext' 

import '../App.css'

export default function OrderCard(){


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





	useEffect(() => {

		fetch(`http://localhost:4000/orders/myOrder`, {
			headers: {
				Authorization: `Bearer ${localStorage.getItem("token")}`
			}
		})
		.then(res => res.json())
		.then(data => {
			
			data = data[0];
			//console.log(data);

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
						<td>
						<div className="text-center">
						<Button variant = 'secondary' className="my-5 m-3" type= 'submit' id = 'editBtn' size="sm" onClick={(e) => editItem(e, cartItem)}>Edit</Button>
						<Button variant = 'secondary' type= 'submit' id = 'removeBtn' size="sm" onClick={(e) => confirmRemoveItem(e, cartItem)}><FaTrashAlt/></Button>
						</div>
						</td>
					</tr>
				
				
			)
		});
	}

	function editItem(e, cartItem) {
		//console.log(cartItem)

		let { value: newQuantity } = Swal.fire({
  		title: 'Edit Item Quantity',
  		input: 'number', 
  		showCancelButton: true,
  		preConfirm: (newQuantity) =>{
  			//console.log(newQuantity)
  		
  			if(newQuantity){
  				fetch(`http://localhost:4000/orders/${orderId}/edit`,{
				 	method: 'PUT',
				 	headers: {
				 		"Content-Type" : "application/json",
				 		Authorization: `Bearer ${localStorage.getItem("token")}`
				 	},
				 	body: JSON.stringify ({
						productId: cartItem.productId._id,
						totalAmount: totalAmount,
						status: status, 
						subTotal: cartItem.subTotal,
						cartList: cartList,
						quantity: newQuantity
				})
			 })
			 .then(res => {
			 	//console.log(res)
			 	return res.json()
			 })
			 .then(data => {
			 	//console.log(data)

			 	window.location.reload();
			 })
  			}
  		}
			})

}

	

	function confirmRemoveItem(e, cartItem) {
		Swal.fire({
  			title: 'Are you sure?',
			  text: "You won't be able to revert this!",
			  icon: 'warning',
			  showCancelButton: true,
			  confirmButtonColor: '#3085d6',
			  cancelButtonColor: '#d33',
			  confirmButtonText: 'Yes, remove it!'
		}).then((result) => {
 			 if (result.isConfirmed) {
  			removeCartItem(result, cartItem)
  			// console.log(result, cartItem)
  }
})
	}


	function removeCartItem(e, cartItem) {
		//e.preventDefault(e);

		// console.log(totalAmount)
	 // 	console.log(cartItem.productId._id)

		fetch(`http://localhost:4000/orders/${orderId}/deleteItem`, {
			method: 'DELETE',
			headers: {
				Authorization: `Bearer ${localStorage.getItem("token")}`,
				"Content-Type": "application/json"
			}, 
			body: JSON.stringify ({
				productId: cartItem.productId._id,
				totalAmount: totalAmount,
				status: status, 
				subTotal: cartItem.subTotal,
				cartList: cartList
			})
		})
		.then(res => res.json())
		.then(data => {
			// console.log(data)

			 Swal.fire(
     			 'Deleted!',
      			'Item is deleted from your cart',
      			'success'
    	)
			window.location.reload();

		})
	} 



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
  			//console.log(result)
  }
})
	}

	function deleteOrder(e){
		// e.preventDefault(e)
		//console.log(orderId)

		fetch(`http://localhost:4000/orders/${orderId}/delete`, {
			method: 'DELETE',
			headers: {
				Authorization:  `Bearer ${localStorage.getItem("token")}`
			}
		})
		.then(res => res.json())
		.then(data => {
				//console.log(data)

				  Swal.fire(
     			 'Deleted!',
      			'Your cart is now empty.',
      			'success'
    	)
				history('/')
		})
	}


		return(
			
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
					      <th width="200px">Action</th>
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