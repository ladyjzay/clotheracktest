import {Fragment} from 'react'
import {Row, Col, Image, Button} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import '../App.css'

export default function Banner(){

	return(
		<Fragment>

			<Row className="mx-0">
				<Col className= "px-0">
					<Image src="../images/banner.jpg" id="banner"/>
					<Button id="shopnow-btn" as={Link} to="/products">Shop Now</Button>
				</Col>
			</Row>
		</Fragment>

		)
}