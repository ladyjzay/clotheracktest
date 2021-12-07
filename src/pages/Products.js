import {Fragment, useEffect, useState} from 'react'
import {Container, Row} from 'react-bootstrap'
import ProductCard from '../components/ProductCard'


export default function Products(){

	const [product, setProduct] = useState([])


		useEffect(() =>{
		fetch('http://localhost:4000/products/all')
		.then(res => res.json())
		.then(data => {
			console.log(data)

			setProduct(data.map(product => {
				return (
					<ProductCard key={product.id} prodProp = {product}/>
				)
			}))
		})
	}, [])

	return(
		<Fragment> 
			<h1 className="cat-header">Products</h1>
			<Container className="container-fluid justify-content-center">
			<Row className="m-4">
			{product}
			</Row>
			</Container>
		</Fragment>
	)
}