import React, { Component } from "react";
import { apiURL } from "../../Services/env";
import './style.css';
import Header from "../../Components/Header";

export default class Product extends Component {

    constructor(props) {
        super(props);

        this.referencia = React.createRef();

        this.state = {
            products: [],
            price: '',
            name: '',
            productTypeId: 0,
            productsType: [],
        }

        this.getData = this.getData.bind(this);
        this.getTypes = this.getTypes.bind(this);
        this.remove = this.remove.bind(this);
        this.handleStore = this.handleStore.bind(this);
    }

    componentDidMount() {
        this.getTypes();
        this.getData();
    }

    async getData() {

        const requestOptions = {
            method: 'GET'
        }
     
        const response = await fetch(apiURL + 'product/index', requestOptions);
        const prods = await response.json();
        this.setState({ products: prods});
    }

    async getTypes() {

        const requestOptions = {
            method: 'GET'
        }
     
        const response = await fetch(apiURL + 'productType/index', requestOptions);
        const types = await response.json();
        this.setState({ productsType: types});

        console.log(types);
        const select = document.getElementById("selectProductType");
   
        let option = null;
        let contador = 0;
     
        this.state.productsType.forEach(temp => {
            option = new Option(temp['name'], temp['id']);
            select.options[contador] = option;
            contador++;
        });

    }

    async handleStore(e) {
        e.preventDefault();

        if( this.state.name !== null && this.state.name !== undefined && this.state.name !== ''){            
            
            if(this.state.price !== null && this.state.price !== undefined && this.state.price > 0) {
                
                let formData = new FormData();
                formData.append('name', this.state.name);
                formData.append('productTypeId', this.state.productTypeId);
                formData.append('price', this.state.price);

                const requestOptions = {
                    method: 'POST',
                    body: formData        
                }
            
                const response = await fetch(apiURL + 'product/store', requestOptions);
                const json = await response.json();
                
                if(json > 0){
                    alert("Produto registrado!");
                    this.setState({name: ''})
                    this.setState({price: 0.00});
                    document.getElementById("name").value = '';
                    document.getElementById("price").value = '';                    
                }
                else{
                    alert("Erro ao registrar o produto!");
                }

            }
            else{
                alert("Digite um preço válido!");
            }
        }
        else{
            alert("Digite o nome do produto!");
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
                             
            const response = await fetch(apiURL + 'product/drop' , requestOptions);
            const res = await response.json();
            
            if(res === 1){
                alert("Produto removido!");
            }
            else{
                alert("Erro ao remover o produto!");
            }
            
            this.getData();
            
        }
    }
    
    updateProduct(e){
        e.preventDefault();

    }
 
    componentDidUpdate(){       
    }

    render() {
        return (
                                                                                                                                                                                                                       <>
                <Header/>
                <div className="container-fluid">
                    <div className="row-col d-flex justify-content-center mt-4 mb-4">
                        <h4> Produtos </h4>
                    </div>
                    <form>
                        <div className="row mt-4 mb-4" >
                            <div className="col">
                                Cadastrar novo produto:
                            </div>
                        </div>
                        <div className="row">                                       
                                                    <div className="col-sm-6 col-md-3 col-lg-3 mb-4">
                                                        <label htmlFor="name">Nome:</label>
                                                        <input
                                                            className="form-control"
                                                            id="name"
                                                            placeholder="Digite o nome do produto"
                                                            onChange={e => this.setState({ name: e.target.value })}                                                                                                                           
                                                        />
                                                    </div>
                                                    <div className="col-sm-6 col-md-3 col-lg-3 mb-3">
                                                        <label htmlFor="selectProductType">Tipo</label> 
                                                        <select className="form-control" id="selectProductType"
                                                            onChange={e => this.setState({ productTypeId: e.target.value })}>                                                            
                                                        </select>                                                                                                                           
                                                    </div>
                                                    <div className="col-sm-6 col-md-3 col-lg-3 mb-4">
                                                        <label htmlFor="price">Preço:</label>
                                                        <input
                                                            className="form-control"
                                                            id="price"
                                                            type='number' placeholder="0.00" pattern="[0-9]+([.][0-9]+)?" 
                                                            onChange={e => this.setState({ price: e.target.value })} 
                                                        />
                                                    </div>
                                                    <div className="col-sm-6 col-md-2 col-lg-2 mb-3">
                                                        <br/>
                                                        <button type="submit" className="btn btn-primary mx-2" 
                                                            onClick={this.handleStore} >
                                    Cadastrar
                                </button>
                            </div>
                        </div>
                    </form>
                    <div className="row" >
                        <div className="col">
                            <div className="table-responsive">
                                                <table className="table table-striped">
                                                    <thead  >
                                                        <tr>
                                                            <th scope="col-1" className="text-left">ID</th>
                                                            <th scope="col-3">NOME</th>
                                                            <th scope="col-3">TIPO</th>
                                                            <th scope="col-2">PREÇO</th>
                                                            <th scope="col-3">AÇÕES</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {this.state.products.map( prod => {
                                                            return (
                                                                <tr key={prod.id}>
                                                                    <th scope="col">{ prod.id}</th>
                                                                    <th align='left' scope="col">{prod.name}</th>
                                                                    <th scope="col">{prod.type.name}</th>
                                                                    <th scope="col">{prod.price}</th>
                                                                    <th scope="col">
                                                                        <button 
                                                                            className="btn p-0 p-1 btn-danger" 
                                                                            onClick={(e) => {e.preventDefault(); this.remove(prod.id); this.getData();}} 
                                                                                data-tip="Remover produto"
                                                                            data-place="bottom"
                                                                            data-effect="solid"                                                                            
                                                                        >
                                                                            Excluir
                                                                        </button>
                                                                    </th>
                                                                </tr>
                                                            )
                                                        })}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>                                   
 
                                    </div>

                                </div>
                                                  
            </>
        )
    }
}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   