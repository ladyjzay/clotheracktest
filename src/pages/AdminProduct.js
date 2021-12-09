import {Fragment, useContext} from 'react'
import {Link} from 'react-router-dom'
import {Tabs, Tab, Container} from 'react-bootstrap'
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
				<Tabs 
				id="admin-tab" 
				className="mb-3" 
				tabclassname="text-secondary"
				>
				
					<Tab eventKey="allProduct" title="All Product">
						<div>
		    			<AdminAllProducts/>
		    			</div>
		  			</Tab>

					 <Tab eventKey="addProduct" title="Add Product">
					 	<div>
					    <AddProduct/>
					    </div>
					 </Tab>

					 <Tab eventKey="editProduct" title="Edit Product">
					    <AdminEditProd/>
					 </Tab>
				 </Tabs>
			</Container>
		</Fragment>	
	)
}