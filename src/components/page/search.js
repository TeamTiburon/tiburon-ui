
import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from "react-router-dom";
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Input from '@material-ui/core/Input';

const styles = theme => ({
    root: {
        padding: 24
    },
    header: {
        fontSize: 32,
        fontWeight: 400,
        margin: '0 0 24px'
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

const topics = [
    'Immigration Law',
    'Community',
    'Translations'
];

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

class Search extends Component {

    constructor(props) {
        super(props);
        this.state = {
            helpWith: [],
            languages: []
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
        const helpWith = this.state.helpWith.join(',');
        const languages = this.state.languages.join(',');
        this.props.history.push({
            pathname: '/results',
            search: '?helpWith=' + helpWith + '&languages=' + languages
        });
    }

    render() {
        const { classes, theme } = this.props;

        return (
            <div className={classes.root}>
                <h1 className={classes.header}>Live Assistance</h1>

                <Grid container spacing={24}>
                    <Grid item xs={12} className={classes.gridy}>
                        <FormControl className={classes.flexy}>
                            <InputLabel htmlFor="helpWith">I need help with...</InputLabel>
                            <Select
                                multiple
                                value={this.state.helpWith}
                                onChange={this.handleChange}
                                input={<Input id="helpWith" name="helpWith" />}>
                                {topics.map(topic => (
                                    <MenuItem
                                        key={topic}
                                        value={topic}>
                                        {topic}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={12} className={classes.gridy}>
                        <FormControl className={classes.flexy}>
                            <InputLabel htmlFor="languages">In the languages...</InputLabel>
                            <Select
                                multiple
                                value={this.state.languages}
                                onChange={this.handleChange}
                                input={<Input id="languages" name="languages" />}>
                                {languages.map(language => (
                                    <MenuItem
                                        key={language.value}
                                        value={language.value}>
                                        {language.label}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={12} className={classes.gridy}>
                        <Button variant="contained" color="primary" onClick={this.submit} className={classes.button}>
                            Find Help
                        </Button>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default withStyles(styles)(withRouter(Search));
