import {Fragment} from 'react'
import {Row, Col, Button, Image} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import '../App.css'

export default function Categories(){

	return(
	<Fragment id="categories" >
		<Row className="my-5 mx-0 py-4">
			<Col className="text-center" >
				<h4>Welcome to our little clothe shop</h4>
				<p><em>Clothe pieces for everyday life aesthetic. Feel free to browse our products and we hope to share the pieces that truly make you spark some joy.</em></p>
			</Col>
		</Row>

		<Row className="m-0 row">
			<Col className="px-0" md={6}>
				<Image src="../images/tops.jpg" className="categoriesImg"/>
			</Col>
			
			<Col className="my-auto" md={6}>
				<div className=" mx-5 px-5 text-center">
					<h5>Tops</h5>
					<p><em>Timeless pieces to help you find connection with fashion</em></p>
					<Button variant="outline-secondary"  as={Link} to="/products/categories/top" exact>Shop for Blouses and Shirts</Button>
				</div>
			</Col>
		</Row>


		<Row className="flex-column-reverse flex-sm-row m-0 row">
			
			<Col className="my-auto" md={6}>
				<div className=" mx-5 px-5 text-center">
					<h5>Bottoms</h5>
					<p>Timeless pieces to help you find connection with fashion</p>
					<Button variant="outline-secondary"  as={Link} to="/products/categories/bottom" exact>Shop for Skirts and Pants</Button>
				</div>
				
			</Col>
			<Col className="px-0"  md={6}>
				<Image src="../images/bottoms.jpg" className="categoriesImg"/>
			</Col>
		</Row>

		<Row className="m-0 row">
			<Col className="px-0" md={6}>
				<Image src="../images/dresses.jpg" className="categoriesImg"/>
			</Col>
			<Col className="my-auto" md={6}>
				<div className=" mx-5 px-5 text-center">
					<h5>Dresses</h5>
					<p><em>Timeless pieces to help you find connection with fashion</em></p>
					<Button variant="outline-secondary" as={Link} to="/products/categories/dress" exact>Shop for Dresses and Coords</Button>
				</div>
			</Col>
		</Row>

		<Row className="flex-column-reverse flex-sm-row m-0 row">
			{/*<Col md={1}></Col>*/}
			<Col className="my-auto" md={6}>
				<div className=" mx-5 px-5 text-center">
					<h5>Accessories</h5>
					<p>Timeless pieces to help you find connection with fashion</p>
					<Button variant="outline-secondary" as={Link} to="/products/categories/accessory" exact>Shop for Accessories</Button>
				</div>
				
			</Col>
			<Col className="px-0"  md={6}>
				<Image src="../images/accessories.jpg" className="categoriesImg"/>
			</Col>
		</Row>
	</Fragment>
	)
}