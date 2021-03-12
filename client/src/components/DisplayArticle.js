import { Modal, Button } from "react-bootstrap";
import dayjs from "dayjs";
import ErrorBoundary from "./ErrorBoundary";

const DisplayArticle = (props) => {
  //   console.log(props.article);

  const handleHide = () => {
    props.setShowArticle(false);
    props.SetIsDataback(false);
    props.setArticle("");
  };

  const GetTitle = () => {
    const parser = new DOMParser();
    const html = parser.parseFromString(props.article, "text/html");
    const title = html.getElementsByClassName("headline")[0].innerHTML;
    // console.log(title);
    return (
      <>
        <h2>
          <a
            href={props.articleLink}
            rel="noreferrer nofollow noopener"
            target="_blank"
          >
            {title}
          </a>
        </h2>
      </>
    );
  };

  const GetTime = () => {
    const parser = new DOMParser();
    const html = parser.parseFromString(props.article, "text/html");
    const timePub = html
      .getElementsByTagName("time")[0]
      .getAttribute("datetime");
    const timePubFormatted = dayjs(timePub).format("DD MMM YYYY hh:mma");
    const timeMod = html
      .getElementsByTagName("time")[1]
      .getAttribute("datetime");
    const timeModFormatted = dayjs(timeMod).format("DD MMM YYYY hh:mma");
    // console.log(timePubFormatted);
    // console.log(timeModFormatted);

    return (
      <>
        <p>
          Published: {timePubFormatted} <br /> Modified: {timeModFormatted}
        </p>
      </>
    );
  };

  const GetText = () => {
    const parser = new DOMParser();
    const html = parser.parseFromString(props.article, "text/html");
    const p = html.getElementsByClassName("odd")[0].getElementsByTagName("p");
    // console.log(p);

    const paragraph = [];
    for (let i = 0; i < p.length; i++) {
      //   console.log(p[i].innerHTML);
      paragraph.push(<p key={i}>{p[i].textContent}</p>);
    }
    // console.log(paragraph);
    return paragraph;
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
          <Modal.Title id="contained-modal-title-vcenter"></Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ height: "75vh", overflow: "auto" }}>
          <ErrorBoundary>
            <GetTitle />
          </ErrorBoundary>

          <ErrorBoundary>
            <GetTime />
          </ErrorBoundary>
          <br />
          <ErrorBoundary>
            <GetText />
          </ErrorBoundary>
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
