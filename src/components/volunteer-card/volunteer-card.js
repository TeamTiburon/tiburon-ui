
import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';

import { withNamespaces } from "react-i18next";

const styles = theme => ({
    root: {
        margin: 8,
        width: 'calc(50% - 16px)'
    },
    cardDetail: {
        width: '100%'
    },
    media: {
        height: 100,
        width: '100%'
    },
    name: {
        fontSize: 16,
        display: 'flex',
        alignItems: 'baseline'
    },
    location: {
        display: 'flex',
        alignItems: 'center'
    },
    locationText: {
        marginLeft: 4
    },
    rating: {
        marginBottom: 8
    },
    ratingStar: {
        width: 20,
        height: 20
    },
    online: {
        display: 'inline-block',
        width: 12,
        height: 12,
        backgroundColor: 'green',
        borderRadius: '100%',
        marginRight: 4
    },
    offline: {
        display: 'inline-block',
        width: 12,
        height: 12,
        backgroundColor: 'gray',
        borderRadius: '100%',
        marginRight: 4
    }
});

class VolunteerCard extends Component {

    constructor(props) {
        super(props);
        this.volunteer = this.props.volunteer;
        this.online = this.props.online;
        this.viewVolunteerDetails = this.viewVolunteerDetails.bind(this);
    }

    onComponentDidMount() {
    }

    viewVolunteerDetails() {
        this.props.history.push('/profile/' + this.volunteer.volunteer_id);
    }


    render() {
        const { classes, t } = this.props;

        var stars = [];
        var emptyStars = [];

        for(var i = 0; i < this.volunteer.rating; i++) {
            stars.push(<StarIcon key={i} className={classes.ratingStar}/>);
        }

        for(var i = 0; i < 5 - this.volunteer.rating; i++) {
            emptyStars.push(<StarBorderIcon key={i} className={classes.ratingStar}/>);
        }

        return (
            <Card className={classes.root} onClick={this.viewVolunteerDetails}>
              <CardActionArea className={classes.cardDetail}>
                <CardMedia className={classes.media}
                  image={this.volunteer.profile_picture}
                  title={t('volunteer_pic')}
                />
                <CardContent>
                  <Typography gutterBottom className={classes.name}>
                    <span className={this.online ? classes.online : classes.offline}></span>
                    {this.volunteer.name}
                  </Typography>
                  <div className={classes.rating}>
                    {stars}
                    {emptyStars}
                  </div>
                  <div className={classes.location}>
                    <LocationOnIcon/>
                    <span className={classes.locationText}>{this.volunteer.location}</span>
                  </div>
                </CardContent>
              </CardActionArea>
            </Card>
        );
    }
}

export default withNamespaces()(withStyles(styles)(withRouter(VolunteerCard)));
