import {useState, useEffect, useContext} from 'react'
import {Col, Card, CardGroup, Button} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import Swal from 'sweetalert2'
import UserContext from '../UserContext' 

import '../App.css'

export default function ProductCard({prodProp}){

	//console.log(prodProp)
	

	const {name,description, price, _id, category, onSale, inStock, img} = prodProp

	const {user} = useContext(UserContext)

	//order
	const [orderId, setOrderId] = useState('')
	const [userId, setUserId] = useState('')
	const [cartList, setCartList] = useState([])
	const [quantity, setQuantity] = useState('')
	const [subTotal, setSubTotal] = useState('')
	const [totalAmount, setTotalAmount] = useState('')
	const [status, setStatus] = useState('') 



	const addCart = async (_id) => {
		//console.log(_id)
		fetch(`http://localhost:4000/orders/order`, {
			method: 'POST',
			headers: {
				"Content-Type" : "application/json",
				Authorization: `Bearer ${localStorage.getItem("token")}`
			},
			body: JSON.stringify({
				orderId: orderId,
				userId: user.id,
			/*	cartList: [
					productId: productId,
					quantity: quantity,
					subTotal: subTotal
				],*/
				productId: _id,
				quantity: 1, 
				subTotal: subTotal,
				status: status,
				totalAmount: totalAmount
			})
		})
		.then(res => {
			return res.json()
		})
		.then(data => {

			if(data){
				Swal.fire({
					title: 'Success',
					icon: 'success',
					text: 'Product added to cart'
				})

			} else { 
				Swal.fire({
					title: 'Something went wrong',
					icon: 'error',
					text: 'Please try again'
				})
			}

		})
	}

	useEffect(() => {

		fetch(`http://localhost:4000/orders/myOrder`, {
			headers: {
				Authorization: `Bearer ${localStorage.getItem("token")}`
			}
		})
		.then(res => res.json())
		.then(data => {

			//console.log(data)
			setOrderId(data.orderId)
			setUserId(data.userId)
			setCartList(data.cartList)
			setQuantity(data.quantity)
			setSubTotal(data.subTotal)
			setTotalAmount(data.totalAmount)
			setStatus(data.status)
		})
	}, [_id])


	return(
			
				<Col md={4} className="text-center">
					<CardGroup>
					<Card className= 'm-3 border-light'>
					<Card.Img variant= "top" src={`../../images/${name}.jpg`} style={{ height: "28rem"}}/>
					<Card.Body >
						<Card.Title>{name}</Card.Title>
						<Card.Subtitle>{description}</Card.Subtitle>
						<Card.Text>Php {price}</Card.Text>

						<Link className= "btn btn-secondary mx-2" to = {`/products/${_id}`}>See Details</Link>
						<Button variant = "secondary" onClick={() => addCart(_id)}>Add to Cart</Button>
					</Card.Body>
					</Card>
					</CardGroup>
				</Col>
			
		
	)
}