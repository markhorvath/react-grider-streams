import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchStreams } from '../../actions';

class StreamList extends React.Component {
    componentDidMount() {
        this.props.fetchStreams();
    }

    //render edit/delete btns for user-created streams
    renderAdmin(stream) {
        if(stream.userId === this.props.currentUserId) {
            return (
                <div className="right floated content">
                    <button className="ui button primary">Edit</button>
                    <button className="ui button negative">Delete</button>
                </div>
            )
        }
    }

    renderList() {
        return this.props.streams.map(stream => {
            return (
                <div className="item" key={stream.id}>
                { this.renderAdmin(stream) }
                    <i className="large middle aligned icon camera" />
                    <div className="content">
                    {stream.title}
                        <div className="description">
                            {stream.description}
                        </div>
                    </div>
                </div>
            );
        });
    }

    renderCreate() {
        if(this.props.isSignedIn) {
            return (
                <div style={{ textAlign: 'right' }}>
                    <Link to="/streams/new" className="ui primary button">
                        Create Stream
                    </Link>
                </div>
            )
        }
    }

    render() {
        // console.log('this.props.streams: ', this.props.streams);
        return (
            <div>
            <h2>Streams</h2>
            <div className="ui celled list">
            {this.renderList()}
            {this.renderCreate()}
            </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    console.log('this is state.streams in mapState from StreamList: ', state.streams);

    //Object.values is built-in JS that takes an object as an argument and turns
    //all the values in the obj to an array
    return {
        streams: Object.values(state.streams),
        currentUserId: state.auth.userId,
        isSignedIn: state.auth.isSignedIn
     };
}

export default connect(mapStateToProps, { fetchStreams })(StreamList);