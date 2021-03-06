import React from 'react';
import YouTube from 'react-youtube';
import Button from '@material-ui/core/Button';
import PlayArrow from '@material-ui/icons/PlayArrow';
import Stop from '@material-ui/icons/Stop';
import LinearProgress from '@material-ui/core/LinearProgress';
import { withStyles } from '@material-ui/core/styles';

const styles = {
    root: {
        flexGrow: 1,
    },
};



class BackgroundMusic extends React.Component {
    constructor(props) {
        super(props);
        this.myRef = React.createRef()
        this.handleClick = this.handleClick.bind(this)
        this.state = {playing: false}
    }

    handleClick() {
        if (this.state.playing) {
            this.myRef.current.internalPlayer.pauseVideo();
            this.setState({playing: false})
        } else {
            this.myRef.current.internalPlayer.playVideo();
            this.setState({playing: true})
        }

    }
    render() {
        const { classes } = this.props;
        const opts = {
            height: '0',
            width: '0',
            playerVars: { // https://developers.google.com/youtube/player_parameters
                autoplay: 0
            },
        };

        if (!this.state.playing) {
            var button = <PlayArrow/>;
            var animation = <div></div>;
        }
        else {
            var button = <Stop/>;
            var animation = (
                <div className="loading-div">
                    <LinearProgress variant="query"/>
                </div>
            );
        }

        return (
            <div>
                <YouTube
                    ref={this.myRef}
                    videoId="hHW1oY26kxQ"
                    opts={opts}
                    onReady={this._onReady}
                />
                <Button variant="fab" color="primary" aria-label="Add" onClick={this.handleClick}>
                    {button}
                </Button>
                <br/>
                {animation}
            </div>
        );
    }
}

export default withStyles(styles)(BackgroundMusic);