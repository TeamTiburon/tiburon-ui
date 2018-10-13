
import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';

const styles = theme => ({
    root: {
        padding: 24
    },
    header: {
        fontSize: 20,
        fontWeight: 400,
        margin: '0 0 16px'
    }
});

class Results extends Component {

    constructor(props) {
        super(props);

        // QUERY FROM SEARCH PAGE
        console.log(this.props.location.search);
    }

    onComponentDidMount() {
    }

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <h1 className={classes.header}>We found the following Volunteers who can help...</h1>
            </div>
        );
    }
}

export default withStyles(styles)(withRouter(Results));
