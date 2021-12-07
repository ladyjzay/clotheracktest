import {Fragment, useEffect, useState} from 'react'
import {Container, Row} from 'react-bootstrap'
import {useParams}from 'react-router-dom'
import ProductCard from '../components/ProductCard'

import '../App.css'

export default function CatProducts(){

	const {category} = useParams()

	const [product, setProduct] = useState([])


		useEffect(() =>{
		fetch(`http://localhost:4000/products/categories/${category}`)
		.then(res => res.json())
		.then(data => {
			console.log(data)

			setProduct(data.map(product => {
				return (
					<ProductCard key={product.id} prodProp = {product}/>
				)
			}))
		})
	}, [category])

	return(
		<Fragment> 
			<h1 className="cat-header">{category}</h1>
			<Container className="container-fluid justify-content-center">
			<Row className="m-4">
			{product}
			</Row>
			</Container>
		</Fragment>
	)
}