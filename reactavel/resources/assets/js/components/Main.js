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
        /*Fetch API for post request */
        fetch( 'api/products/', {
            method:'post',
            /* headers are important*/
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },

            body: JSON.stringify(product)
        })
            .then(response => {
                return response.json();
            })
            .then( data => {
                //update the state of products and currentProduct
                this.setState((prevState)=> ({
                    products: prevState.products.concat(data),
                    currentProduct : data
                }))
            })

    }


    render() {


        return (
            <div>
                <div className="main">
                    <div className="menu">
                        <h3> All products </h3>
                        <ul>
                            { this.renderProducts() }
                        </ul>

                    </div>
                    <Product product={this.state.currentProduct} />
                    <AddProduct onAdd={this.handleAddProduct} />
                </div>

            </div>

        );
    }

}

export default Main;

if (document.getElementById('root')) {
    ReactDOM.render(<Main/>, document.getElementById('root'));
}