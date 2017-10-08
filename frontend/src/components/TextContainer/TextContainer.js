import React from 'react';
import Typography from 'material-ui/Typography';

import './TextContainer.css';

function TextContainer({ children }) {
    return (
        <div className="message">
            <Typography type="display1" gutterBottom>
                { children }
            </Typography>
        </div>
    )
}

export default TextContainer;
