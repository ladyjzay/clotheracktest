import {Fragment, useState, useEffect,useContext} from 'react'
import {Row, Col, Card, Container, Button, ButtonGroup, Modal, Form} from 'react-bootstrap'
//import {Link} from 'react-router-dom'
import Swal from 'sweetalert2'
import UserContext from '../UserContext'

import '../App.css'


export default function AdminEditProdCard({adminEditProdProp}){

	//console.log(adminEditProdProp)

	const {_id, name, description, category, price, inStock, isActive, createdOn, img } = adminEditProdProp

	const [show, setShow] = useState(false);

	const [prodimg, setProdimg] = useState("");
	const [prodname, setProdname] = useState("");
	const [proddesc, setProddesc] = useState("");
	const [prodcat, setProdcat] = useState("");
	const [prodprice, setProdprice] = useState("");

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const {user, setUser} = useContext(UserContext)

	const editProduct = (e, prodID) =>{
		e.preventDefault();

		fetch(`http://localhost:4000/products/${prodID}`, {
			method:'PUT',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${localStorage.getItem("token")}`
			},
			body :JSON.stringify({
				name: prodname,
				description: proddesc,
				category: prodcat,
				price:prodprice,
				img: prodimg
			})
		})
		.then(res => res.json())
		.then(data => {
		 	if (data) {

				Swal.fire({
					title: "Success",
					icon: "success",
					text: "Product successfully updated."
				});

				window.location.reload(false);

			} else {

				Swal.fire({
					title: "Something went wrong",
					icon: "error",
					text: "Please try again."
				});

			}
		})
	}


	function archiveProduct(e){
		e.preventDefault(e);

		fetch(`http://localhost:4000/products/${_id}/archive`, {
			method: 'PUT',
			headers: {
				Authorization: `Bearer ${localStorage.getItem("token")}`
			}
		})
		.then(res => res.json())
		.then(data => {
			if(data){
				Swal.fire({
					title: 'Archive Successful!',
					icon: 'success',
					text: 'Product archived'
				})

				window.location.reload(false);
				
			} else {
				Swal.fire({
					title: 'Authentication Failed',
					icon: 'error',
					text: 'Check your login details'
				})
			}
		})
	}

	function reactivateProduct(e){
	

		fetch(`http://localhost:4000/products/${_id}/reactivate`, {
			method: 'PUT',
			headers: {
				Authorization: `Bearer ${localStorage.getItem("token")}`
			}
		})
		.then(res => res.json())
		.then(data => {
			if(data){
				//console.log(data)
				Swal.fire({
					title: 'Success!',
					icon: 'success',
					text: 'Product is now available'
				})
				 window.location.reload(false);
				
			} else {
				Swal.fire({
					title: 'Authentication Failed',
					icon: 'error',
					text: 'Check your login details'
				})
			}
		})
	}

	return(
		<Container>
			<Row className = "my-3">
				<Col>
					<Card className = "p-1">
						<Card.Body>
							<Container>
								<Row className= "mt-2">
									<Col md={4} className="text-center" >
										<Card.Img variant= "left" src={`../../images/${name}.jpg`} style={{ height: "500rem"}} className="img-adminView"/>
									</Col>
											
									<Col md={4} className= "my-auto mx-auto">
										<Card.Title>Product Id:</Card.Title>
										<Card.Title>Name:</Card.Title>
										<Card.Title>Description:</Card.Title>
										<Card.Title>Category:</Card.Title>
										<Card.Title>Price:</Card.Title>
										<Card.Title>Stock</Card.Title>
										<Card.Title>Date Created:</Card.Title>
									</Col>

									<Col md={4}  className= "my-auto">
										<Card.Title>{_id}</Card.Title>
										<Card.Title>{name}</Card.Title>
										<Card.Title>{description}</Card.Title>
										<Card.Title>{category}</Card.Title>
										<Card.Title>{price}</Card.Title>
										<Card.Title>{inStock}</Card.Title>
										<Card.Title>{isActive}</Card.Title>
										<Card.Title>{createdOn}</Card.Title>
									</Col >
								</Row>
								<Row>
									<Col md={3} className= "mt-4 mx-auto">
										<ButtonGroup aria-label="Basic example">
										  <Button variant="secondary" onClick={handleShow}>Edit</Button>
										  { (isActive === true) ?
										  <Button variant="secondary"className="mx-3" onClick={(e)=> archiveProduct(e)} >Archive</Button>
										  : 
										  <Button variant="secondary"className="mx-3" onClick={(e)=> reactivateProduct(e)} >Activate</Button>

										  }
					  					</ButtonGroup>
									</Col>
								</Row>
						</Container>
					</Card.Body>
				</Card>
			</Col>
		</Row>

		<Modal show={show} onHide={handleClose} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
	        <Form onSubmit={e => editProduct(e, _id)}>
		        <Modal.Header closeButton>
		          <Modal.Title id="contained-modal-title-vcenter">EDIT PRODUCT: {name}</Modal.Title>
		        </Modal.Header>
		        
		        <Modal.Body>
		      		<Form.Group>
		      			<Form.Label>Image</Form.Label>
		        		<Form.Control type = 'file' onChange = {e => setProdimg(e.target.value)} required	/>
		        	</Form.Group>

		        	<Form.Group>
		        		<Form.Label>Name</Form.Label>
		        		<Form.Control type="text" onChange={e => setProdname(e.target.value)} required/>
		        		<Form.Text>
		        		     Make sure product name and image name matched.
		        		</Form.Text>

		        	</Form.Group>

		        	<Form.Group>
		        		<Form.Label>Description</Form.Label>
		        		<Form.Control type="text" onChange={e => setProddesc(e.target.value)} required/>
		        	</Form.Group>

		        	<Form.Group>
		        		<Form.Label>Category</Form.Label>	
		        		<Form.Control as = "select" onChange={e => setProdcat(e.target.value)} required>
 						
		        		<option value="top">Top</option>
						<option value="bottom">Bottom</option>
						<option value="dress">Dress</option>
						<option value="accessory">Accessory</option>

						</Form.Control>
						<Form.Text>
		        		     Make sure to select category
		        		</Form.Text>

		        	</Form.Group>

		        	<Form.Group>
		        		<Form.Label>Price</Form.Label>
		        		<Form.Control type="text" onChange={e => setProdprice(e.target.value)} required/>
		        	</Form.Group>


		        </Modal.Body>
		        
		        <Modal.Footer>
		            <Button variant="secondary" type="submit">Submit</Button>
		        </Modal.Footer>
		    </Form>    
      </Modal>
	</Container>
	)

}
