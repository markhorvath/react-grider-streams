import React from 'react';
import { connect } from 'react-redux';
import { fetchStreams } from '../../actions';

class StreamList extends React.Component {
    componentDidMount() {
        this.props.fetchStreams();
    }

    renderList() {
        return this.props.streams.map(stream => {
            return (
                <div className="item" key={stream.id}>
                    <i className="large middle aligned icon camera" />
                    <div className="content">
                    {stream.title}
    {                    <div className="description">
                            {stream.description}
                        </div>}
                    </div>
                </div>
            );
        });
    }

    render() {
        // console.log('this.props.streams: ', this.props.streams);
        return (
            <div>
            <h2>Streams</h2>
            <div className="ui celled list">
            {this.renderList()}
            </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    console.log('this is state.streams in mapState from StreamList: ', state.streams);

    //Object.values is built-in JS that takes an object as an argument and turns
    //all the values in the obj to an array
    return { streams: Object.values(state.streams) };
}

export default connect(mapStateToProps, { fetchStreams })(StreamList);