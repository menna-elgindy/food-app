import React from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import DeleteImg from '../../../../assets/imgs/delete-img.svg'

export default function DeleteConfirmation({deleteItem,deleteFun,handleClose,show}) {

  return (
    <>
        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
        </Modal.Header>
        <Modal.Body style={{borderTop:'none'}}>
            <div className='text-center'>
            <img src={DeleteImg}/>
            <h5 className='my-3' style={{color:'#494949'}}>Delete This {deleteItem} ?</h5>
            <p className='text-muted'>are you sure you want to delete this item ? if you are sure just click on delete it</p>
            </div>
        </Modal.Body>
        <Modal.Footer>
            <Button className="btn btn-outline-danger"variant='button' onClick={deleteFun}>
            Delete this item
            </Button>
        </Modal.Footer>
        </Modal>
     </>
  )
}
