//*******************************************************//
//Author:                    Date:
//Kimberly Coquilla          12-08-2021
//*******************************************************//
import {useState, useEffect, useContext, Fragment} from 'react';
import {Row, Col, Form, Button, CardGroup,Card, Image, Table,Container} from 'react-bootstrap';
import {Navigate, useNavigate, Link} from 'react-router-dom';
import Swal from 'sweetalert2'
import UserContext from '../UserContext';
import CheckoutCard from '../components/CheckoutCard'

export default function Checkout() {

	// Fetch all user details to be used for shipping
	const {user, setUser} = useContext(UserContext)

	const history = useNavigate()

	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [address, setAddress] = useState('')
	const [mobileNo, setMobileNo] = useState('')

	const [orderId, setOrderId] = useState('')

	useEffect(() => {

		fetch(`http://localhost:4000/users/details`, {
			headers: {
				Authorization: `Bearer ${localStorage.getItem("token")}`
			}
		})
		.then(res => res.json())
		.then(data => {
		 	setName(data.name)
		 	setEmail(data.email)
		 	setAddress(data.address)
		 	setMobileNo(data.mobileNo)
		})
	}, [])

	useEffect(() => {

		fetch(`http://localhost:4000/orders/myOrder`, {
			headers: {
				Authorization: `Bearer ${localStorage.getItem("token")}`
			}
		})
		.then(res => res.json())
		.then(data => {
			data = data[0];
			console.log(data)
			
			if(data._id !== undefined){
			setOrderId(data._id)
			} else {
				setOrderId('')
			}
			
		})
	}, [])

	console.log(orderId)

	function archiveOrder(e) {
		e.preventDefault(e);

		fetch(`http://localhost:4000/orders/${orderId}/archive`, {
			method: 'PUT',
			headers: {
				Authorization: `Bearer ${localStorage.getItem("token")}`
			}
		})
		.then(res => res.json())
		.then(data => {
			
			if(data){
				Swal.fire({
					title: 'Payment Successful!',
					icon: 'success',
					text: 'Thank you for shopping'
				})

				history('/')
				
			} else {
				Swal.fire({
					title: 'Authentication Failed',
					icon: 'error',
					text: 'Check your login details'
				})
			}
		})

	}

	return (
	<Fragment>
	<Container>
		<Row>
		<Card.Footer>
		      <small>PLEASE REVIEW YOUR DETAILS</small>
		</Card.Footer>
		<h1>SHIPPING INFO</h1>
		
		<CardGroup className="mb-4">
			<Card>
			  <Card.Body>
			    <Card.Text className="mb-2 ">Customer Name: </Card.Text>
			    <Card.Text className="mb-2">E-mail: </Card.Text>
			    <Card.Text className="mb-2">Address: </Card.Text>
			    <Card.Text className="mb-2">Contact Number: </Card.Text>
			  </Card.Body>
			</Card>

			<Card>
			  <Card.Body>
			    <Card.Text className="mb-2 ">{name}</Card.Text>
			    <Card.Text className="mb-2 ">{email}</Card.Text>
			    <Card.Text className="mb-2 ">{address}</Card.Text>
			    <Card.Text className="mb-2 ">{mobileNo}</Card.Text>
			  </Card.Body>
			</Card>
		</CardGroup>
		</Row>	
		<Row>
		<h1>ORDERS</h1>
		<CheckoutCard/>
		</Row>
		<Row className="mb-5">
	   <Link className= "btn btn-secondary mx-2" to = {`/`} onClick={(e)=> archiveOrder(e)} >CHECKOUT AND PAY</Link>
	   	</Row>
	 </Container>
	</Fragment>


		)
}
