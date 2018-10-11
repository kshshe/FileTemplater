import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

export default class Header extends Component {
  static propTypes = {};
  state = {
    menuIsOpened: false,
  };

  constructor(props) {
    super(props);
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  handleClickOutside(event) {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.setState({
        menuIsOpened: false,
      });
    }
  }

  render() {
    let menu = [
      {
        path: '/',
        name: 'Files',
      },
      {
        path: '/templates',
        name: 'Templates',
      },
    ];
    return (
      <div className="common-menu">
        <nav className="navbar is-light is-fixed-top">
          <div className="navbar-brand">
            <a
              className="dropdown-item"
              rel="noopener noreferrer"
              target="_blank"
              href="https://npmjs.org/package/filetemplater"
            >
              <h1 className="title">FileTemplater</h1>
            </a>
            <div
              ref={ref => (this.wrapperRef = ref)}
              className={classNames({
                'dropdown is-right navbar-burger': true,
                'is-active': this.state.menuIsOpened,
              })}
              onClick={() => {
                this.setState({
                  menuIsOpened: !this.state.menuIsOpened,
                });
              }}
            >
              <div className="dropdown-trigger">
                <a
                  role="button"
                  aria-label="menu"
                  aria-expanded="false"
                  aria-haspopup="true"
                  aria-controls="mobile-menu"
                >
                  <span aria-hidden="true" />
                  <span aria-hidden="true" />
                  <span aria-hidden="true" />
                </a>
              </div>
              <div className="dropdown-menu" id="mobile-menu" role="menu">
                <div className="dropdown-content">
                  {menu.map((item, key) => {
                    return (
                      <Link className="dropdown-item" to={item.path} key={key}>
                        {item.name}
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          <div className="navbar-menu">
            <div className="navbar-start">
              {menu.map((item, key) => {
                return (
                  <Link
                    className={classNames('navbar-item', {
                      'is-active': item.path === this.props.pathname,
                    })}
                    to={item.path}
                    key={key}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </div>
        </nav>
      </div>
    );
  }
}
