import {Fragment, useContext} from 'react'
import {Link} from 'react-router-dom'
import {Tabs, Tab} from 'react-bootstrap'
import Swal from 'sweetalert2'
import UserContext from '../UserContext' 
import OrderCard from '../components/OrderCard'
import CurrentOrder from '../components/CurrentOrder'

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
			<Tabs defaultActiveKey="currentOrder" id="uncontrolled-tab-example" className="mb-3" tabClassName="text-secondary">
			
				<Tab eventKey="currentOrder" title="My Order">
    			<CurrentOrder />
  			</Tab>
			  <Tab eventKey="prev" title="Past Orders">
			    
			  </Tab>
			</Tabs>
		</Fragment>	
	)
}


