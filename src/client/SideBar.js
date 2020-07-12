import React, { Component } from 'react';
import PropTypes from "prop-types";
import AddItemModal from "./AddItemModal";
import * as utils from "./utils"

export default class SideBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalIsOpen: false
        }

        this.addItemHandler = this.addItemHandler.bind(this)

    }

    addItemHandler() {
        this.setState({modalIsOpen: true})
    }

    render() {
    	return (
    		<div className="side-bar">
                <div className="side-bar-heading">
                    Snapshot
                </div>
                <div className="side-bar-content side-bar-a-total">
                    ASSETS <div className="side-bar-amount">${utils.formatMoney(this.props.assetTotal) || "0.00"}</div>
                </div>
                <div className="side-bar-content side-bar-l-total">
                    LIABILITIES <div className="side-bar-amount">{`(${utils.formatMoney(this.props.liabilityTotal))`} || "0.00"}</div>
                </div>
                <div className="side-bar-content side-bar-net">
                    BALANCE <div className="side-bar-amount">${utils.formatMoney(this.props.total) || "0.00"}</div>
                </div>
                <button onClick={this.addItemHandler}> ADD AN ITEM </button>
                <AddItemModal isOpen={this.state.modalIsOpen}/>
            </div>
    	)
    }
}

SideBar.propTypes = {
    total: PropTypes.any,
    assetTotal: PropTypes.any,
    liabilityTotal: PropTypes.any,
}