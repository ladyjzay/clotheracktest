import {useState, useEffect, useContext, Fragment} from 'react'
import {Container, Row, Col, Card, Button} from 'react-bootstrap'
import {useParams , useNavigate, Link} from 'react-router-dom'
import Swal from 'sweetalert2'
import UserContext from '../UserContext' 
import OrderCard from '../components/OrderCard'
//import ProductCard from '../components/ProductCard'


export default function OrderView(){


		const [order, setOrder] = useState([])

		useEffect(() =>{
			fetch(`http://localhost:4000/orders/myOrder`, {
			headers: {
				Authorization: `Bearer ${localStorage.getItem("token")}`
			}
		})
		.then(res => res.json())
		.then(data => {
			console.log(data)

			setOrder(data.map(order => {
				return (
					<OrderCard key={order.id} orderProp = {order}/>
				)
			}))
		})
	}, [])

	/*		const [product, setProduct] = useState([])


		useEffect(() =>{
		fetch('http://localhost:4000/products/all')
		.then(res => res.json())
		.then(data => {
			console.log(data)

			setProduct(data.map(product => {
				return (
					<OrderCard key={product.id} prodProp = {product}/>
				)
			}))
		})
	}, [])*/

	return(
		<Fragment> 
			<h1>Cart</h1>
			<Container className="container-fluid justify-content-center">
			<Row className="m-4">
			{order}
			</Row>
			</Container>
		</Fragment>
	)
}