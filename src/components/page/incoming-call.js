import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Phone from '@material-ui/icons/Phone';
import Grid from '@material-ui/core/Grid';
import { withRouter } from "react-router-dom";
import Button from '@material-ui/core/Button';
import queryString from 'query-string';

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


class IncomingCall extends Component {

    constructor(props) {
        super(props);
        this.state = {

        }

        this.sendMessageToUser = this.sendMessageToUser.bind(this);
        this.answer = this.answer.bind(this);

        this.parseQuery(queryString.parse(this.props.location.search));
    }

    parseQuery(values) {
        this.roomName = values.roomName;
        this.userName = values.userName;

        fetch(`http://35.184.88.156:8080/token`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user: '6'
            })
        }).then((response) => response.json())
        .then((data) => {
            this.token = data.token;
            this.identity = data.identity;
        });
    }

    componentDidMount() {

    }

    sendMessageToUser(event) {
        console.log("send message")
        this.props.history.push("/sendMessage")
    }

    answer(event) {
        console.log("answer")
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

        return (<div className={classes.loadingSpinner}>

            <Phone style={{ fontSize: 310, zIndex: 9, color: "#fff", display: 'block' }} color="primary"></Phone>

            <h4 style={{ color: "#fff" }}>
                {this.userName} is calling
                </h4>
            <div>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={this.answer}
                        className={classes.button}>
                        Answer
                                </Button>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={this.sendMessageToUser}
                        className={classes.button}>
                        Send Message
                                </Button>
            </div>
        </div>);
    }
}
export default withStyles(styles)(withRouter(IncomingCall));

//export default withStyles(styles)(withRouter(Search));
