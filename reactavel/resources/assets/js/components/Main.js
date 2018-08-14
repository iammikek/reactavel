import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import Product from './Product';
import AddProduct from './AddProduct';


class Main extends Component {

    constructor() {
        super();
        this.state = {
            products: [],
            currentProduct: null
        }

        this.handleAddProduct = this.handleAddProduct.bind(this);
    }


    componentDidMount() {

        fetch('/api/products')
            .then(response => {
                return response.json();
            })
            .then(products => {
                this.setState({products})
            });
    }

    renderProducts() {

        return this.state.products.map(product => {
            return (
                <li
                    onClick={() => this.handleClick(product)}

                    key={product.id}>
                    {product.title}
                </li>
            )
        })


    }

    handleClick(product) {
        this.setState({currentProduct: product});
    }

    handleAddProduct(product) {

        product.price = Number(product.price);

        fetch('api/products/', {

            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(product)


        })
            .then(response => {
                return response.json();
            })

            .then(
                data => {
                    this.setState((prevState) => ({
                            products: prevState.products.concat(data),
                            currentProduct: data
                        })
                    )
                }
            )

    }


    render() {


        return (
            <div>
                <h3>All Products</h3>

                <AddProduct onAdd={this.handleAddProduct}/>

                <ul className="menu">
                    {this.renderProducts()}
                </ul>

                <Product product={this.state.currentProduct}/>

            </div>
        )

    }

}

export default Main;

if (document.getElementById('root')) {
    ReactDOM.render(<Main/>, document.getElementById('root'));
}