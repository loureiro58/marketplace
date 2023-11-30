import React, { Component } from "react";
import { apiURL } from "../../../Services/env";
import './style.css';
import Header from "../../../Components/Header";
import { redirect }  from 'react-router-dom';

export default class SaleSearch extends Component {

    constructor(props) {
        super(props);

        this.getData = this.getData.bind(this);
        this.newSale = this.newSale.bind(this);
        this.moneyFormat = this.moneyFormat.bind(this);
        this.remove = this.remove.bind(this);

        this.state = {
            sales : [],
        }

        this.new = false;
    }

    componentDidMount() {
        let token = localStorage.getItem('token');        
        if(token === null || token === undefined){            
            window.location.href = "/";
        }
        
        this.getData();
        this.new = false;
    }

    async getData() {

        const requestOptions = {
            method: 'GET'
        }
     
        const response = await fetch(apiURL + 'sale/index', requestOptions);
        const res = await response.json();
    
        this.setState({sales: res});
       
    }

    newSale() {
        window.location.href = "http://localhost:3000/sale";        
    }

    moneyFormat(value){
        let money = value.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
        return money;
    }

    async remove(id) {
       
        if(id !== null && id !== undefined){

            let formData = new FormData();
            formData.append('id', id);

            const requestOptions = {
                method: 'POST',
                body: formData   
            }
                             
            const response = await fetch(apiURL + 'sale/drop' , requestOptions);
            const res = await response.json();
            
            if(res === 1){
                alert("Venda removida!");
            }
            else{
                alert("Erro ao excluir a venda!");
            }
            
            this.getData();
            
        }
    }

    render() {
        if(this.new === true){
            return ( 
                <redirect 
                    to={{
                        pathname:"/sale"
                     }} >
                </redirect>);
        }
        else {
            return (
                <>
                    <Header />
                    <div className="container-xl-fluid">
                        <div className="row-col d-flex justify-content-center mt-4 mb-4">
                            <h3>Vendas</h3>
                        </div>                        
                        <div className="row g-3 ml-3 mb-3">               
                                    <div className="col-md-4 col-sm-12">
                                        <button type="button" className="btn btn-primary " onClick={this.newSale} >Nova venda</button>
                                    </div>
                                </div>
                        <form>
                            <div className="row g-3">
                                <div className="col-md-1">                                    
                                </div>
                                <div className="col-md-7">
                                    <div className="table-responsive">
                                        <table className="table">
                                            <thead>
                                                <tr>
                                                    <th scope="col">Código</th>
                                                    <th scope="col">Total de Imposto (R$)</th>
                                                    <th scope="col">Total da vendas(R$)</th>
                                                    <th scope="col">Ações</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {this.state.sales.map( sale => {
                                                    return (
                                                        <tr key={sale.id}>
                                                            <th align='left' scope="col">{sale.id}</th>
                                                            <th scope="col">{this.moneyFormat(sale.totalTax)}</th>
                                                            <th scope="col">{this.moneyFormat(sale.totalSale)}</th>
                                                            <th scope="col">                                                                            
                                                                <button className="btn p-0 p-1 btn-danger" onClick={(e) => {e.preventDefault(); this.remove(sale.id); this.getData();}} 
                                                                        data-tip="Remover venda"
                                                                        data-place="bottom"
                                                                        data-effect="solid"                                                                            
                                                                >Excluir</button>
                                                            </th>
                                                        </tr>
                                                    )
                                                })}
                                            </tbody>        
                                        </table>
                                    </div>
                                </div>

                            </div>    
                        </form>
                    </div>   

                </>
            )
        }
    } 
}