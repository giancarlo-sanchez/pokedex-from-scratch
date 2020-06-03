import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import { connect } from 'react-redux';
import { logout } from './store/authentication';

// class LogoutButton extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       loggedOut: false
//     };
//   }

  const LogoutButton = props =>
  props.loggedOut ?
    <Redirect to="/login" /> :
    <div id="logout-button-holder">
      <button onClick={props.logout}>Logout</button>
    </div>
;


const mapStateToProps = state => {
  return {
    loggedOut: !state.authentication.token,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(logout()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(
  LogoutButton
);
