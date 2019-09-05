import React from 'react'
import {Modal, Button} from "rsuite";
import ABOUT_TEXT from './AboutText'
import './AboutModal.css'

export default class AboutModal extends React.Component {

    render() {
        const show = this.props.show;
        let onHide = this.props.toggleAbout;

        return (
                <span>
                <Modal.Header>
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
                    <p>
                        (c) כל הזכויות שמורות למיכל אריאלי
                    </p>
                </Modal.Footer>
                </span>
        );
    }
}