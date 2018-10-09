import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';

export class DefaultPage extends Component {
  static propTypes = {
    filePreview: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  componentDidMount() {
    this.props.socket.emit("get_file", this.props.filePreview.filename)
  }

  componentDidUpdate(prevProps) {
    if (prevProps.filePreview.filename !== this.props.filePreview.filename) {
    this.props.socket.emit("get_file", this.props.filePreview.filename)
    }
  }

  render() {
    return (
      <div className="file-preview-default-page">
        <div className="card">
          <header className="card-header">
            <p className="card-header-title">{this.props.filePreview.filename}</p>
          </header>
          <div className="card-content">
            <div className="content">
              {this.props.filePreview.file && <pre><code>{this.props.filePreview.file}</code></pre>}
            </div>
            <button className="button is-fullwidth" onClick={this.props.actions.closeFile}>Close</button>
            <br />
            <button className="button is-fullwidth is-danger" onClick={() => {

              this.props.socket.emit('delete_file', this.props.filePreview.filename);
              this.props.actions.closeFile();
            }}>Delete</button>
            
          </div>
        </div>
      </div>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    filePreview: state.filePreview,
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
