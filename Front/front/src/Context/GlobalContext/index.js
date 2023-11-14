import { Component } from "react";
import { apiWithToken } from "../../Services/Api";
import { apiURL } from "../../Services/env";
import { GlobalContext } from "./context";

export class GlobalContextProvider extends Component {

    state = {
        loading: false,
    }

    startLoading = () => {
        this.setState((prevState) => ({ loading: true }))
    }

    stopLoading = () => {
        this.setState((prevState) => ({ loading: false }))
    }

    clearStorage = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('permissions');
    }

    logout = () => {

        const requestOptions = {
            method: 'POST'
        };

        this.startLoading();

        apiWithToken(apiURL + 'logout', requestOptions)
            .finally(() => {
                this.clearStorage();
                window.location.href = '/';
                this.stopLoading();
            })

    }

    getPermission = (permission) => {
        let permissionUser = JSON.parse(localStorage.getItem('permissions'));
        return permissionUser.includes(permission);
    }

    getPermissions = () => JSON.parse(localStorage.getItem('permissions'));

    render() {
        const { children } = this.props
        const { loading } = this.state
        const { startLoading, stopLoading, clearStorage, logout, getPermission, getPermissions } = this

        return (
            <GlobalContext.Provider
                value={{
                    loading,
                    clearStorage,
                    startLoading,
                    stopLoading,
                    getPermission,
                    getPermissions,
                    logout
                }}
            >
                {children}
            </GlobalContext.Provider>
        )
    }
}