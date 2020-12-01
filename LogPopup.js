import React, { Component } from 'react';
import {Modal, Button, Row, Col, Form} from 'react-bootstrap';

const popUp_Style = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#FFF',
    padding: '50px',
    zIndex: 1000
}

const olay_Style = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0, .7)',
    zIndex: 1000

}

export default function LogPopup({open, children, onClose})  {
    if(!open) return null

    return (
        <>
            <div style={olay_Style}/>
            <div style = {popUp_Style}>
                <button onClick={onClose}> Close </button>
                {children}
            </div>

        </>
    )
}