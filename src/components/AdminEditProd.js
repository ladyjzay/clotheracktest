import {useState, useEffect, useContext, Fragment} from 'react'
import {Row, Col, Card, Form, FormControl, Container, Button} from 'react-bootstrap'
//import {Navigate, useNavigate, Link} from 'react-router-dom'
//import Swal from 'sweetalert2'
//import UserContext from '../UserContext'
import AdminEditProdCard from '../components/AdminEditProdCard'

export default function AdminEditProd(){

	const [adminEditProduct, setAdminEditProduct] = useState([])

	const [name, setName] = useState('')


	function searchProduct(e) {
		e.preventDefault(e);

		fetch('http://localhost:4000/products/search',{
			method: 'POST',
			headers: {
				'Content-Type' : 'application/json'
			},
			body: JSON.stringify({
				name: name
			})
		})
		.then(res =>{
			console.log(res)
			return res.json()
		} )
		.then(data => {
			console.log(data)

			setAdminEditProduct(data.map(adminEditProduct => {
				return(
					<AdminEditProdCard key={adminEditProduct.id} adminEditProdProp = {adminEditProduct}/>
				)
			}))
		}, [])
	}


	return(
		<Fragment>
		<Container>
		<Row>
			<Col>
				<h1>Edit Product</h1>
			<Form>
				<Form.Group controlId="search-product">
					<Form.Label>Product Name: </Form.Label>
					<Form.Control
						type= 'name'
						value= {name}
						onChange = {(e) => setName(e.target.value)} 
					/>
				</Form.Group>
    <Button variant = 'secondary' type= 'submit' id = 'submitBtn' onClick={(e)=> searchProduct(e)}>
											Search
										</Button>
			</Form>	
			</Col>
		</Row>
			<Row>

			{adminEditProduct}
			</Row>
  		
			</Container>
		</Fragment>
	)
	
}