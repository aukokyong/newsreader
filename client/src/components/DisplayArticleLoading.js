import { Modal, Button, Spinner } from "react-bootstrap";

const DisplayArticle = (props) => {
  //   console.log(props.article);

  const handleHide = () => {
    props.setShowArticle(false);
  };

  return (
    <>
      <Modal
        show={props.showArticle}
        onHide={(e) => {
          handleHide(e);
        }}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        animation={false}
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {/* Modal heading */}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body
          style={{
            height: "75vh",
            overflow: "auto",
            margin: "0 auto",
          }}
          className="d-flex justify-content-center"
        >
          <div className="text-center align-self-center">
            <Spinner animation="border" role="status" />
            <p>Loading...</p>
          </div>
        </Modal.Body>
        <Modal.Footer className="justify-content-center">
          <Button
            onClick={(e) => {
              handleHide(e);
            }}
            variant="danger"
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DisplayArticle;
