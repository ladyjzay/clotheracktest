import {useState, useEffect, useContext, Fragment} from 'react'
import {Row, Col, Form, Button} from 'react-bootstrap'
import {Navigate, useNavigate, Link} from 'react-router-dom'
import Swal from 'sweetalert2'
import UserContext from '../UserContext'

export default function Register(){

	const {user, setUser} = useContext(UserContext)

	const history = useNavigate()

	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [password2, setPassword2] = useState('')
	const [address, setAddress] = useState('')
	const [mobileNo, setMobileNo] = useState('')
	const [isActive, setIsActive] = useState(false)

	function registerUser(e){

		e.preventDefault();

		fetch('http://localhost:4000/users/register', {
			method: 'POST',
			headers: {
				'Content-Type' : 'application/json'
			},
			body: JSON.stringify({
				name : name,
				email: email,
				password : password,
				address: address,
				mobileNo: mobileNo,
			})
		})
		.then(res => res.json())
		.then(data => {
			//console.log(data)

			if(data === true){
				Swal.fire({
					title: 'Registration Successful',
					icon: 'success',
					text: 'Welcome to The Clothing Rack'
				})

				history('/login')

			} else {
				Swal.fire({
					title: 'Duplicate email Found',
					icon: 'error',
					text: 'Please provide a different email'
				})
			}
		})

		setName('');
		setEmail('');
		setPassword('');
		setPassword2('');
		setAddress('');
		setMobileNo('')
	}

	const retrieveUserDetails = (token) => {

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
		if((email !== '' && password !== '' && password2 !== '' && name !== '' && address !== '' && mobileNo !== '') && (password === password2)){
					setIsActive(true)	
			} else {
					setIsActive(false)
			}	

	}, [name, email, password, password2, address, mobileNo])

	return(

	/*	(user._id !== null) ?
			<Navigate to="/" />
		:
*/		<Fragment>
			<h1>Register</h1>
			<Row className="m-0 my-auto" style={{height: "603px"}}>
				<Col md={4} className= "mx-auto">
					<Form onSubmit={(e)=>registerUser(e)}>
						<Form.Group  controlId= "name" className="my-3">
						<Form.Label>Name:</Form.Label>
						<Form.Control
							type = 'name'
							placeholder = 'Please enter your full name here'
						 	value = {name} /*getter, the input*/
							onChange = {e => setName(e.target.value)} 
							required
						/>
						</Form.Group>

						<Form.Group  controlId= "email" className="my-2">
							<Form.Label>Email Address:</Form.Label>
							<Form.Control
								type = 'email'
								placeholder = 'your-email@mail.com'
							 	value = {email} /*getter, the input*/
								onChange = {e => setEmail(e.target.value)} /*if may nagbago sa input field mag setEmail kukunin niya yun value.. setter*/
								required
							/>
							<Form.Text className = "text-muted">
								We'll never share your email with anyone else. 
							</Form.Text>	
						</Form.Group>

						<Form.Group controlId= "address" className="my-2">
							<Form.Label>Complete Address:</Form.Label>
							<Form.Control
								type = 'address'
							 	value = {address} /*getter, the input*/
								onChange = {e => setAddress(e.target.value)} 
								required
							/>
						</Form.Group>

							<Form.Group controlId= "mobileNo" className="my-2">
							<Form.Label>Mobile No:</Form.Label>
							<Form.Control
								type = 'mobileNo'
								placeholder = '09xx-xxx-xxxx'
							 	value = {mobileNo} /*getter, the input*/
								onChange = {e => setMobileNo(e.target.value)} 
								required
							/>
						</Form.Group>
						
						<Form.Group controlId = "password" className="my-2">
							<Form.Label>Password:</Form.Label>
							<Form.Control
								type = "password"
								value = {password}
								onChange = {e => setPassword(e.target.value)}
								required
							/>
						</Form.Group>

						<Form.Group controlId = "password2" className="my-3">
							<Form.Label>Verify Password:</Form.Label>
							<Form.Control
								type = 'password'
								placeholder = 'Please verify your password'
								value = {password2}
								onChange = {e => setPassword2(e.target.value)}
								required
							/>
						</Form.Group>
						<div className="my-4">
							{ isActive ? 
							<Button variant = 'secondary' type= 'submit' id = 'submitBtn'>
								Register
							</Button>

							: 
							<Button variant = 'secondary' type= 'submit' id = 'submitBtn' disabled>
								Register
							</Button>
						}
						</div>
						
					</Form>

				</Col>
			</Row>
		</Fragment>
		
	)
}