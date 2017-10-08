import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';


const styles = theme => ({
  root: {

  },
  flex: {
    
  },
  container: {

  },
  brand: {
    
  }
});


const Header = ({ classes }) => (
      <AppBar position="static" className={classes.root}>
        <Toolbar className={classes.container}>
          <div className={classes.flex}>
            <Typography type="title" color="inherit" className={classes.brand}>
              IPPS Provider Dashboard
            </Typography>
          </div>
        </Toolbar>
      </AppBar>
  );

Header.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Header);