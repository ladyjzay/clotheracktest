import {useState, useEffect, useContext, Fragment} from 'react'
import {Row, Col, Container} from 'react-bootstrap'
import {Navigate, useNavigate, Link} from 'react-router-dom'
import Swal from 'sweetalert2'
import UserContext from '../UserContext'
import AdminProdCard from '../components/AdminProdCard'

export default function AdminAllProducts(){

	const [adminproduct, setAdminProduct] = useState([])
	
	useEffect(() => {
		fetch('http://localhost:4000/products/all')
		.then(res => res.json())
		.then(data => {
			//console.log(data)

			setAdminProduct(data.map((adminproduct, index) => {
				
				return(
					<Fragment>
					
					<AdminProdCard key={adminproduct.id} adminProdProp = {adminproduct}/>
								
					</Fragment>
				)
			}))
		})
	}, [])


	return(
		<Fragment>
		<Container>
			<h1>All Products</h1>
			<div>
			{adminproduct}
			</div>
	
			</Container>
		</Fragment>
	)
	
}