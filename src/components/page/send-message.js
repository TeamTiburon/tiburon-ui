import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Phone from '@material-ui/icons/Phone';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';


const styles = theme => ({
    root: {
        padding: 24
    },
    header: {
        textAlign: 'left',
        fontSize: 48,
        fontWeight: 400,
        marginBottom: -16,

        marginLeft: 25
    },
    subHeader: {
        textAlign: 'left',
        fontSize: 24,
        marginLeft: 25,
        fontWeight: 200,
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
    },
    loadingSpinner: {
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,

        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: 'column',

        height: "100%",
        width: "100%",
        background: "rgba(0, 0, 0, 0.75)",
        zIndex: 8,
    }
});


class SendMessage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            message: ""
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
        console.log("submit: ", this.state)
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
        const { classes } = this.props;

        return (
            <div>

                <h4 className={classes.subHeader}> Send a message</h4>

                <form className={classes.container} noValidate autoComplete="off">


                    <div className={classes.root}>
                    <Grid container spacing={16}>

                        <Grid item className={classes.gridy}>
                            <TextField
                                id="message"
                                label="Enter your message here...."
                                placeholder="Placeholder"
                                multiline
                                margin="normal"
                                name="message"
                                fullWidth
                                onChange={this.handleChange}
                            />
                            </Grid>

                        </Grid>
                        <Grid item xs={12} className={classes.gridy}>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={this.submit}
                                className={classes.button}>
                                Send Message
                                </Button>
                        </Grid>
                    </div>
                </form>
            </div >
        );
    }
}

export default withStyles(styles)(SendMessage);