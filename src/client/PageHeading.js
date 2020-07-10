import React, { Component } from 'react';

export default class PageHeading extends Component {
    constructor(props) {
    super(props);
  }
    state = {}

    render() {
    	return (
    		<div className="page-heading">
    		    { this.props.username ? <h1> { `${this.props.username.toUpperCase()}'S BALANCE SHEET` } </h1> : <h1>Loading.. please wait!</h1> }
    		</div>
    	)
    }
}

//`${this.props.username.charAt(0).toUpperCase() + this.props.username.slice(1)}'s Balance Sheet` }