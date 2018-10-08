import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import Preloader from '../common/Preloader';

export class DefaultPage extends Component {
  static propTypes = {
    templateSelect: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  componentDidMount() {
    this.props.socket.emit('get_templates_list');
  }

  render() {
    return (
      <div className="template-select-default-page">
        {this.props.templateSelect.loaded && (
          <div>
            {this.props.templateSelect.list.map((item, key) => {
              return <div key={key}>{item}</div>;
            })}
          </div>
        )}
        {!this.props.templateSelect.loaded && <Preloader />}
      </div>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    templateSelect: state.templateSelect,
    socket: state.home.socket,
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions }, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DefaultPage);
