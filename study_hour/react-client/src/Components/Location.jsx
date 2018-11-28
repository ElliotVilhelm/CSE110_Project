import React, { Component } from "react";
import {
    AppBar,
    Paper,
    Grid,
    Card,
    CardContent,
    Checkbox,
    Typography,
} from "@material-ui/core";
import geisel from '../images/geisel.jpg';
import axios from "axios/index";
import CommentTable from "./CommentTable";
import NavBar from './HeaderComponent/NavBar';
import AddCommentModal from "./AddCommentModal";
import Button from "@material-ui/core/Button/Button";
import SimpleSlider from './Slider';

var images = [
    <img
        className="img-slider"
        title="geisel"
        src={geisel}
        alt="Icon"
    />,
    <img
        className="img-slider"
        title="geisel"
        src={geisel}
        alt="Icon"
    />,
];

const content = {
    comments: [{ name: "Ana", rating: 2, text: "Noisy place" }, { name: "Bob", rating: 3, text: "It's ok" }]
};
//local test location page
let location = {
    name: "Giesel",
    address: "123 Xiaofan Road",
    outlet: false,
    wifi: true,
    quitness: 3,
    like: false,
    //level: 1-4
    openHour: {
    }
};

export default class Location extends Component {
    constructor(props) {
        super(props);
<<<<<<< HEAD
        this.state = {location: {like:false},}
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(){
        this.setState({location:{like: !this.state.location.like}});
        // axios({
        //     method: 'post',
        //     url: `/`,
        //     data:,
        //     config: { headers: { }},
        // }).then(response => {
        //     console.log("database got handleSubmit for like button", response);
        //
        // }).catch(function (response) {
        //     console.log("Error",response);
        // });
=======
        this.state = {location: {}}
        this.handleSubmit=this.handleSubmit.bind(this);
>>>>>>> a03712f1ff8d048507db227a1e51f43b5a44cbc4
    }
    componentDidMount() {
        console.log("going in")
        let id = this.props.match.params.id;
        let self = this;
        axios({
            method: 'get',
            url: `/api/Location/${id}`,
            config: { headers: {'Content-Type': 'multipart/form-data' }}
        }).then(response => {
            console.log("response location/n", response.data.dbresponse);
            response = response.data.dbresponse[0];
            self.setState({location:
                    {
                        address: response.address,
                        internet: response.internet,
                        name: response.name,
                        outlet: response.outlet,
                        close_time: response.close_time,
                        open_time: response.open_time,
                        noise_level: response.noise_level,
                        id: response.id,
                        like: response.like
                    }
            })

        })
            .catch(function (response) {
                console.log("Error",response);
            });
    }
    favoriteOnClick(){
        axios({
            method: 'post',
            url: '/api/addFavorite',
            data:{location_id: this.state.location.id ,user_id: localStorage.getItem('user_id')},
            config: { headers: {'Content-Type': 'multipart/form-data' }}
        }).then(response =>{
            console.log('success add favorites');
        })
            .catch(function (response) {
                console.log("Error",response);
            });
    }
    handleSubmit(event){
       this.favoriteOnClick();
    }

    render() {

        // return( <h1>{this.props.match.params.id}</h1>)
        console.log("state:", this.state);
        return (
            <Paper className='wallpaper-books'>
                <NavBar/>
                <Paper style={{paddingTop: '30px', paddingBottom: '100px', width: '70%', background: 'rgba(0,0,0,0.5)', margin: 'auto'}}>
                    <div className="location-div">
                        <Grid
                            container
                            spacing={24}
                            direction="row"
                            alignItems="center"
                            justify="center"
                        >
<<<<<<< HEAD
                            <Typography variant="display4" style={{fontWeight: 500}}>{this.state.location.name}</Typography>
                            <Grid item sm>
                                {/*<Card>*/}
                                <img
                                    style={{width: "auto", height: "auto"}}
                                    title="geisel"
                                    src={geisel}
                                    alt="Icon"
                                />
                                <br/>
                                <Button id="submit-button"
                                        variant="contained"
                                        className={this.props.button}
                                        onClick={this.handleSubmit}>
                                    { this.state.location.like? '♥ Like ♥' : '♡ Like ♡'}
                                </Button>
                                {/*</Card>*/}
                            </Grid>
                        </Grid>
                        <Paper style={{width: '50%', padding: '20px'}}>
                            <Grid item sm style={{float: 'left'}}>
                                <Typography style={{ color: "white" }}>
                                    Outlet
                                    <Checkbox
                                        value="checkedG"
                                        disabled
                                        checked= {true}
                                        style={{ color: this.state.location.outlet? "#00BFFF" : "white" }}
                                    />
                                </Typography>
                                <Typography  style={{ color: "white" }}>
                                    Wifi
                                    <Checkbox
                                        value="checkedG"
                                        disabled
                                        checked={this,state.location.wifi}
                                        style={{ color: location.wifi? "black" : "white" }}
                                    />
                                </Typography>
=======
                            <Grid container
                                  spacing={24}
                                  direction="column"
                                  alignItems="center"
                                  justify="center"

                            >
                                <Typography variant="display4" style={{fontWeight: 500}}>{this.state.location.name}</Typography>
                                <Grid item sm>
                                    {/*<Card>*/}
                                    <SimpleSlider images={images}/>
                                    <br/>
                                    <Button id="submit-button"
                                            variant="contained"
                                            className={this.props.button}
                                            onClick={this.handleSubmit}>
                                        ♡ Like ♡
                                    </Button>
                                    {/*</Card>*/}
                                </Grid>
                            </Grid>
                            <Paper style={{width: '50%', padding: '20px'}}>
                                <Grid item sm style={{float: 'left'}}>
                                    <Typography style={{ color: "white" }}>
                                        Outlet
                                        <Checkbox
                                            value="checkedG"
                                            disabled
                                            checked={!!this.state.location.outlet}
                                            style={{ color: this.state.location.outlet? "#00BFFF" : "white" }}
                                        />
                                    </Typography>
                                    <Typography  style={{ color: "white" }}>
                                        Wifi
                                        <Checkbox
                                            value="checkedG"
                                            disabled
                                            checked={this.state.location.wifi}
                                            style={{ color: location.wifi? "#00BFFF" : "white" }}
                                        />
                                    </Typography>
>>>>>>> a03712f1ff8d048507db227a1e51f43b5a44cbc4


                                    <Typography  style={{ verticalAlign: "baseline", color: "white" }}>
                                        Quitness
                                        <input
                                            style={{ position: "relative", top: 7, marginLeft: 10, width: 70, display: "inline" }}
                                            type="range"
                                            step="1"
                                            min="1"
                                            max="4"
                                            value={this.state.location.quitness}
                                        />
                                    </Typography>
                                </Grid>
                                <Grid item sm>
                                    <CardContent style={{padding: '10px'}}>
                                        <table className="table-open">
                                            <th>
                                                <Typography variant="title" style={{ color: "white" }}>
                                                    Open Hours:
                                                </Typography>
                                            </th>
                                            <tr><Typography variant="caption" style={{ color: "white" }}>Monday: 8:00 am - 5:30 pm</Typography></tr>
                                            <tr><Typography variant="caption" style={{ color: "white" }}>Tuesday: 8:00 am - 5:30 pm</Typography></tr>
                                            <tr><Typography variant="caption" style={{ color: "white" }}>Thursday: 8:00 am - 5:30 pm</Typography></tr>
                                            <tr><Typography variant="caption" style={{ color: "white" }}>Friday: 8:00 am - 5:30 pm</Typography></tr>
                                        </table>
                                    </CardContent>
                                </Grid>
                            </Paper>
                            <Grid container
                                  spacing={24}
                                  direction="column"
                                  alignItems="center"
                                  justify="center"
                            >
                                <CommentTable location_id={this.props.match.params.id}/>
                            </Grid>
                        </Grid>
                    </div>
                </Paper>
            </Paper>
        );
    }
}
