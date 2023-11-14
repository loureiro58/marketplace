import React, { Component } from "react";
import { apiURL } from "../../Services/env";
import './style.css';
import Header from "../../Components/Header";

export default class TaxProductType extends Component {

    constructor(props) {
        super(props);

        this.state = {
            taxs: [],
            types: [],
            relations: [],
            taxId: 0,
            typeId:0
        }

        this.handleRelation = this.handleRelation.bind(this);
        this.getTypes = this.getTypes.bind(this);
        this.getTaxs = this.getTaxs.bind(this);
        this.remove = this.remove.bind(this);
        this.getData = this.getData.bind(this);
    }

    componentDidMount() {
        this.getTypes();
        this.getTaxs();
        this.getData();
    }

    async getTypes() {

        const requestOptions = {
            method: 'GET'
        }
     
        const response = await fetch(apiURL + 'productType/index', requestOptions);
        const types = await response.json();
        this.setState({ productsType: types});

        const select = document.getElementById("selectProductType");
   
        let option = null;
        let contador = 0;
     
        this.state.productsType.forEach(temp => {
            option = new Option(temp['name'], temp['id']);
            select.options[contador] = option;
            contador++;
        });

    }

    async getTaxs() {

        const requestOptions = {
            method: 'GET'
        }
     
        const response = await fetch(apiURL + 'tax/index', requestOptions);
        const taxs = await response.json();
        this.setState({ taxs: taxs});

        const select = document.getElementById("selectTax");
   
        let option = null;
        let contador = 0;
     
        this.state.taxs.forEach(temp => {
            option = new Option(temp['name'], temp['id']);
            select.options[contador] = option;
            contador++;
        });

    }


    async getData() {

        const requestOptions = {
            method: 'GET'
        }
     
        const response = await fetch(apiURL + 'taxProductType/index', requestOptions);
        const json = await response.json();
        this.setState({ relations: json});
    }

    async handleRelation(e) {
        e.preventDefault();

        if( this.state.taxId !== null && this.state.taxId !== undefined && this.state.taxId  > 0){            
            
            if(this.state.productTypeId !== null && this.state.productTypeId !== undefined && this.state.productTypeId > 0) {
                
                let formData = new FormData();
                formData.append('productTypeId', this.state.productTypeId);
                formData.append('taxId', this.state.taxId);

                const requestOptions = {
                    method: 'POST',
                    body: formData        
                }
            
                const response = await fetch(apiURL + 'taxProductType/store', requestOptions);
                const json = await response.json();
                
                if(json > 0){
                    alert("Vínculo registrado!");
                    this.setState({productTypeId: ''})
                    this.setState({taxId: ''});
                }
                else{
                    alert("Erro ao registrar o vínculo!");
                }

            }
            else{
                alert("Selecione um tipo de produto!");
            }
        }
        else{
            alert("Selecione uma taxa!");
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
                             
            const response = await fetch(apiURL + 'taxProductType/drop' , requestOptions);
            const res = await response.json();
            
            if(res === 1){
                alert("Vínculo removido!");
            }
            else{
                alert("Erro ao remover o vínculo!");
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
                        <h4> Vincular taxas a tipos de produtos </h4>
                    </div>
                    <form>
                        <div className="row" >
                            <div className="col">
                                Cadastrar nova relação:
                            </div>
                        </div>
                        <div className="row g-3 mt-4 mb-4" >
                            <div className="col-4">
                                <label htmlFor="selectProductType">Tipo de produto</label> 
                                <select className="form-control" id="selectProductType"
                                        onChange={e => this.setState({ productTypeId: e.target.value })}>                                                            
                                </select>                                                                                                                                                                               
                            </div>
                            <div className="col-4">
                                <label htmlFor="selectTax">Taxa</label> 
                                <select className="form-control" id="selectTax"
                                        onChange={e => this.setState({ taxId: e.target.value })}>                                                            
                                </select>                                                                                                                                                                               
                            </div>
                            <div className="col-2">
                                    <button type="submit" className="btn btn-primary mx-2" onClick={this.handleRelation} >
                                        Adicionar relacionamento
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
                                                <th scope="col-6">Tipo do produto</th>
                                                <th scope="col-6">Taxa</th>
                                                <th scope="col-6">Ações</th>                                                                
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.state.relations.map( rel => {
                                                return (
                                                    <tr key={rel.id}>
                                                        <th scope="col">{ rel.id }</th>
                                                        <th scope="col">{ rel.nameProductType["name"]}</th> 
                                                        <th scope="col">{ rel.nameTax["name"]}</th>                                                                       
                                                        <th scope="col">                                                                            
                                                            <button className="btn p-0 p-1 btn-danger" onClick={(e) => {e.preventDefault(); this.remove(rel.id); this.getData();}} 
                                                                    data-tip="Remover relação"
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