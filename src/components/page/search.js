
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
import { withNamespaces, Trans } from "react-i18next";

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
    'imm_law',
    'community',
    'translations',
    'medical_services',
    'visa_process'
];

const languages = [
    'lang_en',
    'lang_es'
];

class Search extends Component {

    constructor(props) {
        super(props);
        this.state = {
            helpWith: [],
            language: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.submit = this.submit.bind(this);
        localStorage.setItem('searchHelp', null);
        localStorage.setItem('searchLanguage', null);
    }

    onComponentDidMount() {
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    submit(event) {
        const helpWith = this.state.helpWith.join(',');
        this.props.history.push({
            pathname: '/results',
            search: '?helpWith=' + helpWith + '&language=' + this.state.language
        });
    }

    render() {
        const { classes, t } = this.props;

        return (
            <div className={classes.root}>
                <h1 className={classes.header}>{t('live_assist')}</h1>

                <Grid container spacing={24}>
                    <Grid item xs={12} className={classes.gridy}>
                        <FormControl className={classes.flexy}>
                            <InputLabel htmlFor="helpWith">{t('need_help')}</InputLabel>
                            <Select
                                multiple
                                value={this.state.helpWith}
                                onChange={this.handleChange}
                                input={<Input id="helpWith" name="helpWith" />}>
                                {topics.map(topic => (
                                    <MenuItem
                                        key={topic}
                                        value={topic}>
                                        {t(topic)}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={12} className={classes.gridy}>
                        <FormControl className={classes.flexy}>
                            <InputLabel htmlFor="language">{t('in_language')}</InputLabel>
                            <Select
                                value={this.state.language}
                                onChange={this.handleChange}
                                input={<Input id="language" name="language" />}>
                                {languages.map(language => (
                                    <MenuItem
                                        key={language}
                                        value={language}>
                                        {t(language)}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={12} className={classes.gridy}>
                        <Button variant="contained" color="primary" onClick={this.submit} className={classes.button}>
                            {t('find_help')}
                        </Button>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default withNamespaces()(withStyles(styles)(withRouter(Search)));
