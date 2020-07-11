import React, { Component } from 'react';
import PropTypes from "prop-types";
import DeleteBalanceItemButton from './DeleteBalanceItemButton'
import * as utils from './utils'

export default class MainTable extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showErrorMessage: false,
            showRefreshMessage: false,
        }

        this.getClassForType = this.getClassForType.bind(this)
        this.markDeleted = this.markDeleted.bind(this)
        this.showDeleteError = this.showDeleteError.bind(this)
    }

    getClassForType(t) {
        return `table-row ${t === "asset" ? "asset-marker" : "liability-marker"}`
    }

    markDeleted() {
        console.log("mark for deletion")
        this.setState({showRefreshMessage: true})
        // ideally, this would alter the table row to further indicate the item was deleted
    }

    showDeleteError() {
        console.log("show error message")
        this.setState({showErrorMessage: true})
    }

    renderTableBody() {
        return (
           this.props.balanceItems.map((bi) => 
                    <tr>
                        <td className="table-row"> {bi.name} </td>
                        <td className={this.getClassForType(bi.item_balance_type)}> {bi.item_balance_type === "asset" ? "+" : "-"} </td>
                        <td className="table-row"><span className="item-amount">{utils.formatMoney(bi.amount)}</span>
                        <DeleteBalanceItemButton
                            itemID={bi.id}
                            forceUpdate={this.props.onUpdate}
                            markDeleted={this.markDeleted}
                            showErrorMessage={this.showDeleteError}
                        /></td>
                    </tr>
            )
        )
    }

    renderDeleteError() {
        return this.state.showErrorMessage ? 
            <div className="status-failure"> Sorry, we were unable to delete your item. </div>
            : ""
    }

    renderRefreshMessage() {
        return "" // TODO: show a status somewhere on the page to suggest refresh
        // return this.state.showRefreshMessage ?
        //     <div className="refresh-message"> Please refresh the page to see your changes. </div>
        //     : ""
    }

    render() {
        return (
            <div>
                {this.renderDeleteError()}
                {this.renderRefreshMessage()}
                <table className="table-main">
                    <tbody>
                    <tr> 
                        <th className="table-header">Name</th>
                        <th className="table-header">Type</th>
                        <th className="table-header">Balance</th>
                    </tr>
                    {this.renderTableBody()}
                    </tbody>
                </table>
            </div>
        );
    }
}

MainTable.propTypes = {
    balanceItems: PropTypes.any,
    onUpdate: PropTypes.func,
}