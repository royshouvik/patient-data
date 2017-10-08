import React from 'react';
import PropTypes from 'prop-types';
import { FormControlLabel } from 'material-ui/Form';
import Checkbox from 'material-ui/Checkbox';

function CustomCheckbox({checked, onChange, value, label}) {
    return (
        <FormControlLabel
            style={{ minWidth: '45%'}}
            control={
                <Checkbox
                    checked={checked}
                    onChange={onChange}
                    value={value}
                />
            }
            label={label}
        />
    )
}

CustomCheckbox.propTypes = {
    label: PropTypes.string.isRequired,
    checked: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
}

export default CustomCheckbox;

