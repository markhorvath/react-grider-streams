import React from 'react';
import { connect } from 'react-redux';
import { fetchStream, editStream } from '../../actions';
import StreamForm from './StreamForm';

//we turned this into class-based to add componentDidMount and call fetchStream
//because the component needed to be able to pull that info on it's own
class StreamEdit extends React.Component {
    componentDidMount() {
        this.props.fetchStream(this.props.match.params.id);
    }

    onSubmit = (formValues) => {
        this.props.editStream(this.props.match.params.id, formValues);
    }

    //props has a match.params.id value because that's the variable name in the App.js Route component path attr
    render() {
        console.log('streamEdit props: ', this.props);
        if(!this.props.stream) {
                return <div>Loading...</div>;
        }
        //initialValues is special prop with redux forms i think*
        //we are using title and description property names because they're in the StreamForm Field Components
        //initialValues={{ title: 'EDIT ME', description: 'Change me too'}}

        //this is more descructuring, he used lodash _.pick methodd in the course like so:
        //initialValues={_.pick(this.props.stream, 'title', 'description')}
        const { title, description } = this.props.stream;
        return (
            <div>
            <h3>Edit a Stream</h3>
            <StreamForm
                initialValues={{ title: title, description: description }}
                onSubmit={this.onSubmit} />
            </div>
        )
    }
}

//ownProps is the 2nd argument that gets passed into mapStateToProps and is a reference to the props object of the component
const mapStateToProps = (state, ownProps) => {
    // console.log(ownProps);
    // console.log(state.streams);
    return { stream: state.streams[ownProps.match.params.id] };
}

export default connect(mapStateToProps, { fetchStream, editStream })(StreamEdit);