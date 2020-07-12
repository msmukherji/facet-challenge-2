import React, { Component } from "react";
import PropTypes from "prop-types"
import ReactModal from "react-modal";

export default class AddItemModal extends React.Component{
	constructor(props) {
		super(props);

		this.state = {
			isOpen: this.props.isOpen,
			itemName: "",
			itemType: "asset",
			itemBalance: "",
			showValidationMessage: false,
			showSuccess: false,
			showFailure: false
		}

		this.handleCloseModal = this.handleCloseModal.bind(this)
		this.renderTitle = this.renderTitle.bind(this)
		this.renderAddForm = this.renderAddForm.bind(this)
		this.renderValidationMessage = this.renderValidationMessage.bind(this)
		this.renderSubmitOrStatus = this.renderSubmitOrStatus.bind(this)
		this.renderRequestStatus = this.renderRequestStatus.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
		this.handleNameChange = this.handleNameChange.bind(this)
		this.handleBalanceChange = this.handleBalanceChange.bind(this)
		this.handleTypeChange = this.handleTypeChange.bind(this)
		this.validateName = this.validateName.bind(this)
		this.validateBalance = this.validateBalance.bind(this)
		this.validateDecimal = this.validateDecimal.bind(this)
		this.validateFormFilled = this.validateFormFilled.bind(this)
		this.addItem = this.addItem.bind(this)
	}

	componentWillReceiveProps(nextProps) {
		this.setState({isOpen: nextProps.isOpen});
	}

	handleCloseModal() {
		this.setState({isOpen: false, showSuccess: false})
	}

	handleSubmit(e) {
		this.validateFormFilled() ? 
		this.addItem() 
		: this.setState({
			showValidationMessage: true 
		})
		e.preventDefault();
	}

	handleNameChange(e) {
		this.validateName(e.target.value) ? 
		this.setState({
			itemName: e.target.value,
			showValidationMessage: false
		}) : this.setState({ showValidationMessage: true })
	}

	handleBalanceChange(e) {
		// TODO: accept and save decimal values!
		this.validateBalance(e.target.value) ? 
		this.setState({
			itemBalance: e.target.value,
			showValidationMessage: false
		}) : this.setState({ showValidationMessage: true })
	}

	handleTypeChange(e) {
		this.setState({
			itemType: e.target.value
		})
	}

	validateName(input) {
		if (input.length > 100) {
		//TODO: && input is sanitized!
			return false
		}
		return true
		// this would have been nice as a ternary operator but couldn't get it to work
	}

	validateBalance(input) {
		if (isNaN(input) || input < 0 || !this.validateDecimal(input)) {
		//TODO: && input is sanitized and max length == max length of db column
			return false
		}
		return true
		// also ideally would use a ternary operator
	}

	validateDecimal(input) {
		// needs some refining
		const inputString = input.toString()
		const regex = /^[0-9]*(\.[0-9]{0,2})?$/;
		if (!inputString.match(regex)) {
			return false
		}
		return true
	}

	validateFormFilled() {
		if (this.state.itemName.length < 1 
			|| this.state.itemType.length < 1
			|| this.state.itemBalance.length < 1 ) {
			return false
		}
		return true
	}

	addItem() {
		const postData = {
			itemName: this.state.itemName,
			itemType: this.state.itemType,
			itemBalance: this.state.itemBalance
		}
		// should wrap requests in functions that call the appropriate API
		fetch('/api/balanceItems', {
			method: "POST", 
			headers: {
      			'Content-Type': 'application/json'
    		},
    		body: JSON.stringify(postData)
    	})
    	.then(res => {
    		this.setState({
    			showSuccess: true,
    			itemName: "",
    			itemType: "asset",
    			itemBalance: ""
    		})
    	})
        .catch(err => {
        	this.setState({
        		showFailure: true
        	})
        	console.log(err)
        })
	}

	renderTitle() {
		return (
			<div>
				<h1 className="rmodal-title">Add an item to your balance</h1>
			</div>
		)
	}

	renderAddForm() {
		return (
			<div className="rmodal-form">
				<form onSubmit={this.handleSubmit}>
					<div className={`rmodal-form-inputs ${this.state.showSuccess ? "submitted" : ""}`}>
						<div className="rmodal-single-input">
							<label for="item-name">NAME</label>
							<input type="text" id="item-name" name="item-name" value={this.state.itemName} onChange={this.handleNameChange}/><br/>
						</div>
						<div className="rmodal-single-input dropdown-input">
							<label for="item-type">BALANCE TYPE  </label>
							<select id="item-type" name="item-type" onChange={this.handleTypeChange}>
								<option value="asset">Asset</option>
								<option value="liability">Liability</option>
							</select>
						</div>
						<div className="rmodal-single-input">
							<label for="item-balance">AMOUNT</label>
							<input type="text" id="item-balance" name="item-balance" value={this.state.itemBalance} onChange={this.handleBalanceChange}/><br/>
						</div>
					</div>
					<div className="rmodal-button-group">
						{this.renderSubmitOrStatus()}
					    <button className="rmodal-button-group-btn" onClick={this.handleCloseModal}>CLOSE</button>
				    </div>
				</form>
			</div>
		)
	}

	renderSubmitOrStatus() {
		if (this.state.showSuccess || this.state.showFailure) {
			return (
				this.renderRequestStatus()
			)
		} else {
			return (
				<input type="submit" value="ADD THIS ITEM" className="rmodal-button-group-btn"/>
			)
		}
	}

	renderRequestStatus() {
		// TODO: make these messages look nicer, maybe remove the form inputs on completion
		let statusClassName = ""
		let statusMessage = ""
		if (this.state.showSuccess) {
			statusClassName = "success"
			statusMessage = "Item Added!"
		} else if (this.state.showFailure) {
			statusClassName = "failure"
			statusMessage = "Sorry! We couldn't add this item"
		} 
		return (
			<div className={`status-${statusClassName}`}> {statusMessage} </div>
		)
	}

	renderValidationMessage() {
		if (this.state.showValidationMessage) {
			return (
				<div className="validation-message">Please enter a valid name and amount</div>
			)
		} else {
			return ""
		}
	}

	render() {
		return (
			this.state.isOpen ?
			<ReactModal
				contentLabel="Add Item"
				isOpen={true}
				overlayClassName="rmodal-background"
				className="add-item-modal"
			>
				{this.renderTitle()}
				{this.renderValidationMessage()}
				{this.renderAddForm()}
			</ReactModal>
			: ""
		);
	}
}

AddItemModal.propTypes = {
	isOpen: PropTypes.bool,
	onRequestClose: PropTypes.func,
};
