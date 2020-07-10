import React, { Component } from 'react';
import './app.css';
import PageHeading from './PageHeading'
import MainTable from './MainTable';
import SideBar from './SideBar';
import AddItemModal from "./AddItemModal";

export default class App extends Component {
    state = {
        username: null,
        balanceItems: [],
        net: null,
        assetTotal: null,
        liabilityTotal: null
    };

    componentDidMount() {
        fetch('/api/getUsername')
            .then(res => res.json())
            .then(user => this.setState({ username: user.username }));

        fetch('/api/net')
            .then(res => res.json())
            .then(net => this.setState({ net: net }));
        
        fetch('/api/balanceItems')
            .then(res => res.json())
            .then(balanceItems => this.setState({ balanceItems: balanceItems }))

        fetch('/api/assetTotal')
            .then(res => res.json())
            .then(assetTotal => this.setState({ assetTotal: assetTotal }))

        fetch('/api/liabilityTotal')
            .then(res => res.json())
            .then(liabilityTotal => this.setState({ liabilityTotal: liabilityTotal}))
    }

    forceUpdate() {
        console.log("this would refresh the balance items and totals upon completion of a relevant add/delete request")
        // fetch('/api/net')
        //     .then(res => res.json())
        //     .then(net => this.setState({ net: net }));
        
        // fetch('/api/balanceItems')
        //     .then(res => res.json())
        //     .then(balanceItems => this.setState({ balanceItems: balanceItems }))

        // fetch('/api/assetTotal')
        //     .then(res => res.json())
        //     .then(assetTotal => this.setState({ assetTotal: assetTotal }))

        // fetch('/api/liabilityTotal')
        //     .then(res => res.json())
        //     .then(liabilityTotal => this.setState({ liabilityTotal: liabilityTotal}))
    }

    render() {
        const { username } = this.state;

        return ( 
            <div>
                <PageHeading username={this.state.username}/>
                <div className="main-container">
                    <div className="sidebar-container">
                        <SideBar
                            total={this.state.net}
                            assetTotal={this.state.assetTotal}
                            liabilityTotal={this.state.liabilityTotal}
                            openModal={this.openModal}/>
                    </div>
                    <div className="maintable-container">
                        <MainTable balanceItems={this.state.balanceItems} onUpdate={this.forceUpdate}/>
                    </div>
                </div>
            </div>
        );
    }
}