import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import styled from 'styled-components';
import { FaFile } from 'react-icons/fa';
import classNames from 'classnames';

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

  state = {
    expanded: false,
  };

  render() {
    const { file, margin } = this.props;

    return (
      <Container>
        <A
          className={classNames('panel-block', {
            'is-active': this.state.expanded,
          })}
          margin={margin + 15}
          onClick={() => {
            this.setState({
              expanded: !this.state.expanded,
            });
          }}
        >
          <span className="panel-icon">
            <FaFile />
          </span>
          {file.name}
        </A>
        {this.state.expanded && (
          <Container>
            <A className="panel-block has-background-grey-lighter" margin={margin + 40}>
              Delete {file.name}
            </A>
          </Container>
        )}
      </Container>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    directoriesList: state.directoriesList,
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
)(FileItem);
