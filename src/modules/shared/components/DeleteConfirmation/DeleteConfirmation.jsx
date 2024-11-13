import React,{useState} from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import DeleteImg from '../../../../assets/imgs/delete-img.svg'

export default function DeleteConfirmation({deleteItem,deleteFun,toggleShow}) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = (id) => {
       toggleShow()
      }

  return (
    <>
        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
        </Modal.Header>
        <Modal.Body>
            <div className='text-center'>
            <img src={DeleteImg}/>
            <h5>Delete This {deleteItem} ?</h5>
            <p className='text-muted'>are you sure you want to delete this item ? if you are sure just click on delete it</p>
            </div>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="danger" onClick={deleteFun}>
            Delete this item
            </Button>
        </Modal.Footer>
        </Modal>
     </>
  )
}
