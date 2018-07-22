import React, { Component } from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Aux from '../ReactAux';

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {
        state = {
            error: null
        }
        /**
         * WillMount or DidMount Dillema! Be careful here, we want
         * to catch the error before the child components of the 
         * WrappedComponent element are renderred.
         */
        componentWillMount(){
            this.reqInterceptor = axios.interceptors.request.use(req => {
                this.setState({error: null});
                return req; // so that the request can continue
            });
            this.resInterceptor = axios.interceptors.response.use(resp => resp, error => {
                this.setState({error:error});
            });
        }
        // remove dead interceptors after mount
        componentWillUnmount() {
            console.log("will unmount", this.reqInterceptor, this.resInterceptor);
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);
        }
        
        errorConfirmedHandler = () => {
            this.setState({error: null});
        }

        render() {
            return (
                <Aux>
                    <Modal 
                        show={this.state.error}
                        modalClosed={this.errorConfirmedHandler}>
                            {this.state.error? this.state.error.message : null};
                    </Modal>
                    <WrappedComponent {...this.props}/> 
                </Aux>
            );
        }
        
    }
};
    

export default withErrorHandler;
