import React, { Component } from 'react';

export default class Input extends Component {
  static propTypes = {};

  renderText(data) {
    return (
      <input
        className="input"
        type="text"
        value={data.value || ''}
        onChange={e => {
          if (this.props.onChange) {
            this.props.onChange(e.target.value);
          }
        }}
      />
    );
  }

  renderSelect(data) {
    return (
      <div className="select is-fullwidth">
        <select
          value={data.value || ''}
          onChange={e => {
            if (this.props.onChange) {
              this.props.onChange(e.target.value);
            }
          }}
        >
          <option />
          {data.options.map((item, key) => {
            return <option key={key}>{item}</option>;
          })}
        </select>
      </div>
    );
  }

  renderList(data) {
    return (
      <div>
        <input
          className="input"
          type="text"
          value={data.value || ''}
          onChange={e => {
            if (this.props.onChange) {
              this.props.onChange(e.target.value);
            }
          }}
        />
        <p className="help">Comma-separated list</p>
      </div>
    );
  }

  render() {
    const data = this.props;
    return (
      <div className="template-select-input field">
        <label className="label">{data.name}</label>
        <div className="control">
          {(() => {
            switch (data.type) {
              case 'select':
                return this.renderSelect(data);
              case 'list':
                return this.renderList(data);
              default:
                return this.renderText(data);
            }
          })()}
        </div>
        <p className="help">{data.help}</p>
      </div>
    );
  }
}
