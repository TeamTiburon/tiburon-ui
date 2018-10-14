
import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from "react-router-dom";
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Flip from 'react-reveal/Flip';

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

class Splash extends Component {

    constructor(props) {
        super(props);

        this.submit = this.submit.bind(this);
    }


    onComponentDidMount() {
    }

    submit(event) {
        this.props.history.push('/register')
    }

    render() {

        const { classes, theme, t } = this.props;

        return (
            <div className={classes.root}>

                <Grid container spacing={24}>
                    <Grid item xs={12} className={classes.gridy}>
                        <Flip left>
                            <img alt="Tiburon" src="/img/tiburon.png" style={{maxWidth: 250, maxHeight: 200, margin: 'auto'}} />
                        </Flip>
                    </Grid>

                        <p style={{margin: 'auto'}}><em>{t('connect')}</em></p>

                    <Grid item xs={12} className={classes.gridy}>
                        <Button variant="contained" color="primary" onClick={this.submit} className={classes.button}>
                            {t('get_started')}
                        </Button>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default withStyles(styles)(withRouter(Splash));
