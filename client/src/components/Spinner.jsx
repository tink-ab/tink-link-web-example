import React from 'react';

const Spinner = () => (
  <img
    className="spinner"
    src={this.props.image}
    style={{width: this.props.width}}
    alt={'Loading'}
  />
);

export default Spinner;
