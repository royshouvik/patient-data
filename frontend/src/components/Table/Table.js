import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Table, { TableBody, TableCell, TableHead, TableRow, TableFooter, TablePagination } from 'material-ui/Table';
import NumberFormat from 'react-number-format';
import Typography from 'material-ui/Typography';

import './Table.css';

const styles = theme => ({
    paper: {
        width: '100%',
        overflowX: 'auto',
        padding: '0 10px',
    },
});

class DataTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rowsPerPage: 10,
            page: 0,
        };

        this.handleChangePage = this.handleChangePage.bind(this);
        this.handleChangeRowsPerPage = this.handleChangeRowsPerPage.bind(this);

    }

    handleChangePage( event, page) {
        this.setState({ page });
    }
    handleChangeRowsPerPage(event) {
        this.setState({ rowsPerPage: event.target.value });
    }

    render() {
        const { classes, title, data, headers } = this.props;
        const { rowsPerPage, page } = this.state;
        const noData = (
            <Typography type="display1" gutterBottom>
                No data to display.
            </Typography>
        );

        if (data.length === 0) {
            return noData;
        }

        // Keep only those headers for which data has been passed
        const rowData = data[0];
        const tableHeader = headers.filter((header) => Object.keys(rowData).includes(header.id));

        if (tableHeader.length === 0) {
            return noData;
        }

        return (
            <div className={classes.paper}>
                <div className="tableTitle">
                    <Typography type="title">{title}</Typography>
                </div>
                    <Table>
                        <TableHead>
                            <TableRow>
                                {
                                    tableHeader.map((head) => <TableCell key={head.id} numeric={head.numeric}>{ head.name }</TableCell> )
                                }
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                                    <TableRow key={row.id}>
                                        {
                                            tableHeader.map((head) => (
                                                <TableCell
                                                    key={head.id}
                                                    numeric={head.numeric}
                                                >
                                                    { head.currency ? (
                                                        <NumberFormat
                                                            thousandSeparator
                                                            prefix="$"
                                                            value={row[head.id]}
                                                            displayType="text"
                                                        />
                                                        ): row[head.id] }
                                                </TableCell> ))
                                        }
                                    </TableRow>
                                )
                            )}
                        </TableBody>
                        <TableFooter>
                            <TablePagination
                                style={{ display: 'flex'}}
                                count={data.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onChangePage={this.handleChangePage}
                                onChangeRowsPerPage={this.handleChangeRowsPerPage}
                            />
                        </TableFooter>
                    </Table>
            </div>
        );
    }
}

DataTable.propTypes = {
    classes: PropTypes.object.isRequired,
    title: PropTypes.node,
    headers: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        numeric: PropTypes.bool.isRequired,
        currency: PropTypes.bool,
    })).isRequired,
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default withStyles(styles)(DataTable);