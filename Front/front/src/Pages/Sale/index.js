import React, { Component } from "react";
import { apiURL } from "../../Services/env";
import Header from "../../Components/Header";
import { redirect }  from 'react-router-dom';

export default class Sale extends Component {

    constructor(props) {
        super(props);

        this.state = {
            totalTax: 0,
            totalSale: 0,
            products: [],
            productsSale: [],
            many: 0,
            productSelected: 0,
            ready: false,
            redirect: false
        }

        this.addItem = this.addItem.bind(this);
        this.reset = this.reset.bind(this);
        this.store = this.store.bind(this);
        this.moneyFormat = this.moneyFormat.bind(this);
    }

    componentDidMount() {
        let token = localStorage.getItem('token');        
        if(token === null || token === undefined){            
            window.location.href = "/";
        }
        
        this.getData();
        this.setState({redirect:false});        
    }


    async getData() {

        const requestOptions = {
            method: 'GET'
        }
     
        const response = await fetch(apiURL + 'sale/init', requestOptions);
        const products = await response.json();
        this.setState({ products: products});
        
        console.log(this.state.products);

        const select = document.getElementById("selectProduct");
   
        let option = null;
        let contador = 1;
     
        option = new Option('Selecione o produto', 0);
        select.options[0] = option;
        this.state.products.forEach(temp => {
            option = new Option(temp['name'], temp['id']);
            select.options[contador] = option;
            contador++;
        });

    }

    addItem(){
        if(this.state.many > 0 && this.state.productSelected > 0){

            let product = this.state.products.filter((item)=>{                
                if(item.id == this.state.productSelected){
                    return item;
                }
                return null;
            });

            if(product !== null){
                let taxSum = (product[0]['price'] * product[0]['tax'] / 100) * this.state.many;
                let totalItem = product[0]['price'] * this.state.many;

                this.setState({
                    totalTax: this.state.totalTax + taxSum,
                    totalSale: this.state.totalSale + totalItem
                })

                let prodSale = {
                    id : product[0]['id'],
                    name : product[0]['name'],
                    price : product[0]['price'],
                    many : this.state.many,
                    valueTax : taxSum, 
                    valueTotal : totalItem
                };            

                this.state.productsSale.push(prodSale);

                this.setState({
                    many: 0,
                    productSelected: 0
                });

                document.getElementById("selectProduct").value = 0;
            }

        }

    }

    async store() {

        if( this.state.totalSale > 0){

            let formData = new FormData();
            formData.append('productsSale', JSON.stringify(this.state.productsSale));
            formData.append('totalTax',  this.state.totalTax);
            formData.append('totalSale',  this.state.totalSale);

            const requestOptions = {
                method: 'POST',
                body: formData        
            }
        
            const response = await fetch(apiURL + 'sale/store', requestOptions);
            const json = await response.json();
            
            if(json > 0){
                alert("Venda registrada!");
                this.reset();
            }
            else{
                alert("Erro ao registrar a venda!");
            }

        }
        else{
            alert("Adicione um produto para poder finalizar a venda!");
        }

    }

    reset(){
        this.setState({
            totalTax: 0,
            totalSale: 0,            
            productsSale: [],
            many: 0,
            productSelected: 0,
            ready: false
        });

        document.getElementById("selectProduct").value = 0;

        window.location.href = "http://localhost:3000/saleSearch";
    }

    moneyFormat(value){
        let money = value.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
        return money;
    }

    render() {
        if(this.state.redirect === true){
            return ( 
                <redirect 
                    to={{
                        pathname:"/saleSearch"
                     }} >
                </redirect>);
        }
        else {
            return (
                <>
                    <Header />
                    <div className="container-xl-fluid">
                        <div className="row-col d-flex justify-content-center mt-4 mb-4">
                            <h3>Registro de venda</h3>
                        </div>
                        <form>
                            <div className="row g-3">
                                <div className="col-md-8">
                                    <div className="table-responsive">
                                        <table className="table">
                                            <thead>
                                                <tr>
                                                    <th scope="col">Produto</th>
                                                    <th scope="col">Preço (R$)</th>
                                                    <th scope="col">Qtde</th>
                                                    <th scope="col">Imposto (R$)</th>
                                                    <th scope="col">Total (R$)</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {this.state.productsSale.map( prod => {
                                                    return (
                                                        <tr key={prod.id}>
                                                            <th align='left' scope="col">{prod.name}</th>
                                                            <th scope="col">{this.moneyFormat(prod.price)}</th>
                                                            <th scope="col">{prod.many}</th>
                                                            <th scope="col">{this.moneyFormat(prod.valueTax)}</th>
                                                            <th scope="col">{this.moneyFormat(prod.valueTotal)}</th>
                                                        </tr>
                                                    )
                                                })}
                                            </tbody>        
                                        </table>
                                    </div>
                                </div>
                                <div className="col-md-4 col-sm-12">
                                    <div className="row g-3 mt-3 mb-3">               
                                        <div className="col-md-12 col-sm-12">
                                            <label htmlFor="selectProduct" className="form-label">Selecione o produto</label>            
                                        </div>
                                    </div>
                                    <div className="row g-3 mt-3 mb-3">               
                                        <div className="col-md-10 col-sm-12">
                                            <select id="selectProduct" className="form-control" onChange={e => this.setState({ productSelected: e.target.value})}>                                        
                                                
                                            </select>              
                                        </div>
                                    </div>
                                    <div className="row g-3 mt-3 mb-3">               
                                        <div className="col-md-10 col-sm-12">
                                            <label htmlFor="manyProduct" className="form-label">Quantidade: </label>            
                                        </div>
                                    </div>
                                    <div className="row g-3 mt-3 mb-3">               
                                        <div className="col-md-10 col-sm-12">
                                            <input type="number" id="manyProduct"  className="form-control" value={this.state.many} onChange={e => this.setState({ many: e.target.value})} />  
                                        </div>
                                    </div>
                                    <div className="row g-3 mt-3 mb-3">               
                                        <div className="col-md-10 col-sm-12">
                                            <button type="button" className="btn btn-primary" onClick={this.addItem}> Adicionar produto</button>
                                            <hr />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <hr />
                            <div className="row g-3 mb-3 pl-4 d-flex justify-content-center" >
                                    <div className="col-md-4 col-sm-12 d-flex justify-content-center">
                                        <label htmlFor="totalTax" className="form-label"><b>Total Imposto:</b></label>
                                        <input readOnly type="text" className="form-control" id="totalTax" value={ this.moneyFormat(this.state.totalTax)}/>
                                    </div>
                                    <div className="col-md-4 col-sm-12 d-flex justify-content-center">
                                        <label htmlFor="totalSale" className="form-label"><b>Total Venda:</b></label>
                                        <input readOnly type="text" className="form-control" id="totalSale" value={this.moneyFormat(this.state.totalSale)}/>
                                    </div>               
                                    <div className="col-md-4 col-sm-12 d-flex justify-content-center">              
                                        <button type="button" className="btn btn-success" onClick={this.store}>Finalizar</button>
                                        <button type="button" className="btn btn-danger"  onClick={this.reset}>Cancelar</button>
                                    </div>
                                </div>
                        </form>
                    </div>   

                </>
            )
        }
    } 
}