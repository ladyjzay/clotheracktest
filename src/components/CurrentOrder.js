import {Fragment, useEffect, useState} from 'react'
import {Container, Row} from 'react-bootstrap'
import OrderCard from '../components/OrderCard'


export default function CurrentOrder(){

	const [order, setOrder] = useState([])


		useEffect(() =>{
		fetch('http://localhost:4000/orders/myOrder')
		.then(res => res.json())
		.then(data => {
			console.log(data)

			setOrder((order => {
				return (
					<Fragment>
					<OrderCard key={order.id} orderProp = {order}/>
					</Fragment>
				)
			}))
		})
	}, [])

	return(
		<Fragment> 
			<h1 className="cat-header">Products</h1>
			<Container className="container-fluid justify-content-center">
			<Row className="m-4">
			{order}
			</Row>
			</Container>
		</Fragment>
	)
}