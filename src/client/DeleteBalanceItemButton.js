import React, { Component } from 'react';
import PropTypes from "prop-types";

export default class DeleteBalanceItemButton extends Component {
	constructor(props) {
		super(props);

		this.state = {
			show: true
		}

		this.deleteBalanceItem = this.deleteBalanceItem.bind(this)
		this.hide = this.hide.bind(this)
	}

	deleteBalanceItem(e) {
	    e.preventDefault()
		fetch(`/api/balanceItem/${this.props.itemID}`, {
			method: "DELETE"
		})
		.then(f => {
			// to show some indication to the user
			this.props.markDeleted()
			this.hide()
			// implemented properly, this would overtake the need for markDeleted()/hide() above
			this.props.forceUpdate() 
		})
		.catch(err => {
			this.props.showErrorMessage()
			console.log(err)
		})
	}

	hide() {
		this.setState({show: false})
	}
    
    render() {
        return this.state.show ?
            <button 
                className="delete-button fa fa-trash"
                alt="Delete Balance Item"
                onClick={this.deleteBalanceItem}>
            </button>
        : <div
        		className="deleted-indicator fa fa-ban"
        		alt="Item Deleted"></div>
    }
}

DeleteBalanceItemButton.propTypes = {
	itemID: PropTypes.number,
	forceUpdate: PropTypes.func,
	markDeleted: PropTypes.func,
	showErrorMessage: PropTypes.func,
}

