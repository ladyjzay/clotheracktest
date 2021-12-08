import {useState, useEffect, useContext, Fragment} from 'react'
import {Col, Card, CardGroup, Button} from 'react-bootstrap'
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
				<Card className= 'm-3 border-light'>
					<Card.Body >
						<Card.Title>{cartItem.productId}</Card.Title>
						<Card.Subtitle>{}</Card.Subtitle>
						<Card.Text>TESTING</Card.Text>
						<Card.Text>{cartItem.quantity}</Card.Text>
						<Card.Text>{cartItem.subTotal}</Card.Text>
						<Card.Text></Card.Text>
						// <Card.Text>{purchasedOn}</Card.Text>
					</Card.Body>
				</Card>
			)
		});
	}



		return(
			<Fragment>
				<Col md={4} className="text-center">
					<CardGroup>
						{renderCartListCards(cartList)}

					</CardGroup>
				</Col>
				{totalAmount}
			</Fragment>
		)
}