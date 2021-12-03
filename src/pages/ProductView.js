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

	const orderItem = (productId) => {
		fetch(`http://localhost:4000/users/checkout`, {
			method: 'POST',
			headers: {
				"Content-Type" : "application/json",
				Authorization :  `Bearer ${localStorage.getItem("token")}`
			},
			body: JSON.stringify({
				productId: productId,
				//userId: user._id,
				customer: user._id,
				
			})
		})
		.then(res => res.json())
		.then(data => {
			console.log(data)

			if(data === true){
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
		console.log(productId)

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
			<Row>
				<Col>
					<Card>
						<Card.Body>
							<Card.Img variant= "top" src={`../images/${name}.jpg`} style={{ height: "28rem"}}/>
							<Card.Title>{name}</Card.Title>
							<Card.Subtitle>Description: </Card.Subtitle>
							<Card.Text>{description}</Card.Text>
							<Card.Subtitle>Price:</Card.Subtitle>
							<Card.Text>Php {price}</Card.Text>
							{/*{user._id !== null ?
								<Button variant = "secondary" onClick={() => orderItem(productId)}>Add to Cart</Button>
								: 
								<Link className = "btn btn-secondary btn-block" to = '/login'>Log in to Shop</Link>
							}*/}

							<Button variant = "secondary" onClick={() => orderItem(productId)}>Add to Cart</Button>
						</Card.Body>	
					</Card>	
				</Col>	
			</Row>	
		</Container>	
	)
}