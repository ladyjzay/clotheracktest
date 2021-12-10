import {Fragment, useContext, useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {Tabs, Tab, Col, Row, Container} from 'react-bootstrap'
import Swal from 'sweetalert2'
import UserContext from '../UserContext' 
import OrderCard from '../components/OrderCard'
import OrderHistoryView from '../components/OrderHistoryView'

export default function OrderView() {

	const {user, setUser} = useContext(UserContext)
	const [orderId, setOrderId] = useState('')

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
		
			setOrderId(data._id)
		
			console.log(orderId)
		})
	}, [])

	return(

		<Fragment>
		 	<Container >
		 	<Row >
			<Tabs defaultActiveKey="currentOrder" className="mt-5 tabs-link" tabClassName="text-secondary">
			
				<Tab eventKey="currentOrder" title="My Order">
    				<Container>
    					<Row className="mb-5 ">
    			
    						<OrderCard/>
    						<Col className="text-end">
    							<Link className= "btn btn-secondary mx-2" to = {`/checkout`}>PROCEED TO CHECKOUT</Link>
  							</Col>
  						</Row>
  					</Container>
  				</Tab>
			  
			  	<Tab eventKey="prev" title="Past Orders">
			    	<Container>
    					<Row className="mb-5">
    			
    						<OrderHistoryView/>
    						<Col className="text-end">
  							</Col>
  						</Row>
  					</Container>
			 	 </Tab>
			</Tabs>
			</Row>
			</Container>
		</Fragment>	
	)
}


