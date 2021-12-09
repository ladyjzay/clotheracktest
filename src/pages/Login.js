import {useState, useEffect, useContext, Fragment} from 'react';
import {Row, Col, Form, Button, Card, Image} from 'react-bootstrap';
import {Navigate, useNavigate, Link} from 'react-router-dom';
import Swal from 'sweetalert2'
import UserContext from '../UserContext';
import '../App.css'

export default function Login(){

	const {user, setUser} = useContext(UserContext)

	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [isActive, setIsActive] = useState(true)

	const history = useNavigate()

	function authenticate(e){

		e.preventDefault();

		fetch('http://localhost:4000/users/login', {
			method: 'POST',
			headers: {
				'Content-Type' : 'application/json'
			},
			body: JSON.stringify({
				email: email,
				password: password
			})
		})
		.then(res => res.json())
		.then(data => {
			console.log(data)

			if(typeof data.access !== 'undefined'){
				localStorage.setItem('token', data.access)
				retrieveUserDetails(data.access)

				Swal.fire({
					title: 'Login Successful!',
					icon: 'success',
					text: 'Welcome to The Clothes Rack'
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

		setEmail('');
		setPassword('');
	}

	const retrieveUserDetails = (token) =>{
		fetch('http://localhost:4000/users/details', {
			headers:{
				Authorization: `Bearer ${token}`
			}
		})
		.then(res => res.json())
		.then(data => {
			console.log(data)

			setUser({
				id: data._id,
				isAdmin: data.isAdmin
			})
		})
	}

	useEffect (() => {
		if(email !== '' && password !== ""){
			setIsActive(true)
		} else {
			setIsActive(false)
		}
	}, [email, password])

	return(

	/*	(user.id !== null) ?

			<Navigate to="/" />
		:*/

		<Fragment>
			<Row className="m-0 " style={{height: "603px"}}>
				<Card className="text-black my-auto" border="0" >
					<Card.Img src="../images/login.jpg" alt="login" id="login-img"/>
					 <Card.ImgOverlay>
					 	<Row className="m-0 mt-5 p-5" >
							<Col md={3} className="mx-auto text-center">
								<Form onSubmit={(e)=>authenticate(e)}>
									<Form.Group controlId= "userEmail">
										<Form.Label></Form.Label>
										<Form.Control 
											type= 'email'
											placeholder= 'Enter email'
											value = {email} 
											onChange = {(e) => setEmail(e.target.value)}
											required
										/>
										</Form.Group>

									<Form.Group controlId = "password" className="my-4">
										<Form.Label></Form.Label>
										<Form.Control 
											type = "password"
											placeholder = "Password"
											value = {password}
											onChange = {(e) => setPassword(e.target.value)}
											required
										/>
									</Form.Group>

									{ isActive ? 
										<Button variant = 'secondary' type= 'submit' id = 'submitBtn' >
											Submit
										</Button>

										: 
										<Button variant = 'secondary' type= 'submit' id = 'submitBtn' disabled>
											Submit
										</Button>
									}
										<Button variant = 'secondary'as={Link} to="/register" className="mx-4" >
											Signup Here
										</Button>

								</Form>
							</Col>
						</Row>
					</Card.ImgOverlay>
				</Card>
			</Row>
		</Fragment>
	)

}