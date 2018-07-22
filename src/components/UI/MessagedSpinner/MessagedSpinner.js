import React from 'react';
import SpinnerMessage from '../SpinnerMessage/SpinnerMessage';
import Spinner from '../Spinner/Spinner';

const messagedSpinner = (props) => (
    <div>
        <Spinner/>
        <SpinnerMessage>
           <h1>{props.children}</h1>
        </SpinnerMessage>
    </div>
);

export default messagedSpinner;
