import {Fragment , useContext} from 'react'
import {Nav, Navbar, NavDropdown} from 'react-bootstrap'
import {FaCartArrowDown} from "react-icons/fa";
import {Link} from 'react-router-dom' 
import UserContext from '../UserContext'
import '../App.css';

export default function AppNavbar(){

	const {user} = useContext(UserContext)


	return(
		<Navbar id="navbar" expand="lg" className="mx-5 px-5">
			<Navbar.Brand as={Link} to="/" exact >The Clothes Rack</Navbar.Brand>
			<Navbar.Toggle aria-controls="basic-navbar-nav" />
			<Navbar.Collapse id="basic-navbar-nav">
				<Nav className="justify-content-end" style={{ width: "100%" }}>
					<Nav.Link as={Link} to="/" exact >Home</Nav.Link>
					<NavDropdown title="Catalog" id="basic-nav-dropdown">
          				<NavDropdown.Item as={Link} to="/products" exact>All</NavDropdown.Item>
          				<NavDropdown.Item as={Link} to="/products/categories/top" exact>Tops</NavDropdown.Item>
          				<NavDropdown.Item as={Link} to="/products/categories/bottom" exact>Bottoms</NavDropdown.Item>
          				<NavDropdown.Item as={Link} to="/products/categories/dress" exact>Dress</NavDropdown.Item>
          				<NavDropdown.Item as={Link} to="/products/categories/accessory" exact>Accessories</NavDropdown.Item>
        			</NavDropdown>
        			
        			
        			{(user.id !== null && user.isAdmin === false) ?
						<Fragment>
							<Nav.Link as={Link} to="/logout" exact>Logout</Nav.Link>
							<Nav.Link as={Link} to="/myOrder" exact><FaCartArrowDown/></Nav.Link>
						</Fragment>
					:	(user.id !== null && user.isAdmin === true) ?
						<Fragment>
							<NavDropdown title="Admin" id="basic-nav-dropdown">
		        				<NavDropdown.Item as={Link} to="/AdminProduct" exact>Products</NavDropdown.Item>
		        				<NavDropdown.Item as={Link} to="/AdminOrderView" exact>Orders</NavDropdown.Item>
		        			</NavDropdown>
		        			<Nav.Link as={Link} to="/logout" exact>Logout</Nav.Link>
						</Fragment>
					:
						<Fragment>
							<Nav.Link as={Link} to="/login" exact>Login</Nav.Link>
						</Fragment>
					}
				</Nav>
			</Navbar.Collapse>
		</Navbar>
	)
}