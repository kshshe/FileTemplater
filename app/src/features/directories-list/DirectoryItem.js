import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import * as templateSelectActions from '../template-select/redux/actions';
import styled from 'styled-components';
import NextDirectoryItem from './DirectoryItem';
import FileItem from './FileItem';
import Preloader from '../common/Preloader';
import { FaPlusSquare, FaMinusSquare } from 'react-icons/fa';
import pathBrowser from 'path';

const A = styled.a`
  padding-left: ${props => props.margin}px !important;
`;

const Container = styled.div`
  display: contents;
`;

export class DirectoryItem extends Component {
  static propTypes = {
    directoriesList: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
    path: PropTypes.string,
  };

  state = {
    expanded: false
  };

  getChildren() {
    this.props.socket.emit('get_files_list', this.props.path || '');
  }

  renderPreloader(margin) {
    return (
      <Container>
        <A className="panel-block" margin={margin}>
          <Preloader />
        </A>
      </Container>
    );
  }

  renderList(files, path, margin, filter) {
    return Object.keys(files.children || files).map(key => {
      const file = (files.children || files)[key];
      if (!filter(file)) return null;
      if (file.dir) {
        return (
          <NextDirectoryItem key={key} path={pathBrowser.join(path, file.name)} margin={margin} />
        );
      }
      return <FileItem file={file} margin={margin + 15} key={key} />;
    });
  }

  render() {
    const path = this.props.path || '';
    const margin = (this.props.margin || 0) + 15;
    let files = this.props.directoriesList.root;
    const keys = path
      .split('.')
      .join('')
      .split('/')
      .filter(item => item !== '');
    if (!this.state.expanded) {
      return (
        <A
          className="panel-block"
          margin={margin}
          onClick={() => {
            this.setState({
              expanded: true,
            });
            this.getChildren();
          }}
        >
          <span className="panel-icon">
            <FaPlusSquare />
          </span>
          {keys[keys.length - 1]}/
        </A>
      );
    }
    if (typeof files.children !== 'undefined') files = files.children;
    for (let key in keys) {
      if (keys[key]) {
        if (typeof files[keys[key]] !== 'undefined') {
          files = files[keys[key]].children || {};
        } else {
          return this.renderPreloader(margin);
        }
      }
    }
    return <Container>
        <A className="panel-block" margin={margin} onClick={() => {
            this.setState({ expanded: false });
          }}>
          <span className="panel-icon">
            <FaMinusSquare />
          </span>
          {keys[keys.length - 1]}/
        </A>
        <Container>
          <A className="panel-block has-background-grey-lighter" margin={margin + 40} onClick={() => {
              this.props.actions.openModal(path);
            }}>
            Create new item in {path || 'project root'}
          </A>
        </Container>
        {this.renderList(files, path, margin, item => item.dir)}
        {this.renderList(files, path, margin, item => !item.dir)}
      </Container>;
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    directoriesList: state.directoriesList,
    socket: state.home.socket,
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators({ ...actions, ...templateSelectActions }, dispatch) };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DirectoryItem);
