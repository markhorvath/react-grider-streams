import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import StreamCreate from './streams/StreamCreate';
import StreamEdit from './streams/StreamEdit';
import StreamShow from './streams/StreamShow';
import StreamDelete from './streams/StreamDelete';
import StreamList from './streams/StreamList';
import Header from './Header';



const PageTwo = () => {
    return (
        <div>
        <div>PageTwo</div>

        <button>Click me</button>
        <Link to="/">Navigate to PageOne</Link>
        </div>
    );
}

const App = () => {
    return (

        <div className="ui container">
            <BrowserRouter>
            <Header />
                <Route path="/" exact component={StreamList} />
                <Route path="/streams/new" exact component={StreamCreate} />
                <Route path="/streams/edit" exact component={StreamEdit} />
                <Route path="/streams/delete" exact component={StreamDelete} />
                <Route path="/streams/show" exact component={StreamShow} />
            </BrowserRouter>
        </div>
    );
}

export default App;