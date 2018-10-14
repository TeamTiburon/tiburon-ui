
import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from "react-router-dom";

import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';

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

class Register extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            displayName: '',
            language: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.submit = this.submit.bind(this);
    }

    onComponentDidMount() {

    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    submit(event) {
        localStorage.setItem('user', JSON.stringify(this.state));
        this.props.history.push('/dashboard')
    }

    render() {
        const languages = [
            {
                value: 'ENG',
                label: 'English',
            },
            {
                value: 'ES',
                label: 'Español',
            }
        ];
        const { classes, t } = this.props;

        return (

            <div>
                <h1 className={classes.header}>{t('sign_up')}</h1>

                <form noValidate autoComplete="off">

                    <div className={classes.root}>
                        <Grid container spacing={8}>
                            <Grid item xs={12} className={classes.gridy}>
                                <TextField
                                    id="email"
                                    label={t('email')}
                                    margin="normal"
                                    className={classes.flexy}
                                    name="email"
                                    onChange={this.handleChange}
                                />
                            </Grid>
                            <Grid item xs={12} className={classes.gridy}>
                                <TextField
                                    id="display-name"
                                    label={t('display_name')}
                                    margin="normal"
                                    className={classes.flexy}
                                    name="displayName"
                                    onChange={this.handleChange}
                                />
                            </Grid>
                            <Grid item xs={12} className={classes.gridy}>
                                <TextField
                                    id="standard-select-language"
                                    select
                                    label={t('select')}
                                    className={classes.textField}
                                    value={this.state.language}
                                    onChange={this.handleChange}
                                    SelectProps={{
                                        MenuProps: {
                                            className: classes.menu,
                                        },
                                    }}
                                    helperText={t('select_language')}
                                    margin="normal"
                                    className={classes.flexy}
                                    name="language"

                                >
                                    {languages.map(option => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                            <Grid item xs={12} className={classes.gridy}>
                                <Button variant="contained" color="primary" onClick={this.submit} className={classes.button}>
                                    {t('submit')}
                                </Button>
                            </Grid>
                        </Grid>
                    </div>
                </form>

            </div>
        );
    }
}

export default withStyles(styles)(withRouter(Register));
