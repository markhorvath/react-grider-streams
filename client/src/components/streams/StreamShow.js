import React from 'react';
import { connect } from 'react-redux';
import { fetchStream } from '../../actions';
import flv from 'flv.js';

class StreamShow extends React.Component {
    constructor(props) {
        super(props);

        this.videoRef = React.createRef();
    }

    //when component first renders, attempt to buildPlayer() (but it won't happen 1st time)
    componentDidMount() {
        // console.log('this.props: ', this.props);
        const { id } = this.props.match.params;
        this.props.fetchStream(id);
        this.buildPlayer();
    }

    //if component fetchStream successfully at some point and the component rerenders, buildPlayer again
    componentDidUpdate() {
        this.buildPlayer();
    }

    //basically if at any point the component renders/rerenders, we attempt to build the player
    //but if we've already built it (already have this.player) OR we dont have the stream, then we don't build it
    buildPlayer() {
        if(this.player || !this.props.stream) {
            return;
        };

        const { id } = this.props.match.params;
        this.player = flv.createPlayer({
            type: 'flv',
            url: `http://localhost:8000/live/${id}.flv`
        });
        this.player.attachMediaElement(this.videoRef.current);
        this.player.load();
    }

    render() {
        if(!this.props.stream) {
            return <div>Loading...</div>
        }
        const { title, description } = this.props.stream
        //we can just have the name of the prop 'controls' as the attr instead of setting it to {true} ONLY when a prop's value is true
        return (
            <div>
                <video ref={this.videoRef} style={{ width: '100%' }} controls={true} />
                <h1>{title}</h1>
                <h1>{description}</h1>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return { stream: state.streams[ownProps.match.params.id] };
}

export default connect(mapStateToProps, {fetchStream})(StreamShow);