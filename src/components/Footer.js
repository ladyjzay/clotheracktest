import {useContext, Fragment} from 'react';
import {Row, Col, Button, InputGroup, Form} from 'react-bootstrap'
import {Link} from 'react-router-dom';
import UserContext from '../UserContext';
import '../App.css'

export default function Footer() {

	const {user} = useContext(UserContext)

	return (
		<Fragment>
			<Row className="mx-0 pt-5 pb-4 footer">
				<Col md={2}></Col>
				<Col  className= "mx-0" md={4}>
					<h5>CONTACT US</h5>
					<p>Need help? We're here for you!</p>
					<p>Please don't hesistate to contact us on @theclothesrack</p>
					<p>or send us an email!</p>
				</Col>
				<Col className="mx-0" md={4}>
					<h5>NEWSLETTER</h5>
					<p>Keep in touch with us! Subscribe to our newsletter.</p>
				<InputGroup className="mb-3">
   				 	<Form.Control
      					placeholder="Your Email"
    				/>
    				<Button variant="outline-secondary" id="button-addon2">
      					Join
    				</Button>
  				</InputGroup>
  				<Col md={2}></Col>
				</Col>
			</Row>
		</Fragment>
	
	)
}