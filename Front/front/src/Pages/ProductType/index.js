import React, { Component } from "react";
import { apiURL } from "../../Services/env";
import './style.css';
import Header from "../../Components/Header";

export default class ProductType extends Component {

    constructor(props) {
        super(props);

        this.state = {
            productsType: [],
            name: ''
        }

        this.handleProductType = this.handleProductType.bind(this);

    }

    componentDidMount() {
        this.getData();
    }

    async getData() {

        const requestOptions = {
            method: 'GET'
        }
     
        const response = await fetch(apiURL + 'productType/index', requestOptions);
        const json = await response.json();
        this.setState({ productsType: json});
    }

    async handleProductType() {
        
        if( this.state.name !== undefined && this.state.name !== null && this.state.name !== ''){

            let formData = new FormData();
            formData.append('name', this.state.name);

            const requestOptions = {
                method: 'POST',
                body: formData        
            }

            const response = await fetch(apiURL + 'productType/store', requestOptions);
            const json = await response.json();
            
            if(json > 0){
                alert("Tipo de produto registrado!");
                this.setState({name: ''});
            }
            else{
                alert("Erro ao registrar o tipo de produto!");
            }

        }
        else{
            alert("Digite o nome do tipo de produto!");
        }

        this.getData();
    }

    async remove(id) {
       
        if(id != null){

            let formData = new FormData();
            formData.append('id', id);

            const requestOptions = {
                method: 'POST',
                body: formData        
            }
                        
            const response = await fetch(apiURL + 'productType/drop' , requestOptions);
            const res = await response.json();
            
            if(res === 1){
                alert("Tipo de produto excluído!");
            }
            else{
                alert("Remova os produtos vinculados ao tipo de produto antes de excluir!");
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
                        <h4> Tipos de produto </h4>
                    </div>
                    <form>
                        <div className="row" >
                            <div className="col">
                                Cadastrar novo tipo de produto:
                            </div>
                        </div>
                        <div className="row g-3 mt-4 mb-4" >
                            <div className="col-4">
                                    <input className="form-control" type='text' placeholder="Nome do novo tipo de produto..." 
                                        onChange={e => this.setState({ name: e.target.value })} />
                            </div>                            
                            <div className="col-3">
                                    <button type="submit" className="btn btn-primary mx-2" onClick={this.handleProductType} >
                                        Adicionar tipo de produto
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
                                                <th scope="col-6">Nome</th>
                                                <th scope="col-6">Ações</th>                                                                
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.state.productsType.map( pt => {
                                                return (
                                                    <tr key={pt.id}>
                                                        <th scope="col">{ pt.id }</th>
                                                        <th scope="col">{ pt.name}</th> 
                                                        <th scope="col">                                                                            
                                                            <button className="btn p-0 p-1 btn-danger" 
                                                                    onClick={(e) => {e.preventDefault(); this.remove(pt.id); this.getData();}} 
                                                                    data-tip="Remover tipo de produto"
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