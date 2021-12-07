import {useState, useEffect, useContext} from 'react'
import {Col, Card, CardGroup, Button} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import Swal from 'sweetalert2'
import UserContext from '../UserContext' 

import '../App.css'

export default function OrderCard({orderProp, prodProp}){

	console.log(orderProp)
	console.log(prodProp)

	const {cartList, productId, quantity, subTotal, totalAmount, status, purchasedOn} = orderProp

	//const {name,description, price, _id, category, onSale, inStock, img} = prodProp

	const {user} = useContext(UserContext)


	//order
	const [orderId, setOrderId] = useState('')
	const [userId, setUserId] = useState('')
	//const [cartList, setCartList] = useState([])
	// const [quantity, setQuantity] = useState('')
	// const [subTotal, setSubTotal] = useState('')
	// const [totalAmount, setTotalAmount] = useState('')
	// const [status, setStatus] = useState('') 
	// const [purchasedOn, setPurchasedOn] = useState('')

		useEffect(() => {

		fetch(`http://localhost:4000/orders/myOrder`, {
			headers: {
				Authorization: `Bearer ${localStorage.getItem("token")}`
			}
		})
		.then(res => res.json())
		.then(data => {

			console.log(data)
			 // setOrderId(data.orderId)
			 // setUserId(data.userId)
			//setCartList(data.cartList)
			// setQuantity(data.quantity)
			// setSubTotal(data.subTotal)
			// setTotalAmount(data.totalAmount)
			// setStatus(data.status)
			// setPurchasedOn(data.purchasedOn)
		})
	}, [])

		useEffect(() => {
		console.log(productId)

		fetch(`http://localhost:4000/products/${productId}`)
		.then(res => res.json())
		.then(data => {
			console.log(data)

		})
	}, [productId])





		return(
				<Col md={4} className="text-center">
					<CardGroup>
					<Card className= 'm-3 border-light'>
					<Card.Body >
						<Card.Title>{orderId}</Card.Title>
						<Card.Subtitle>{userId}</Card.Subtitle>
						<Card.Text>{productId}</Card.Text>
						<Card.Text>{totalAmount}</Card.Text>
						<Card.Text>{status}</Card.Text>
						<Card.Text>{cartList.map(product => <div>{product.name}</div>)}</Card.Text>
						<Card.Text>{purchasedOn}</Card.Text>
						
					</Card.Body>
					</Card>
					</CardGroup>
				</Col>
		)
}