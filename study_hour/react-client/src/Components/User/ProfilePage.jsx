import React, {Component} from 'react';
import { URLProvider } from 'react-url';
import '../../styles/style.css'
import NavBar from './../HeaderComponent/NavBar'
import {Button, Paper} from '@material-ui/core'
import { connect } from "react-redux";
import Typography from "@material-ui/core/Typography";
import axios from "axios";
import * as profile_action from "../../actions/profilePage_action";
import FileUpload from "../FileUpload";


class ProfilePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fullname: '',
            city: '',
            bio: '',
            numComments: '',
            favorites: []
        };
        this.handleFavorite = this.handleFavorite.bind(this);
        this.handleEditProfile = this.handleEditProfile.bind(this);
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
    }

    handleFavorite() {
        this.props.dispatch(profile_action.listFavorite(this.props.match.params.id));
    }

    handleEditProfile() {
        this.props.dispatch(profile_action.editProfile());
    }
    imageUpload() {
        this.upload_ref.fileUploadProfile(localStorage.getItem('user_id'))
    }

    render() {
        let edit_profile;
        let upload = (<Paper style={{width: '40%', display: 'inline-block'}}>
            <Button id="submit-button"
                    onClick={this.imageUpload}>
                Upload Location Image
            </Button>
        </Paper>);
        if (this.props.match.params.id === localStorage.getItem('user_id')) {
            edit_profile = (
                <div className="edit button">
                    <Button onClick={this.handleEditProfile}
                            color="white">
                        Edit Profile
                    </Button>
                    <FileUpload ref={this.upload_ref}/>
                    {upload}
                </div>)
        }
        else {
            edit_profile = <div/>;
        }

        return (
                <div>
                    <Paper className='wallpaper-books-2'>
                        <NavBar/>
                        <Paper style={{padding: "2%", width:"50%", margin:"auto", paddingLeft: "5%", paddingRight: "5%", marginTop: "5%"}}>
                            <Typography variant="headline" style={{padding: "5%"}}>Name: {this.state.fullname}</Typography>
                            <Typography variant="headline" style={{padding: "5%"}}>City: {this.state.city}</Typography>
                            <Typography variant="headline" style={{padding: "5%"}}>About Me: {this.state.bio}</Typography>
                            <Typography variant="headline" style={{padding: "5%"}}>Karma: {Math.round(Math.PI * (parseInt(this.state.numComments) + 1) * 100)/100}</Typography>
                            <div className="favorite button">
                                <Button variant="contained"
                                        onClick={this.handleFavorite}
                                        color="white">
                                    Favorite Locations
                                </Button>
                            </div>
                            {edit_profile}
                        </Paper>
                        <div style={{height: '100px'}}></div>
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
