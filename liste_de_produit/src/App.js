import React, {Component} from 'react';
import ReactDOM from 'react-dom';

function ProductRow({product}){
    const name = product.stocked ? product.name : <span className="text-danger">{product.name}</span>
    return <tr>
        <td>{name}</td>
        <td>{product.price}</td>
    </tr>
}

function ProductCategoryRow({category}){
    return <tr>
        <th colSpan="2">{category}</th>
    </tr>
}

function ProductTable({products, inStockOnly, filterText}){
    const rows = [];
    let lastCategory = null;

    products.forEach(product => {
        if((inStockOnly && !product.stocked) || product.name.indexOf(filterText) === -1) {
            return
        }

        if(product.category !== lastCategory){
            lastCategory = product.category;
            rows.push(<ProductCategoryRow key={lastCategory} category={lastCategory} />);
        }
        rows.push(<ProductRow key={product.name} product={product} />);
        console.log(rows);
    });
    return <table className="table">
        <thead>
            <tr>
                <th>Nom</th>
                <th>Prix</th>
            </tr>
        </thead>
        <tbody>
            {rows}
        </tbody>
    </table>
}

class SearchBar extends React.Component{

    constructor(props){
        super(props);
        this.handleFiterTextChange = this.handleFiterTextChange.bind(this);
        this.handleInStockChange = this.handleInStockChange.bind(this);
    }

    handleFiterTextChange(e){
        this.props.onFilterTextChange(e.target.value);
    }

    handleInStockChange(e){
        this.props.onStockChange(e.target.checked);
    }

    render(){
        const {filterText, inStockOnly} = this.props;
        return <div>
            <div className="form-group">
                <input type="text" value={filterText} className="form-control" placeholder="Rechercher" onChange={this.handleFiterTextChange} />
            </div>
            <div className="form-check">
                <input type="checkbox" checked={inStockOnly} className="form-check-input" id="stock" onChange={this.handleInStockChange} />
                <label htmlFor="stock" className="form-check-label">Produit en stock seulement</label>
            </div>
        </div>
    }
}

//class FilterableProductTable  extends React.Component{
class App  extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            filterText: '',
            inStockOnly: false
        }
        this.handleFiterTextChange = this.handleFiterTextChange.bind(this);
        this.handleInStockChange = this.handleInStockChange.bind(this);
    }


    handleFiterTextChange (filterText){
        this.setState({
            filterText
        })
    }

    handleInStockChange (inStockOnly){
        this.setState({
            inStockOnly
        })
    }

    render(){
        const {products} = this.props;
        //return <div>{JSON.stringify(products)}</div>

        return <div className="container mt-5">
            {/* {JSON.stringify(this.state)} */}
            <div className="row justify-content-center">
                <div className="col-6">
                    <SearchBar 
                        filterText = {this.state.filterText}
                        inStockOnly = {this.state.inStockOnly}
                        onFilterTextChange = {this.handleFiterTextChange}
                        onStockChange = {this.handleInStockChange}
                    />
                    <ProductTable 
                        products={products} 
                        filterText = {this.state.filterText}
                        inStockOnly = {this.state.inStockOnly}
                    />
                </div>
            </div>
        </div>
    }
}


export default App;

