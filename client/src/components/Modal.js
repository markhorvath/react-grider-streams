import React from 'react';
import ReactDOM from 'react-dom';


const Modal = props => {
    return ReactDOM.createPortal(
        <div onClick={props.onDismiss} className="ui dimmer modals visible active">
        {/*e.stopPropagation() stops the history.push('/') from being called if a user
        clicks anywhere within the modal.  in javascript an event in a child gets filtered
        up the DOM so if you click anywhere inside the modal it'll tricker the onClick above*/}
            <div onClick={(e) => e.stopPropagation()} className="ui standard modal visible active">
            <div className="header">{props.title}</div>
            <div className="content">
                {props.content}
            </div>
            <div className="actions">
            {props.actions}
            </div>
            </div>
        </div>,
        document.querySelector('#modal')
    );
};

export default Modal;