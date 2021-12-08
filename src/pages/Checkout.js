//*******************************************************//
//Author:                    Date:
//Kimberly Coquilla          12-08-2021
//*******************************************************//
import {useState, useEffect, useContext, Fragment} from 'react';
import {Row, Col, Form, Button, CardGroup,Card, Image, Table,Container} from 'react-bootstrap';
import {Navigate, useNavigate, Link} from 'react-router-dom';
import Swal from 'sweetalert2'
import UserContext from '../UserContext';
import OrderCard from '../components/OrderCard'

export default function Checkout() {

	// Fetch all user details to be used for shipping
	const {user, setUser} = useContext(UserContext)

	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [address, setAddress] = useState('')
	const [mobileNo, setMobileNo] = useState('')

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
		<OrderCard/>
		</Row>
		<Row className="mb-5">
	   <Link className= "btn btn-secondary mx-2" to = {`/`}>CHECKOUT AND PAY</Link>
	   	</Row>
	 </Container>
	</Fragment>


		)
}
