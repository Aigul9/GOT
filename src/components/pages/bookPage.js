import React, { Component } from 'react';
import ItemList from '../itemList';
// import ItemDetails, {Field} from '../itemDetails';
import ErrorMessage from '../errorMessage';
import gotService from '../../services/gotService';
// import RowBlock from '../rowBlock';
import {withRouter} from 'react-router-dom';

class BookPage extends Component {
    gotService = new gotService();
    state = {
        selectedBook: 2,
        error: false
    }

    componentDidCatch() {
        this.setState({
            error: true
        });
    }

    // onItemSelected = (id) => {
    //     this.setState({
    //         selectedBook: id
    //     })
    // }

    render() {
        if (this.state.error) {
            return <ErrorMessage/>
        }

        // const itemList = (
            
        // );

        // const itemDetails = (
        //     <ItemDetails itemId={this.state.selectedBook} getData={this.gotService.getBook}>
        //         <Field field="numberOfPages" label="Number of pages"/>
        //         <Field field="publisher" label="Publisher"/>
        //         <Field field="released" label="Released"/>
        //     </ItemDetails>
        // );

        return (
            // <RowBlock left={itemList} right={itemDetails}/>
            <ItemList
                // onItemSelected={this.onItemSelected}
                onItemSelected={(itemId) => {
                    this.props.history.push(itemId)
                }}
                getData={this.gotService.getAllBooks}
                renderItem={(item) => `${item.name}`}/>
        )
    }
}

export default withRouter(BookPage);