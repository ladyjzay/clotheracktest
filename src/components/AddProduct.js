import {useState, useEffect, useContext, Fragment} from 'react'
import {Row, Col, Form, Button, Table} from 'react-bootstrap'
import {Navigate, useNavigate, Link} from 'react-router-dom'
import Swal from 'sweetalert2'
import UserContext from '../UserContext'

export default function AddProduct(){

	const {user, setUser} = useContext(UserContext)

	const history = useNavigate()

	const [name, setName] = useState('')
	const [description, setDescription] = useState('')
	const [category, setCategory] = useState('')
	const [price, setPrice] = useState('')
	const [img, setImg] = useState('')
	const [inStock, setInStock] = useState('')

	const [isActive, setIsActive] = useState(false)

	function addNewProduct(e){

		e.preventDefault();

		fetch(`http://localhost:4000/products/addProduct`, {
			method: 'POST',
			headers: {
				"Content-Type" : "application/json",
				Authorization : `Bearer ${localStorage.getItem("token")}`
			}, 
			body: JSON.stringify({
				name: name,
				description: description,
				category: category,
				price: price,
				img: img,
				inStock: inStock
			})
		})
		.then(res =>{
			console.log(res)
			return res.json()
		})
		.then(data => {
			console.log(data)

			if(data){
				Swal.fire({
					title: "Success",
					icon: 'success',
					text: `Product is added`
				})
			} else {
				Swal.fire({
					title: 'Duplicate',
					icon: 'error',
					text: 'Product already exist'
				})
			}

		})

		setName('');
		setDescription('')
		setCategory('')
		setPrice('')
		setImg('')
		setInStock('')
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
		if((name !== '' && description !== '' && category !== '' && price !== '' && inStock !== '' && img !== '')){
			setIsActive(true)
		} else {
			setIsActive(false)
		}
	}, [name, description, category, price, img, inStock])

	return(
		// (user._id !== null || user.isAdmin !== true) ?
		// 	<Navigate to= "/" />
		// :

		<Fragment  >
			<Row className="m-0 " style={{height: "603px"}}>
				<Col lg ={{span: 10, offset: 3}} className= "mx-auto my-auto">
					<h1>Add Product</h1>
					<Form onSubmit={(e) => addNewProduct(e)}>
					<Table striped bordered hover >
 						<thead>
						    <tr>
						      <th>Image</th>
						      <th>Name</th>
						      <th>Description</th>
						      <th>Category</th>
						      <th>Price</th>
						      <th>Quantity</th>
						      <th>Action</th>
						    </tr>
						  </thead>
						  <tbody>
						    <tr>
						    <td>
						      <Form.Group controlId= "img">
							<Form.Control 
 								type = 'file'
 								value = {img}
 								onChange = {e => setImg(e.target.value)}
 								required
							>
							</Form.Control>
						</Form.Group>
						</td>
						      <td>
						      <Form.Group controlId= "name">
							<Form.Control 
 								type = 'name'
 								value = {name}
 								onChange = {e => setName(e.target.value)}
 								required
							/>
						</Form.Group>
						</td>
						      <td>
						      <Form.Group>
							<Form.Control 
								type = 'description'
 								value = {description}
 								onChange = {e => setDescription(e.target.value)}
 								required
							/>
						</Form.Group>
						</td>
						      <td>
						      	<Form.Group>
							<Form.Control 
								as = "select"
								type = 'category'
 								value = {category}
 								onChange = {e => setCategory(e.target.value)}
 								required
							>
								<option value="top">Top</option>
								<option value="bottom">Bottom</option>
								<option value="dress">Dress</option>
								<option value="accessory">Accessory</option>
							</Form.Control>
						</Form.Group>
						      </td>

						      <td>
						      	<Form.Group>
							<Form.Control 
								type = 'price'
 								placeholder = 'Php'
 								value = {price}
 								onChange = {e => setPrice(e.target.value)}
 								required
							/>
						</Form.Group>

						      </td>

						      <td>
						      	<Form.Group>
							<Form.Control 
								type = 'inStock'
 								placeholder = '0'
 								value = {inStock}
 								onChange = {e => setInStock(e.target.value)}
 								required
							/>
						</Form.Group>
						      </td>

						      <td>
									<div>
							{ isActive ? 
								<Button variant = 'secondary' type= 'submit' id = 'submitBtn'>
								Add Product
							</Button>

							: 
							<Button variant = 'secondary' type= 'submit' id = 'submitBtn' disabled>
								Add Product
							</Button>

							}
						</div>
						      </td>
						    </tr>
						  </tbody>
						</Table>
					</Form>
				</Col>
			</Row>
		</Fragment>
	)
}