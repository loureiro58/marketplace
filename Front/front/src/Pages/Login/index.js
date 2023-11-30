import React, { Component } from "react";
import { apiURL } from "../../Services/env";
import './style.css';

export default class Login extends Component {

    constructor(props) {
        super(props);

        this.referencia = React.createRef();

        this.state = {
            pass: '',
            name: '',
        }

        this.handleLogin = this.handleLogin.bind(this);
    }

    componentDidMount() {
        localStorage.removeItem("token");
    }

    async handleLogin(e) {
        e.preventDefault();

        if( this.state.name !== null && this.state.name !== undefined && this.state.name !== ''){            
            
            if(this.state.pass !== null && this.state.pass !== undefined && this.state.pass !== '') {
                
                let formData = new FormData();
                formData.append('name', this.state.name);
                formData.append('pass', this.state.pass);

                const requestOptions = {
                    method: 'POST',
                    body: formData        
                }
            
                const response = await fetch(apiURL + 'login', requestOptions);
                const json = await response.json();
                
                console.log(json);
                if(json[0] === true){
                    let token = json[1];
                    localStorage.setItem("token", token);
                    window.location.href = "/productType";                    
                }
                else{
                    alert("Usuário ou senha inválido!");
                }

            }
            else{
                alert("Digite uma senha!");
            }
        }
        else{
            alert("Digite o nome do usuário!");
        }

    }

    render() {
     
        return (
            <div className="container-fluid " style={{height:"100vh", backgroundColor: "#171933"}}>
                <div className="row-col d-flex justify-content-center">
                    <form >
                        <div className="row mt-5 mb-4" >
                            <div className="col" style={{fontSize: 30, color:"white"}}>
                                Mercadex
                            </div>
                        </div>
                        <div className="row">                                       
                            <div className="col mb-4">
                                <label htmlFor="userName" style={{ color:"white"}}>Usuário:</label>
                                <input
                                        className="form-control"
                                        id="userName"
                                        placeholder="Digite o usuário"
                                        onChange={e => this.setState({ name: e.target.value })}                                                                                                                           
                                />
                            </div>
                        </div>
                        <div className="row">    
                            <div className="col mb-4">
                                    <label htmlFor="userName" style={{ color:"white"}}>Senha:</label>
                                    <input
                                        className="form-control"
                                        id="pass"
                                        placeholder="Digite a senha"
                                        onChange={e => this.setState({ pass: e.target.value })}                                                                                                                           
                                    />
                            </div>
                        </div>
                        <div className="row" >
                            <div className="col mb-3">
                                <button type="submit" className="btn btn-primary" 
                                            onClick={this.handleLogin} 
                                >
                                            Login
                                </button>
                            </div>
                        </div>
                    </form>                    
                </div>
            </div>
        )
    }
}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   