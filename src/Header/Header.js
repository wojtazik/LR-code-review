import './Header.css'

import 'bootstrap/dist/css/bootstrap.min.css'
import { Nav, Navbar, NavDropdown, Button, Container } from 'react-bootstrap'
import {Link} from "react-router-dom";



import { connect } from 'react-redux';
import { mapStateToProps,mapDispatchToProps } from "../Redux/allReducers";
import React from 'react';


function Header(props)
{

    const [basketLength ,setBasketLength] = React.useState(0)

    const loginModal = () => { props.modalSet("login") }

    const logout = () =>
    {
        props.loggedReset()
    }

    React.useEffect(() =>
    {
        if (props.state.Users.logged !== undefined) {
            const id = props.state.Users.logged;
            const user = props.state.Users.list[id];
            const basket = user.basket.items
            setBasketLength(basket.length)            
        } else {
            setBasketLength(0)
        }
    })

    return (
        <Navbar className='shadow' sticky="top" bg="light" expand="md">
            <Container fluid>
                <Navbar.Brand href="#">SklepOnlineV2.pl</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-0 my-lg-0"
                        navbarScroll>
                        <Nav.Link as={Link} to="/"  id="home">Home</Nav.Link>
                        <Nav.Link as={Link} to="/Offert" id="offert">Oferta</Nav.Link>
                        {(() =>
                        {
                            if (basketLength === 0) {
                                return (
                                    <Nav.Link as={Link} to="/Basket" id="basket">Koszyk</Nav.Link>)
                                } else {
                                return (
                                    <Nav.Link className='basketColor' as={Link} to="/Basket" id="basket">Koszyk ({basketLength})</Nav.Link>
                                )
                            } 
                        })()}

                        <Nav.Link as={Link} to="/Contact" id="contact">Kontakt</Nav.Link>
                        {(() =>
                        {
                            if (props.state.Users.adminsId.indexOf(props.state.Users.logged) >= 0) {
                                return (
                                    <NavDropdown title="Panel" id="navbarScrollingDropdown">
                                        <NavDropdown.Item as={Link} to="/AddOffert" id="addOffert">Dodaj oferte</NavDropdown.Item>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item as={Link} to="/Ussers" id="usersList">Lista użytkowników</NavDropdown.Item>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item as={Link} to="/ContactChange" id="contact">Zmień kontakty</NavDropdown.Item>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item as={Link} to="/ColorsSet" id="colorsSet">Kolory strony</NavDropdown.Item>
                                    </NavDropdown>
                                )
                            } 
                        })()}
                    </Nav>

                    {(() =>
                    {
                        if (props.state.Users.logged === undefined) {
                            
                            return (<Button variant="outline-success" onClick={loginModal}>Zaloguj</Button>)
                            
                        } else { 

                            return (
                                <div className='userBtns'>
                                    <Link className='userMenuBtn' to="/UserProfil">
                                        <img src={props.state.Users.list[props.state.Users.logged].photo}/>
                                        {props.state.Users.list[props.state.Users.logged].nick}
                                    </Link>
                                    <Link className='logoutBtn' to="/" onClick={logout}>Wyloguj</Link>
                                </div>

                            )
                        }
                    })()}
                    
               
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}


export default connect(mapStateToProps,mapDispatchToProps)(Header)