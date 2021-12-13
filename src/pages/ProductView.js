import {useState, useEffect, useContext} from 'react'
import {Container, Row, Col, Card, Button} from 'react-bootstrap'
import {useParams , useNavigate, Link} from 'react-router-dom'
import Swal from 'sweetalert2'
import UserContext from '../UserContext' 

export default function ProductView(){

	const {productId} = useParams()

	const {user} = useContext(UserContext)

	const history = useNavigate() 

	const [name, setName] = useState('')
	const [description, setDescription] = useState('')
	const [price, setPrice]= useState('')
	const [onSale, setOnSale] = useState(false)
	const [inStock, setInStock] = useState('')

	//order
	const [orderId, setOrderId] = useState('')
	const [userId, setUserId] = useState('')
	const [cartList, setCartList] = useState([])
	const [quantity, setQuantity] = useState('')
	const [subTotal, setSubTotal] = useState('')
	const [totalAmount, setTotalAmount] = useState('')
	const [status, setStatus] = useState('') 



	const addCart = async (productId) => {
		console.log(productId)
		fetch(`http://localhost:4000/orders/order`, {
			method: 'POST',
			headers: {
				"Content-Type" : "application/json",
				Authorization: `Bearer ${localStorage.getItem("token")}`
			},
			body: JSON.stringify({
				orderId: orderId,
				userId: user.id,
				productId: productId,
				quantity: 1, 
				subTotal: subTotal,
				status: status,
				totalAmount: totalAmount
			})
		})
		.then(res =>{
			//console.log(res)
			return res.json()
		} )
		.then(data => {
			//console.log(data)

			if(data){
				Swal.fire({
					title: 'Success',
					icon: 'success',
					text: 'Product added to cart'
				})

				history(-1)

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
	}, [productId])

	useEffect(() => {
		//console.log(productId)

		fetch(`http://localhost:4000/products/${productId}`)
		.then(res => res.json())
		.then(data => {
			console.log(data)

			setName(data.name)
			setDescription(data.description)
			setPrice(data.price)
			setOnSale(data.onSale)
			setInStock(data.inStock)
		})
	}, [productId])



	return(

		<Container>
			<Row className="m-0 " style={{height: "603px"}}>
				<Col md={10} className="m-auto">
					<Card className= "border-light">
						<Card.Body>
						<Container>
						<Row  >
							<Col md={7} className="text-center" >
							<Card.Img variant= "left" src={`../images/${name}.jpg`} style={{ height: "28rem"}}/>
							</Col>
							<Col md={5} className= "my-auto text-center">
							<Card.Title>{name}</Card.Title>
							<Card.Subtitle>Description: </Card.Subtitle>
							<Card.Text>{description}</Card.Text>
							<Card.Subtitle>Price:</Card.Subtitle>
							<Card.Text>Php {price}</Card.Text>
						

							{ (user.id !== null && user.isAdmin === false) ?
								<Button variant = "secondary m-2" onClick={() => addCart(productId)}>Add to Cart</Button>
								:
								<Button variant = "secondary m-2" as={Link} to="/login" >Log in to Shop</Button>
							}
							<Button variant = "secondary" className="mx-4" onClick={()=> history(-1)}>Go Back</Button>
							</Col>
						</Row>
						</Container>
						</Card.Body>	
					</Card>	
				</Col>	
			</Row>	
		</Container>	
	)
}