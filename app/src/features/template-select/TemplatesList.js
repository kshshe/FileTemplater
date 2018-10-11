import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import Preloader from '../common/Preloader';

export class TemplatesList extends Component {
  static propTypes = {
    templateSelect: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  state = {
    importing: false,
    selected: false,
  };

  componentDidMount() {
    this.props.socket.emit('get_templates_list');
  }

  render() {
    return (
      <div className="template-select-templates-list">
        {this.props.templateSelect.loaded && (
          <div className="columns">
            <div className="column is-one-third">
              <aside className="menu">
                <p className="menu-label">Your templates</p>
                <ul className="menu-list">
                  {this.props.templateSelect.list.map((item, key) => {
                    return (
                      <li
                        key={key}
                        onClick={() => {
                          this.setState({
                            selected: item,
                          });
                        }}
                      >
                        <a>{item.info.name}</a>
                      </li>
                    );
                  })}
                </ul>
                <p className="menu-label">Actions</p>
                <ul className="menu-list">
                  <li
                    onClick={() => {
                      if (!this.state.importing) this.props.socket.emit('export_all');
                    }}
                  >
                    <a>Export all</a>
                  </li>
                  <li
                    onClick={() => {
                      this.props.socket.emit('open_import_directory');
                      this.setState({
                        importing: true,
                      });
                    }}
                  >
                    <a>Import</a>
                  </li>
                  {this.state.importing && (
                    <li>
                      <a>Put your zip file on opened directory</a>
                    </li>
                  )}
                </ul>
              </aside>
            </div>
            {this.state.selected && (
              <div className="column">
                <div className="card">
                  <header className="card-header">
                    <p className="card-header-title">{this.state.selected.info.name}</p>
                  </header>
                  <div className="card-content">
                    <div className="content">{this.state.selected.info.description}</div>
                    <div className="content">
                      <h4>Properties:</h4>
                      {this.state.selected.info.params.map((param, key) => {
                        return (
                          <p key={key}>
                            Name: {param.name}
                            <br />
                            Type: {param.type}
                            <br />
                            Help: {param.help}
                            <br />
                            {param.type === 'select' && (
                              <span>
                                Options: {param.option.join(', ')}
                                <br />
                              </span>
                            )}
                          </p>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            )}
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
)(TemplatesList);
