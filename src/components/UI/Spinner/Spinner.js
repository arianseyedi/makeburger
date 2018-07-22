/**
 * Spinner downloaded from https://projects.lukehaas.me/css-loaders/
 */
import React from 'react';
import classes from './Spinner.css';
import Aux from '../../../hoc/ReactAux'

const spinner = () => (
    <Aux>
        <div className={classes.Loader}/>
    </Aux>
);

export default spinner;
