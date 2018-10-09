import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import * as filePreviewActions from '../file-preview/redux/actions';
import styled from 'styled-components';
import { FaFile } from 'react-icons/fa';

const A = styled.a`
  padding-left: ${props => props.margin}px !important;
`;

const Container = styled.div`
  display: contents;
`;

export class FileItem extends Component {
  static propTypes = {
    directoriesList: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  render() {    
    const { file, margin } = this.props;

    return (
      <Container>
        <A
          className='panel-block'
          margin={margin + 15}
          onClick={() => {
            this.props.actions.setFile(file.absolute)
          }}
        >
          <span className="panel-icon">
            <FaFile />
          </span>
          {file.name}
        </A>
      </Container>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return { directoriesList: state.directoriesList, socket: state.home.socket };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions, setFile: filePreviewActions.setFile }, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FileItem);
