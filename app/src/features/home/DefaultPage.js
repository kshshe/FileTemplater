import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import DirectoriesList from '../directories-list/DefaultPage';
import TemplateSelect from '../template-select/DefaultPage';
import FilePreview from '../file-preview/DefaultPage';

export class DefaultPage extends Component {
  static propTypes = {
    home: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  render() {
    return (
      <div className="home-default-page">
        <section className="section">
          <div className="container is-fluid">
            <div className="columns">
              <div className="column is-one-third">
                <DirectoriesList />
              </div>
              {this.props.templateSelect.opened && (
                <div className="column">
                  <TemplateSelect />
                </div>
              )}
              {this.props.filePreview.opened && (
                <div className="column"><FilePreview /></div>
              )}
            </div>
          </div>
        </section>
      </div>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return { home: state.home, templateSelect: state.templateSelect, filePreview: state.filePreview };
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
