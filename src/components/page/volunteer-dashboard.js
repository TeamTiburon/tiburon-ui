import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from "react-router-dom";
import { connection } from '../../index';

const styles = theme => ({
    root: {
        padding: 16
    },
    header: {
        fontSize: 36,
        fontWeight: 400,
        marginBottom: -16
    }
});

class VolunteerDashboard extends Component {

    constructor(props) {
        super(props);
        this.validate();
    }

    componentDidMount() {
    }

    validate() {
        const volunteerStr = localStorage.getItem('volunteer');

        if(!volunteerStr) {
            this.props.history.push('/volunteerLogin');
            return;
        }

        const volunteer = JSON.parse(volunteerStr);
        connection.subscribe(this.props.history, volunteer);
    }

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <h1 className={classes.header}>Volunteer Dashboard</h1>
            </div>
        );
    }
}

export default withStyles(styles)(withRouter(VolunteerDashboard));
