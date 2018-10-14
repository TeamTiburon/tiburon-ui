import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
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
    }
});

class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.submit = this.submit.bind(this);
        this.getLocalInformation = this.getLocalInformation.bind(this);
        this.getLiveAssistance = this.getLiveAssistance.bind(this);
    }

    componentDidMount() {
        var userJson = JSON.parse(localStorage.getItem('user'));
        console.log("userJson, ", userJson)
        this.setState({
            user: userJson
        })
        

    }

    handleChange(event) {
       // this.setState({ [event.target.name]: event.target.value });
    }
    
    getLiveAssistance(event) {
        this.props.history.push('/search')
        
    }

    getLocalInformation(event) {
        this.props.history.push('/localInformation')
    }

    submit(event) {
        // localStorage.setItem('user', JSON.stringify(this.state));
        // this.props.history.push('/dashboard')
        console.log("submit")
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
                <h1 className={classes.header}>Hello {this.state.user.displayName}!</h1>


                <h4 className={classes.subHeader}> I need...</h4>


                    <div className={classes.root}>
                        <Grid container spacing={8}>
                            
                            <Grid item xs={12} className={classes.gridy}>
                                <Button 
                                variant="contained"
                                 color="primary" 
                                 onClick={this.getLiveAssistance} 
                                 className={classes.button}>
                                    Live Assistance
                                </Button>
                            </Grid>
                            <Grid item xs={12} className={classes.gridy}>
                                <Button
                                 variant="contained" 
                                 color="primary" 
                                 onClick={this.getLocalInformation} 
                                 className={classes.button}>
                                    Local Information
                                </Button>
                            </Grid>
                        </Grid>
                    </div>

            </div>
        );
    }
}

export default withStyles(styles)(Dashboard);