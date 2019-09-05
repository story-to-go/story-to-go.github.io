import React from 'react'
import {Modal} from "rsuite";
import ABOUT_TEXT from './AboutText'
import './AboutModal.css'

export default class AboutModal extends React.Component {

    render() {
        return (
                <span>
                <Modal.Header>
                    <br/>
                    <Modal.Title className={"aboutTitle"}>אודות</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p className={'aboutText'}>
                        {ABOUT_TEXT.split('\n').map(function(item, key) {
                            return (
                                <span key={key}>
                                {item}
                                    <br/>
                            </span>
                            )
                        })}
                    </p>
                </Modal.Body>
                <Modal.Footer>
                    <p className={"withFont"}>
                        (c) כל הזכויות שמורות למיכל אריאלי
                    </p>
                </Modal.Footer>
                </span>
        );
    }
}