
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
    }
});

class ResourceCard extends Component {

    constructor(props) {
        super(props);
        console.log(this.props)

        this.volunteer = this.props.volunteer;
        // this.viewResourceDetails = this.viewResourceDetails.bind(this);
    }

    onComponentDidMount() {
    }

    // viewResourceDetails() {
    //     this.props.history.push('/profile/' + this.volunteer.volunteer_id);
    // }


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
            <Card className={classes.root} onClick={()=> window.open(this.volunteer.url, "_blank")}>
              <CardActionArea className={classes.cardDetail} >
                <CardMedia className={classes.media}
                  image={this.volunteer.profile_picture}
                  title={t('volunteer_pic')}
                />
                <CardContent>
                  <Typography gutterBottom variant="h6">
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
                  <div>
                      <br />
                    <span className={classes.locationText}>{this.volunteer.phone}</span>
                  </div>
                </CardContent>
              </CardActionArea>
            </Card>
        );
    }
}

export default withNamespaces()(withStyles(styles)(withRouter(ResourceCard)));
