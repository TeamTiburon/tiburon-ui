import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from "react-router-dom";
import { connection } from '../../index';

import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import InputAdornment from '@material-ui/core/InputAdornment';
import AccountCircle from '@material-ui/icons/AccountCircle';
import VpnKey from '@material-ui/icons/VpnKey';

const volunteers = require('../../data/volunteers.json');

const styles = theme => ({
    root: {
        padding: 24
    },
    header: {
        textAlign: 'center',
        fontSize: 48,
        fontWeight: 400,
        marginBottom: -16
    },
    gridy: {
        display: 'flex',
        flexGrow: 1,
    },
    flexy: {
        flexGrow: 1
    },
    button: {
        flexGrow: 1,
        marginTop: 28
    }
});

class VolunteerLogin extends Component {

    constructor(props) {
        super(props);
        this.state = {
            login: '',
            password: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.submit = this.submit.bind(this);
    }

    componentDidMount() {
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    submit(event) {
        for(const volunteer of volunteers) {
            if(this.state.login == volunteer.login) {
                localStorage.setItem('volunteer', JSON.stringify(volunteer));
                this.props.history.push('/volunteerDashboard');
                break;
            }
        }
    }

    render() {
        const { classes } = this.props;

        return (
            <div>
                <h1 className={classes.header}>Volunteer Log In</h1>

                <form noValidate autoComplete="off">

                    <div className={classes.root}>
                        <Grid container spacing={8}>
                            <Grid item xs={12} className={classes.gridy}>
                                <TextField
                                    id="login"
                                    label="Login"
                                    margin="normal"
                                    className={classes.flexy}
                                    name="login"
                                    onChange={this.handleChange}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <AccountCircle />
                                            </InputAdornment>
                                        )
                                    }}
                                />
                            </Grid>

                            <Grid item xs={12} className={classes.gridy}>
                                <TextField
                                    id="password"
                                    label="Password"
                                    type="password"
                                    margin="normal"
                                    className={classes.flexy}
                                    name="password"
                                    onChange={this.handleChange}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <VpnKey />
                                            </InputAdornment>
                                        )
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} className={classes.gridy}>
                                <Button variant="contained" color="primary" onClick={this.submit} className={classes.button}>
                                    Log In
                                </Button>
                            </Grid>
                        </Grid>
                    </div>
                </form>

            </div>
        );
    }
}

export default withStyles(styles)(withRouter(VolunteerLogin));
