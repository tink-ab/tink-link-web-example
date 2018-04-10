import React, {Component} from 'react';
import {Route, Switch} from "react-router-dom"
import Callback from "./Callback";
import {Col, Container, Row} from "reactstrap";
import Main from "./Main";

class App extends Component {
    render() {
        return (
            <Container>

                <Row>
                    <Col>
                        <a href="/" style={{textDecoration: "none", color: "inherit"}}>
                            <span className="circle"/><h2 style={{display: "inline", textAlign: "top"}}>Example</h2>
                        </a>
                    </Col>
                </Row>

                <Row className="app">
                    <Col lg={{size: 8, offset: 2}} style={{paddingTop: "70px"}}>

                        <Switch>
                            <Route exact path="/" component={Main}/>
                            <Route exact path="/callback" component={Callback}/>
                        </Switch>

                    </Col>
                </Row>

            </Container>
        );
    }
}

export default App;
