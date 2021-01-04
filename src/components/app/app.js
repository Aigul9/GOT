import React, { Component } from 'react';
import {Col, Row, Container} from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import {CharacterPage, BookPage, HousePage, BookItem} from '../pages';
import ErrorMessage from '../errorMessage';
import './app.css';

import {BrowserRouter as Router, Route} from 'react-router-dom';

export default class App extends Component {

    state = {
        showRandomChar: true,
        error: false
    }

    componentDidCatch() {
        // console.log('error');
        this.setState({
            error: true
        });
    }

    onToggleChar = () => {
        this.setState((state) => {
            return {
                showRandomChar: !state.showRandomChar
            }
        });
    }

    render() {

        const content = this.state.showRandomChar ? <RandomChar/> : null;

        if (this.state.error) {
            return <ErrorMessage/>
        }

        return (
            <Router>
                <div className="app"> 
                    <Container>
                        <Header />
                    </Container>
                    <Container>
                        <Row>
                            <Col lg={{size: 5, offset: 0}}>
                                <button className="toggle-btn" onClick={this.onToggleChar}>Toggle random character</button>
                                {content}
                            </Col>
                        </Row>
                        <Route path='/characters' component={CharacterPage}/>
                        <Route path='/houses' component={HousePage}/>
                        <Route path='/books' exact component={BookPage}/>
                        <Route path='/books/:id' render={
                            ({match, location, history}) => {
                                console.log(match, location, history);
                                const {id} = match.params;
                                return <BookItem bookId={id}/>
                            }
                        }/>
                    </Container>
                </div>
            </Router>
        );
    }
}