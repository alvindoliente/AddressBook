import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

interface Props {
    title : string;
    body : string;
    showModal: boolean;
    closeButtonText: string;
    saveButtonText: string;
    onConfirm: () => void;
    onClose: () => void;
  }

function DeleteConfirmation(props : Props) {
    return (
     <>
      <Modal show={props.showModal} onHide={() => {props.onClose()}}>
        <Modal.Header closeButton>
          <Modal.Title>{props.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{props.body}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => {props.onClose()}}>
            {props.closeButtonText}
          </Button>
          <Button variant="danger" onClick={() => {props.onConfirm()}}>
            {props.saveButtonText}
          </Button>
        </Modal.Footer>
      </Modal>
     </>
    )
}

export default DeleteConfirmation;