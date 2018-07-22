import React from 'react';
import classes from './SpinnerMessage.css';

const spinnerMessage = (props) => (
    <div className={classes.PlacingOrderMessage}>
        {props.children}
    </div>
);

export default spinnerMessage;
