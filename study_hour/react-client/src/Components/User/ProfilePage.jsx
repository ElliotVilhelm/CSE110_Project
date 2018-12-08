import React, {Component} from 'react';
import { URLProvider } from 'react-url';
import '../../styles/style.css'
import NavBar from './../HeaderComponent/NavBar'
import {Button, Paper} from '@material-ui/core'
import { connect } from "react-redux";
import Typography from "@material-ui/core/Typography";
import axios from "axios";
import * as profile_action from "../../actions/profilePage_action";
import Footer from "../FooterComponent/Footer";
import Grid from "@material-ui/core/Grid/Grid";
import Avatar from "@material-ui/core/Avatar/Avatar";
import FileUpload from "../FileUpload";
import profileImage from "../../images/default.jpg"


class ProfilePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fullname: '',
            city: '',
            bio: '',
            numComments: '',
            favorites: [],
            url: profileImage
        };
        this.handleFavorite = this.handleFavorite.bind(this);
        this.handleEditProfile = this.handleEditProfile.bind(this);
        this.imageUpload = this.imageUpload.bind(this);
        this.upload_ref = React.createRef();
    }
    componentDidMount (){
        axios({
            method: 'post',
            url: `/api/Profile`,
            data: {id: this.props.match.params.id},
            config: { headers: {'Content-Type': 'application/json' }}
        }).then(response => {
            this.setState({
                fullname: response.data.dbresponse[0].fullname,
                city: response.data.dbresponse[0].city,
                bio: response.data.dbresponse[0].bio
            });
        }).catch(function (response) {
            console.log("Error",response);
        });
        axios({
            method: 'post',
            url: `/api/Profile/commentCounts`,
            data: {id: this.props.match.params.id},
            config: { headers: {'Content-Type': 'application/json' }}
        }).then(response => {
            this.setState({
                numComments: response.data.dbresponse[0].numcomment
            });
        }).catch(function (response) {
            console.log("Error",response);
        });

        this.fetchImage();
    }

    fetchImage() {
        axios({
            method: 'get',
            url: '/api/profile_image/',
            params: {user_id:  this.props.match.params.id},
            data: null,
            config: {headers: {'Content-Type': 'application/json'}},
        }).then(response => {
            console.log("response for getting profile image", response.data);
            if (response.data.length === 0)
                return;
            axios({
                method: 'post',
                url: `/api/images`,
                config: { headers: {'Content-Type': 'multipart/form-data' }},
                data: {code: response.data[0].s3code}
            }).then(response => {
                console.log("da url", response.data.url);
                this.setState({url: response.data.url})
            }).catch(function (response) {
                console.log("Error",response);
            });
        });
    }

    handleFavorite() {
        this.props.dispatch(profile_action.listFavorite(this.props.match.params.id));
    }

    handleEditProfile() {
        this.props.dispatch(profile_action.editProfile());
    }

    imageUpload() {
        this.upload_ref.current.fileUploadProfile(this.props.match.params.id).then(() => {
                this.fetchImage();
            }
        );
    }


    render() {
        let edit_profile;
        let upload = (
            <Paper style={{width: '100%', textAlign: 'center', display: 'inline-block'}}>
                <Button id="submit-button"
                        onClick={this.imageUpload}>
                    Upload Profile Photo
                </Button>
            </Paper>);
        if (this.props.match.params.id === localStorage.getItem('user_id')) {
            edit_profile = (
                <Grid item>
                    <Paper style={{width: '100%', textAlign: 'center', display: 'inline-block'}}>
                    <Button onClick={this.handleEditProfile}
                            color="white">
                        Edit Profile
                    </Button>
                    </Paper>
                    <FileUpload multi={false} ref={this.upload_ref}/>
                    {upload}
                </Grid>)
        }
        else {
            edit_profile = <Grid/>;
        }

        return (
            <div>
                <Paper className='wallpaper-books-2'>
                    <NavBar/>
                    <Paper style={{padding: "2%", width:"70%", margin:"auto", paddingLeft: "5%", paddingRight: "5%", marginTop: "5%"}}>
                        <Grid container spacing={16}>
                            <Avatar style={{backgroundColor: "grey", borderRadius: 0, margin: 10, width: 400, height: 400}}>
                                <img width='95%' height='95%' src={this.state.url} />
                            </Avatar>
                            <Grid item xs={12} sm container>
                                <Grid item xs container direction="column" spacint={16}>
                                    <Grid item xs>
                                        <Typography gutterBottom variant="headline" style={{fontSize: 35, fontWeight: 400}}>Name: {this.state.fullname}</Typography>
                                        <Typography gutterBottom variant="display2" style={{fontSize: 25, fontWeight: 300}}>City: {this.state.city}</Typography>
                                        <Typography gutterBottom variant="display2" style={{fontSize: 25, fontWeight: 300}}>About Me: {this.state.bio}</Typography>
                                        <Typography gutterBottom variant="display2" style={{fontSize: 25, fontWeight: 300}}>Karma: {Math.round(Math.PI * (parseInt(this.state.numComments) + 1) * 100)/100}</Typography>
                                    </Grid>
                                    <Grid item>
                                        <Paper style={{width: '100%', textAlign: 'center', display: 'inline-block'}}>
                                            <Button
                                                onClick={this.handleFavorite}
                                            >
                                                💕 Favorite Locations 💕
                                            </Button>
                                        </Paper>
                                    </Grid>
                                </Grid>
                            </Grid>
                            {edit_profile}
                        </Grid>
                    </Paper>
                    <div style={{height: '300px'}}></div>
                    <Footer/>
                </Paper>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        authenticated: state.auth.authenticated
    };
}

export default connect(mapStateToProps)(ProfilePage);
