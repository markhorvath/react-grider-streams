import React from 'react';

const StreamEdit = (props) => {
    //props has a match.params.id value because that's the variable name in the App.js Route component path attr
    console.log('streamEdit props: ', props);
    return (
        <div>StreamEdit</div>
    )
}

export default StreamEdit;