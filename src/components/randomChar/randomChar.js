import React, {Component} from 'react';
import './randomChar.css';
import gotService from '../../services/gotService';
import Spinner from '../spinner';
import ErrorMessage from '../errorMessage';

export default class RandomChar extends Component {

    // can be deleted
    // constructor() {
    //     super();
    //     console.log('constructor');
    // }

    // componentDidMount
    // componentDidUpdate
    // componentDidCatch
    // componentWillUnmount

    gotService = new gotService();
    state = {
        char: {},
        loading: true,
        error: false
    };

    componentDidMount() {
        console.log('mounting');
        this.updateChar();
        this.timerId = setInterval(this.updateChar, 15000000);
        // initialize component and requests for api instead of constructor
        // because DOM is not defined in constructor
    }

    componentWillUnmount() {
        console.log('unmounting');
        // DOM is still defined here
        clearInterval(this.timerId);
    }

    updateChar = () => {
        // console.log("update");
        const id = Math.floor(Math.random()*140 + 25);
        // generate random id within the interval
        this.gotService.getCharacter(id)
            .then(this.onCharLoaded)
            .catch(this.onError);
    }

    onCharLoaded = (char) => {
        this.setState({char, loading: false});
    }
    
    onError = (err) => {
        this.setState({
            error: true,
            loading: false
        })
    } 

    render() {
        // console.log('render');
        const { char, loading, error } = this.state;

        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error) ? <View char={char}/> : null;

        return (
            <div className="random-block rounded">
                {errorMessage}
                {spinner}
                {content}
            </div>
        );
    }
}

const View = ({char}) => {
    const {name, gender, born, died, culture} = char;

    return (
        <>
            <h4>Random Character: {name}</h4>
            <ul className="list-group list-group-flush">
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Gender </span>
                    <span>{gender}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Born </span>
                    <span>{born}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Died </span>
                    <span>{died}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Culture </span>
                    <span>{culture}</span>
                </li>
            </ul>
        </>
    )
}