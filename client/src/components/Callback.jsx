import React, {Component} from 'react';
import {Button, Col, Row} from "reactstrap";
import Header from "./Header";
import {formatDate, formatNumber} from "../utils/Format";
import Spinner from "./Spinner";

class Main extends Component {

    state = {
        code: "",
        token: "",
        data: undefined
    };

    componentDidMount() {
        const code = new URLSearchParams(this.props.location.search).get("code");
        const error = new URLSearchParams(this.props.location.search).get("error");
        const message = new URLSearchParams(this.props.location.search).get("message");

        this.setState({code: code, error: error, errorMessage: message});

        if (code) {
            this.getData(code)
                .then(res => this.setState({data: res}))
                .catch(err => console.log(err));
        }
    }

    getData = async (code) => {
        const response = await fetch("/code", {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({code: code})
        });

        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        return body;
    };

    getAccountsListFromApiResponse(currency) {
        const data = this.state.data;
        if (!data || !data.response || !data.response.accountData || !data.response.accountData.accounts) {
            return undefined
        } else {
            const accounts = data.response.accountData.accounts.map(account => {
                return (
                    <p key={account.id}><b>{account.name}</b><br/>
                        {formatNumber(account.balance)} {currency}
                    </p>
                );
            });

            return (
                <div>
                    <h4 className="pink">Account data</h4>
                    <div style={{margin: "30px"}}>
                        {accounts}
                    </div>
                </div>
            )
        }
    }

    getInvestmentDataFromApiResponse() {
        const data = this.state.data;
        if (!data || !data.response || !data.response.investmentData || !data.response.investmentData.portfolios) {
            return undefined
        } else if (data.response.investmentData.portfolios.length === 0) {
            return (
                <div>
                    <h4 className="pink">Investment data</h4>
                    <div style={{margin: "30px"}}>
                        <p>You don't seem to have any investments.</p>
                    </div>
                </div>
            )
        } else {
            const portfolios = data.response.investmentData.portfolios.map(portfolio => {
                const instruments = portfolio.instruments.map(instrument => {
                    return (
                        <p key={instrument.id}><b>{instrument.name}</b><br/>
                            Price: {formatNumber(instrument.price)} {instrument.currency}<br/>
                            Quantity: {instrument.quantity}<br/>
                            Profit: {formatNumber(instrument.profit)} {instrument.currency}
                        </p>
                    );
                });

                return (
                    <div key={portfolio.id}>
                        <h5>Portfolio ({portfolio.type})</h5>
                        {instruments}
                    </div>
                );
            });

            return (
                <div>
                    <h4 className="pink">Investment data</h4>
                    <div style={{margin: "30px"}}>
                        {portfolios}
                    </div>
                </div>
            )
        }
    }

    getTransactionDataFromApiResponse(currency) {
        const data = this.state.data;
        if (!data || !data.response || !data.response.transactionData || !data.response.categoryData) {
            return undefined
        } else if (data.response.transactionData.count === 0) {
            return (
                <div>
                    <h4 className="pink">Some of your transactions</h4>
                    <div style={{margin: "30px"}}>
                        <p>You don't seem to have any transactions.</p>
                    </div>
                </div>
            );
        } else {
            const transactions = data.response.transactionData.results.map(result => {
                const transaction = result.transaction;
                const category = data.response.categoryData.find(category => category.id === transaction.categoryId);
                return (
                    <p key={transaction.id}>
                        <b>{formatDate(new Date(transaction.date))}</b><br/>
                        {transaction.description}<br/>
                        {formatNumber(transaction.amount)} {currency}<br/>
                        {category.primaryName}
                    </p>
                );
            });

            return (
                <div>
                    <h4 className="pink">Some of your transactions</h4>
                    <div style={{margin: "30px"}}>
                        {transactions}
                    </div>
                </div>
            )
        }
    }

    getContent() {
        const currency = this.state.data ? this.state.data.response.userData.profile.currency : "";
        const accountsList = this.getAccountsListFromApiResponse(currency);
        const investmentList = this.getInvestmentDataFromApiResponse();
        const transactionList = this.getTransactionDataFromApiResponse(currency);

        if (accountsList && investmentList && transactionList) {
            return (
                <Row>
                    <Col lg={{size: 6, offset: 3}}>
                        {accountsList}
                        {investmentList}
                        {transactionList}
                    </Col>
                </Row>
            )
        } else if (this.state.error) {
            return "";
        } else {
            return <Spinner width='50px' image={"./spinner.png"}/>;
        }

    }

    render() {

        let header = "";

        if (!this.state.error) {
            header = <Header text="Your bank was successfully connected!" emoji="tada"/>;
        } else {
            header = <Header text="Something went wrong" emoji="sad"/>;
        }
        const content = this.getContent();

        return (
            <div>
                {header}

                {content}

                <p style={{fontSize: "18px", paddingTop: "40px"}}>{this.state.errorMessage}</p>
                <Button style={{margin: "30px"}} href="/">Take me back</Button>

            </div>

        );
    }
}

export default Main;
