import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import ResponsiveMenu from 'react-responsive-navbar';

import { CredContext } from "../shared/Contexts";

import LoginModalContent from "../modals-contents/LoginModalContent";
import Modal from './Modal';


class Menu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loginModalOpen: false
        }
    }

    // We use credentials for the login/logout buttons
    static contextType = CredContext;

    // Called on either login or signup
    onNewAuthToken(newToken) {
        this.setState({
            loginModalOpen: false
        });

        // Propogate up, to set in context
        this.props.setAuthToken(newToken);   
    }

    render() {
        // Either login/signup buttons, or a logout message
        const authField = this.context ? (
            <Link className="Menu-item" to="#" onClick={() => { this.onNewAuthToken(false); }}>Sign out</Link>
        ) : (
            <span>
                <Link className="Menu-item" to="#" onClick={_ => this.setState({loginModalOpen: true})}>
                    Login
                </Link>
                <Link className="Menu-item" to="#">Signup</Link>
            </span>
        );

        return (
            <span>
                {/* First render modals, then menu */}
                <Modal isOpen={this.state.loginModalOpen} onClose={_ => this.setState({loginModalOpen: false})}>
                    <LoginModalContent onLogin={this.onNewAuthToken.bind(this)}/>
                </Modal>
                <ResponsiveMenu
                    menuOpenButton={<div >O</div>}
                    menuCloseButton={<div >X</div>}
                    changeMenuOn="500px"
                    largeMenuClassName="large-menu-classname"
                    smallMenuClassName="small-menu-classname"
                    menu={
                        <div className="Menu-container">
                            { authField }
                            <Link to="#" className="Menu-item">Some</Link>
                            <Link to="#" className="Menu-item">more</Link>
                            <Link to="#" className="Menu-item">links</Link>
                        </div>
                    }
                />
            </span>
        );
    }
}


Menu.propTypes = {
    // Gets passed the new auth token to be used
    setAuthToken: PropTypes.func.isRequired
}


export default Menu;