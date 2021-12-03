import React from 'react'
import {Link} from 'react-router-dom'
import {Row, Col} from 'react-bootstrap'

export default function NotFound(){

	return(
		<Row>
			<Col className = "p-5">
				<h1>404 - Page Not Found</h1>
				<Link to="/">Go Home</Link>
			</Col>
		</Row>
	)
}