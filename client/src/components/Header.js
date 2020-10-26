import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Payments from './Payments';

class Header extends Component {
    /**
     * helper method to inspect the auth state and render the respective elements into the Header
     */
    renderContent() {
        switch (this.props.auth) {
            case null:      /** case waiting for login state inspection from server */
                return;
            case false:     /** case user is logged-out */
                return (
                    <li>
                        <a href="/auth/google">Login with Google</a>
                    </li>
                );
            default: /** case user is logged-in */
                /** Return an array of <li>'s */
                return [
                    <li key="1"><Payments /></li>,
                    <li key="3" style={{ margin: '0 10px' }}>
                        Credits: {this.props.auth.credits}
                    </li>,
                    <li key="2">
                        <a href="/api/logout">Logout</a>
                    </li>
                ];
        }
    }

    render() {
        console.log(this.props.auth);
        return (
            <nav>
                <div className="nav-wrapper">
                    <Link 
                        to={this.props.auth ? '/surveys' : '/'}
                        className="left brand-logo"
                    >
                        Emaily
                    </Link>

                    <ul className="right">
                        {this.renderContent()}
                    </ul>

                </div>
            </nav>
        );
    }
}

const mapStateToProps = ({ auth }) => ({
    auth
});

export default connect(mapStateToProps)(Header);