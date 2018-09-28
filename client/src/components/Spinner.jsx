import React, { Component } from 'react';

export default class Spinner extends Component {
    render() {
        return (
            <img className="spinner" src={this.props.image} style={{ width: this.props.width }} alt={"Loading"}/>
        );
    }
}
