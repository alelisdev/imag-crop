import React, {useState} from "react";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Modal, ModalBody, ModalHeader, CloseButton } from 'reactstrap';
import ImageCroper from "./components/img-crop";

function App() {

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className="App">
      <Button color="success mt-5" onClick={handleShow} >Image Crop</Button>
      <Modal isOpen={show} fullscreen={true} toggle={() => setShow(false)}>
        <ModalHeader>
          <CloseButton
            className="btn btn-circle btn-sm transition-base p-0"
            onClick={handleClose}
          />
        </ModalHeader>
        <ModalBody>
          <ImageCroper />
        </ModalBody>
      </Modal>
    </div>
  );
}

export default App;
