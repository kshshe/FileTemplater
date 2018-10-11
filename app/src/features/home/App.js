import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import { bindActionCreators } from 'redux';
import Preloader from '../common/Preloader';
import Header from '../common/Header';

/*
  This is the root component of your app. Here you define the overall layout
  and the container of the react router.
  You should adjust it according to the requirement of your app.
*/
class App extends Component {
  static propTypes = {
    children: PropTypes.node,
  };

  static defaultProps = {
    children: '',
  };

  componentDidMount() {
    this.props.actions.connectToSocket();
  }

  render() {
    return <div className="home-app">
        {!this.props.socket && <Preloader />}
        {this.props.socket && <Header />}
        {this.props.socket && <div className="page-container">{this.props.children}</div>}
      </div>;
  }
}


/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    socket: state.home.socket
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions }, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
