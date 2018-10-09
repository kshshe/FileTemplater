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

  state = {
    selected: null,
    currentValues: {},
  };

  componentDidMount() {
    this.props.socket.emit('get_templates_list');
  }

  render() {
    let selected = {};
    if (this.state.selected !== null) {
      selected = this.props.templateSelect.list[this.state.selected];
    }
    return (
      <div className="template-select-default-page">
        {this.props.templateSelect.loaded && (
          <div>
            {this.state.selected !== null && (
              <div className="card">
                <header className="card-header">
                  <p className="card-header-title">
                    {selected.info.name} ({this.props.templateSelect.currentFile || 'project root'})
                  </p>
                </header>
                <div className="card-content">
                  <div className="content">{selected.info.description}</div>
                  {selected.info.params.map((param, key) => {
                    return (
                      <div className="field" key={key}>
                        <label className="label">{param.name}</label>
                        <div className="control">
                          <input
                            className="input"
                            type="text"
                            value={this.state.currentValues[param.key] || ''}
                            onChange={e => {
                              let newValues = { ...this.state.currentValues };
                              newValues[param.key] = e.target.value;
                              this.setState({
                                currentValues: newValues,
                              });
                            }}
                          />
                        </div>
                        <p className="help">{param.help}</p>
                      </div>
                    );
                  })}
                </div>
                <footer className="card-footer">
                  <a
                    className="card-footer-item"
                    onClick={() => {
                      this.props.socket.emit('make_from_template', {
                        templateName: selected.basename,
                        directionDir: this.props.templateSelect.currentFile,
                        params: this.state.currentValues,
                      });
                      this.props.actions.closeModal();
                    }}
                  >
                    Make
                  </a>
                  <a
                    className="card-footer-item"
                    onClick={() => {
                      this.setState({
                        selected: null,
                        currentValues: {},
                      });
                    }}
                  >
                    Cancel
                  </a>
                </footer>
              </div>
            )}
            {this.state.selected === null && (
              <nav className="panel">
                <p className="panel-heading">
                  Templates ({this.props.templateSelect.currentFile || 'project root'})
                </p>
                {this.props.templateSelect.list.map((item, key) => {
                  return (
                    <a
                      className="panel-block"
                      key={key}
                      onClick={() => {
                        this.setState({
                          selected: key,
                          currentValues: {},
                        });
                      }}
                    >
                      {item.info.name}
                    </a>
                  );
                })}
                <a
                  className="panel-block has-background-grey-lighter"
                  onClick={this.props.actions.closeModal}
                >
                  Cancel
                </a>
              </nav>
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
)(DefaultPage);
