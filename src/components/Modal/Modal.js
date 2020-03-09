import React, {Component} from 'react';

import classes from './Modal.module.css';
import Auxiliar from '../../hoc/Auxiliar/Auxiliar';
import Backdrop from '../Backdrop/Backdrop'; 


class Modal extends Component {// = (props) => {

    shouldComponentUpdate (nextProps, nextState){
        return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
    }

    render(){
        return (
            <Auxiliar>
                <Backdrop show={this.props.show} click={this.props.click}/>
                <div    
                    className={classes.Modal}
                    style={{transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                    opacity: this.props.show ? '1' : '0'}}>
                    {this.props.children}
                </div>
            </Auxiliar>
        )
    }
};

export default Modal;