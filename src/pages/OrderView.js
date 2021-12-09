import {Fragment, useContext} from 'react'
import {Link} from 'react-router-dom'
import {Tabs, Tab, Col, Row, Container} from 'react-bootstrap'
import Swal from 'sweetalert2'
import UserContext from '../UserContext' 
import OrderCard from '../components/OrderCard'

export default function OrderView() {

	const {user, setUser} = useContext(UserContext)

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

	return(
		<Fragment>
		 	<Container>
			<Tabs defaultActiveKey="currentOrder" id="uncontrolled-tab-example" className="mb-3" tabClassName="text-secondary">
			
				<Tab eventKey="currentOrder" title="My Order">
    				<Container>
    					<Row className="mb-5 my-auto">
    						<OrderCard/>
    						<Col className="text-end">
    							<Link className= "btn btn-secondary mx-2" to = {`/checkout`}>PROCEED TO CHECKOUT</Link>
  							</Col>
  						</Row>
  					</Container>
  				</Tab>
			  
			  	<Tab eventKey="prev" title="Past Orders">
			    
			 	 </Tab>
			</Tabs>
			</Container>
		</Fragment>	
	)
}


