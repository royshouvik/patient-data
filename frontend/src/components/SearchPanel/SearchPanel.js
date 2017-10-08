import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Grid from 'material-ui/Grid';
import TextField from 'material-ui/TextField';
import CurrencyInput from './CurrencyInput';
import Button from 'material-ui/Button';
import { FormGroup } from 'material-ui/Form';
import Checkbox from './Checkbox';
import { providerHeader } from '../../constants';
import { transformFields } from '../../util';

import './SearchPanel.css';

const propTypes = {
   onSearch: PropTypes.func.isRequired,
}

class SearchPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            max_discharges: '',
            min_discharges: '',
            max_average_covered_charges: '',
            min_average_covered_charges: '',
            max_average_medicare_payments: '',
            min_average_medicare_payments: '',
            state: '',
            fields: providerHeader.map(field => Object.assign({}, field, { checked: false}))
        }

        this.onChangeInput = this.onChangeInput.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleCheckChange = this.handleCheckChange.bind(this);
    }
    handleCheckChange = (id) => (event, checked) => {
        const updatedFields = this.state.fields.map(field => {
            if (id === field.id) {
                return Object.assign({}, field, { checked });
            }
            return field;
        });

        this.setState({ fields: updatedFields});
    }

    handleSearch() {
        const { fields, ...state } = this.state;
        const checkedFields = fields.filter(field => field.checked);
        if (checkedFields.length === fields.length || checkedFields.length === 0) {
            this.props.onSearch(state);
        } else {
            this.props.onSearch(Object.assign({}, state, { filter: transformFields(checkedFields)}));
        }
    }

    onChangeInput = (name) => (event) => {
        this.setState({
            [name] : event.target.value,
        });
    }

    render() {
        return (
            <div className="SearchPanel">
                <Grid container spacing={24}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Max number of Total Discharges"
                            type="number"
                            margin="normal"
                            fullWidth
                            value={this.state.max_discharges}
                            onChange={this.onChangeInput('max_discharges')}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Min number of Total Discharges"
                            type="number"
                            margin="normal"
                            fullWidth
                            value={this.state.min_discharges}
                            onChange={this.onChangeInput('min_discharges')}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <CurrencyInput
                            label="Max Average Covered Charges"
                            margin="normal"
                            fullWidth
                            value={this.state.max_average_covered_charges}
                            onChange={this.onChangeInput('max_average_covered_charges')}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <CurrencyInput
                            label="Min Average Covered Charges"
                            margin="normal"
                            fullWidth
                            value={this.state.min_average_covered_charges}
                            onChange={this.onChangeInput('min_average_covered_charges')}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <CurrencyInput
                            label="Max Average Medicare Payment"
                            margin="normal"
                            fullWidth
                            value={this.state.max_average_medicare_payments}
                            onChange={this.onChangeInput('max_average_medicare_payments')}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <CurrencyInput
                            label="Min Average Medicare Payment"
                            margin="normal"
                            fullWidth
                            value={this.state.min_average_medicare_payments}
                            onChange={this.onChangeInput('min_average_medicare_payments')}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="The state that the provider is from"
                            margin="normal"
                            fullWidth
                            value={this.state.state}
                            onChange={this.onChangeInput('state')}
                        />
                    </Grid>
                    <hr />
                    <Grid item xs={12}>
                        <FormGroup row>
                            {
                                this.state.fields.map(field => (
                                    <Checkbox
                                        key={field.id}
                                        value={field.id}
                                        label={field.name}
                                        checked={field.checked}
                                        onChange={this.handleCheckChange(field.id)}
                                    />
                                ))
                            }
                        </FormGroup>
                    </Grid>

                    <Grid item xs={12}>
                        <Button raised color="primary" className="fullWidth" onClick={this.handleSearch}>
                            Search
                        </Button>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

SearchPanel.propTypes = propTypes;

export default SearchPanel;
