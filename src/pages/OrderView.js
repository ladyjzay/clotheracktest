import {useState, useEffect, useContext} from 'react'
import {Container, Row, Col, Card, Button} from 'react-bootstrap'
import {useParams , useNavigate, Link} from 'react-router-dom'
import Swal from 'sweetalert2'
import UserContext from '../UserContext' 

export default function OrderView(){

	const {userId} = useParams()

	const {user} = useContext(UserContext)

	const history = useNavigate()

	const [customer, setCustomer] = useState('')
	const [cartList, setCartList] = useState('')
	const [totalAmount, setTotalAmount] = useState('')
	const [purchasedOn, setPurchasedOn] = useState('')

	//button for payment

	useEffect(() => {
		console.log(userId)

		fetch(`http://localhost:4000/orders/myOrder`)
		.then(res => res.json())
		.then(data => {
			console.log(data)

			setCustomer(data.customer)
			setCartList(data.cartList)
			setTotalAmount(data.totalAmount)
			setPurchasedOn(data.purchasedOn)
		})
	}, [userId])

	return(
		<Container>
			<Row className="m-0 " style={{height: "603px"}}>
				<h1>Cart</h1>
				<Col>

					<Card>
						<Card.Body>
							<Card.Title>{cartList}</Card.Title>
							<Card.Subtitle>Description: </Card.Subtitle>
							<Card.Text>{}</Card.Text>
							<Card.Subtitle>Price:</Card.Subtitle>
							<Card.Text>Php {totalAmount}</Card.Text>
							{/*{user._id !== null ?
								<Button variant = "secondary" onClick={() => orderItem(productId)}>Add to Cart</Button>
								: 
								<Link className = "btn btn-secondary btn-block" to = '/login'>Log in to Shop</Link>
							}*/}

							<Button variant = "secondary" >Pay</Button>
						</Card.Body>	
					</Card>	
				</Col>	
			</Row>	
		</Container>	
	)
}