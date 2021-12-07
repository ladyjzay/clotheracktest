import {Fragment, useContext, useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import {Tabs, Tab} from 'react-bootstrap'
import UserContext from '../UserContext'
import AddProduct from '../components/AddProduct' 

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
			<Tabs defaultActiveKey="allProduct" id="uncontrolled-tab-example" className="mb-3" tabClassName="text-secondary">
			
				<Tab eventKey="allProduct" title="All Product">
    		
  			</Tab>
			  <Tab eventKey="addProduct" title="Add Product">
			    <AddProduct/>
			  </Tab>
			  <Tab eventKey="editProduct" title="Edit Product">
			    
			  </Tab>
			  <Tab eventKey="archiveProduct" title="Archive Product">
			  </Tab>
			</Tabs>
		</Fragment>	
	)
}