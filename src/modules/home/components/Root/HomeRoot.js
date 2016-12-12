import React, { Component } from 'react';

export default class HomeRoot extends Component {
  state = { count: 0 };

  incrementCount = () => this.setState({ count: this.state.count + 1 });

  render = () => (
    <div>
      <span>{this.state.count}</span>
      <button onClick={this.incrementCount}>Incrementss</button>
    </div>
  );
}
