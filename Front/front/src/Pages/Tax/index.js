import React, { Component } from "react";
import { apiURL } from "../../Services/env";
import './style.css';
import Header from "../../Components/Header";

export default class Tax extends Component {

    constructor(props) {
        super(props);

        this.state = {
            taxs: [],
            name: '',
            percentage: 0.00
        }

        this.handleTax = this.handleTax.bind(this);
        this.remove = this.remove.bind(this);
        this.getData = this.getData.bind(this);
    }

    componentDidMount() {
        let token = localStorage.getItem('token');        
        if(token === null || token === undefined){            
            window.location.href = "/";
        }
        
        this.getData();
    }

    async getData() {

        const requestOptions = {
            method: 'GET'
        }
     
        const response = await fetch(apiURL + 'tax/index', requestOptions);
        const json = await response.json();
        this.setState({ taxs: json});
    }

    async handleTax(e) {
        e.preventDefault();

        if( this.state.name !== null && this.state.name !== undefined && this.state.name !== ''){            
            
            if(this.state.percentage !== null && this.state.percentage !== undefined && this.state.percentage > 0) {
                
                let formData = new FormData();
                formData.append('name', this.state.name);
                formData.append('percentage', this.state.percentage);

                const requestOptions = {
                    method: 'POST',
                    body: formData        
                }
            
                const response = await fetch(apiURL + 'tax/store', requestOptions);
                const json = await response.json();
                
                if(json > 0){
                    alert("Taxa registrada!");
                    this.setState({name: ''})
                    this.setState({percentage: 0.00});
                    document.getElementById("nameTax").value = '';
                    document.getElementById("percentageTax").value = '';                    
                }
                else{
                    alert("Erro ao registrar a taxa!");
                }

            }
            else{
                alert("Digite um percentual válido!");
            }
        }
        else{
            alert("Digite o nome da taxa!");
        }

        this.getData();

    }

    async remove(id) {
       
        if(id !== null && id !== undefined){

            let formData = new FormData();
            formData.append('id', id);

            const requestOptions = {
                method: 'POST',
                body: formData   
            }
                             
            const response = await fetch(apiURL + 'tax/drop' , requestOptions);
            const res = await response.json();
            
            if(res === 1){
                alert("Taxa removida!");
            }
            else{
                alert("Remova os tipos de produtos vinculados à taxa antes de excluir!");
            }
            
            this.getData();
            
        }
    }
     
    render() {
        return (
            <>
                <Header/>
                <div className="container-fluid">
                    <div className="row-col d-flex justify-content-center mt-4 mb-4">
                        <h4> Taxas </h4>
                    </div>
                    <form>
                        <div className="row" >
                            <div className="col">
                                Cadastrar nova taxa:
                            </div>
                        </div>
                        <div className="row g-3 mt-4 mb-4" >
                            <div className="col-4">
                                    <input id="nameTax" className="form-control" type='text' placeholder="Nome da nova taxa..." 
                                        onChange={e => this.setState({ name: e.target.value })} />
                            </div>
                            <div className="col-4">
                                    <input id="percentageTax" className="form-control" type='number' placeholder="0.00" pattern="[0-9]+([.][0-9]+)?" 
                                        onChange={e => this.setState({ percentage: e.target.value })} />
                            </div>
                            <div className="col-2">
                                    <button type="submit" className="btn btn-primary mx-2" onClick={this.handleTax} >
                                        Adicionar taxa
                                    </button>
                            </div>
                        </div>                    
                        <div className="row mt-4 mb-4" >
                            <div className="col">
                                <div className="table-responsive">
                                    <table className="table table-striped">
                                        <thead  >
                                            <tr>
                                                <th scope="col-1" className="text-left">ID</th>
                                                <th scope="col-6">Taxa</th>
                                                <th scope="col-6">Percentual</th>
                                                <th scope="col-6">Ações</th>                                                                
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.state.taxs.map( tax => {
                                                return (
                                                    <tr key={tax.id}>
                                                        <th scope="col">{ tax.id }</th>
                                                        <th scope="col">{ tax.name}</th> 
                                                        <th scope="col">{ tax.percentage} %</th>                                                                       
                                                        <th scope="col">                                                                            
                                                            <button className="btn p-0 p-1 btn-danger" onClick={(e) => {e.preventDefault(); this.remove(tax.id); this.getData();}} 
                                                                    data-tip="Remover taxa"
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