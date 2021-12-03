import {useContext} from 'react';
import {Row, Col, Button} from 'react-bootstrap'
import {Link} from 'react-router-dom';
import UserContext from '../UserContext';
import '../App.css'

export default function TopBanner() {

	const {user} = useContext(UserContext)

	return (
		<Row id="topbanner">
		<Col  >
			<p className= "text-center pt-2 mb-1" >FREE SHIPPING FOR METRO MANILA ORDERS FOR EVERY MINIMUM PURCHASE OF P2000.</p>
		</Col>
		</Row>
	)
}