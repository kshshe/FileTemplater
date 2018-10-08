import React, { Component } from 'react';

export default class Preloader extends Component {
  static propTypes = {};

  state = {
    seconds: 0,
  };

  componentDidMount() {
    this.t = setInterval(() => {
      this.setState({
        seconds: this.state.seconds > 10 ? 0 : this.state.seconds + 1,
      });
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.t);
  }

  render() {
    return (
      <div className="common-preloader">
        Loading
        {'.'.repeat(this.state.seconds)}
      </div>
    );
  }
}
