import React, { Component } from 'react';
import PropTypes from 'prop-types';
import NumberFormat from 'react-number-format';
import Input, { InputLabel } from 'material-ui/Input';
import { FormControl } from 'material-ui/Form';


class CustomFormat extends Component {
    render() {
        return (
            <NumberFormat
                {...this.props}
                onChange={(event, values) => {
                    this.props.onChange({
                        target: {
                            value: values.value,
                        },
                    });
                }}
                thousandSeparator
                prefix="$"
            />
        );
    }
}

CustomFormat.propTypes = {
    onChange: PropTypes.func.isRequired,
}

  function CurrencyInput(props) {
      const { label, fullWidth } = props;
      const id = label.toLowerCase().split(' ').join('_');
      return (
        <FormControl fullWidth={fullWidth}>
              {
                  label && (
                      <InputLabel htmlFor={id}>
                          {label}
                      </InputLabel>
                  )
              }
            <Input
                {...props}
                id={id}
                fullWidth={fullWidth}
                inputComponent={CustomFormat}
            />
        </FormControl>
      );
  }

  CurrencyInput.propTypes = {
      label : PropTypes.string,
      fullWidth: PropTypes.bool,
  }

  CurrencyInput.defaultProps = {
      label: 'Currency Input',
      fullWidth: false,
  }

  export default CurrencyInput;
