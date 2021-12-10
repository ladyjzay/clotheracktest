import {Fragment, useContext} from 'react'
import {Link} from 'react-router-dom'
import {Tabs, Tab, Container, Row} from 'react-bootstrap'
import UserContext from '../UserContext'
import AddProduct from '../components/AddProduct' 
import AdminAllProducts from '../components/AdminAllProducts'
import AdminEditProd from '../components/AdminEditProd'

import '../App.css'


export default function AdminProduct(){

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
			<Row className="m-0" >
				<Tabs className="mt-5 tabs-link" tabclassname="text-secondary">
				
					<Tab eventKey="allProduct" title="All Product">
						<Container>
							<Row className="mb-5">
		    					<AdminAllProducts/>
		    				</Row>
		    			</Container>
		  			</Tab>

					 <Tab eventKey="addProduct" title="Add Product">
					 	<Container>	
					 		<Row className="mb-5 ">
					    		<AddProduct/>
					    	</Row>
					    </Container>
					 </Tab>

					 <Tab eventKey="editProduct" title="Edit Product">
					    
					 	<Container>	
					 		<Row className="mb-5 ">
					    		 <AdminEditProd/>
					    	</Row>
					    </Container>
					 </Tab>
				 </Tabs>
				 </Row>
			</Container>
		</Fragment>	
	)
}