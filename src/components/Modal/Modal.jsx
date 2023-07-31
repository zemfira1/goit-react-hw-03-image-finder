import { Component } from 'react';
import { Overlay, ModalEl, Image } from './Modal.styled';

export class Modal extends Component  {
    componentDidMount() {
        window.addEventListener('keydown', this.keyDown)
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.keyDown)
    }

    keyDown = event => {
        if (event.code === "Escape") {
            this.props.onClose();
        }
    };

    backdropClick = event => {
        if (event.currentTarget === event.target) {
            this.props.onClose();
        }
    }

    render() {
        return (
            <Overlay onClick={this.backdropClick}>
                <ModalEl>
                   <Image src={this.props.largeImageURL} alt={this.props.tag} />
                </ModalEl>
            </Overlay>
        );
    }   
}

