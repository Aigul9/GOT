import React, {Component} from 'react';
import './itemList.css';
import Spinner from '../spinner';
// import PropTypes from 'prop-types';
// import gotService from '../../services/gotService';

class ItemList extends Component {

    renderItems(arr) {
        return arr.map((item) => {
            const {id} = item;
            // console.log(item, id);
            const label = this.props.renderItem(item);
            return (
                <li
                    key={id}
                    className="list-group-item"
                    onClick={() => this.props.onItemSelected(id)}>
                    {label}
                </li>
            )
        });
    }

    render() {
        const {data} = this.props;
        const items = this.renderItems(data);

        return (
            <ul className="item-list list-group">
                {items}
            </ul>
        );
    }
}

// data.defaultProps = {
//     onItemSelected: () => {}
// }

// data.propTypes = {
//     onItemSelected: PropTypes.func,
//     // getData: PropTypes.arrayOf(PropTypes.object) // array of objects
// }

// const f = (a) => {
//     console.log(a);
//     return (b) => {
//         console.log(a + b);
//     }
// }

// f(1)(2);

// functional wrapper
const withData = (View) => {
    // return data;
    return class extends Component {
        state = {
            data: null
        };
    
        componentDidMount() {
            this.props.getData()
                .then((data) => {
                    this.setState({
                        data,
                    });
                })
        }

        render() {
            const {data} = this.state;

            if (!data) {
                return <Spinner/>
            }
            console.log("log", this.props);
            return <View {...this.props} data={data}/>
        }
    }
}

// const {getAllCharacters} = new gotService();
export default withData(ItemList); // HOC