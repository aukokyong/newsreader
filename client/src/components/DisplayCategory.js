import { Button, Container, Row } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";
import DisplayHeadline from "./DisplayHeadline.js";
import dayjs from "dayjs";

const DisplayMain = (props) => {
  //   console.log(props.category);

  const [headline, setHeadline] = useState("");
  const [isDataBack, setIsDataback] = useState(false);

  const now = dayjs().format("DD MMM YYYY");
  // console.log(now);

  const handleClick = (url, event) => {
    // console.log("clicked");
    axios
      .post("/url", { url: url })
      .then((response) => {
        // console.log(response.data);
        setHeadline(response.data);
        setIsDataback(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getCategory = () => {
    const parser = new DOMParser();
    const xml = parser.parseFromString(props.category, "application/xml");
    const outline = xml.getElementsByTagName("outline");
    // console.log(outline.length);
    const categoryList = [];

    for (let i = 0; i < outline.length; i++) {
      // console.log(outline[i]);
      const title = outline[i].getAttribute("title");
      const xmlUrl = outline[i].getAttribute("xmlUrl");
      // console.log(title);
      // console.log(xmlUrl);

      categoryList.push(
        <Button
          key={title}
          onClick={(e) => {
            handleClick(xmlUrl, e);
            setIsDataback(false);
            setHeadline("");
          }}
          style={{ margin: "10px" }}
        >
          {title}
        </Button>
      );
    }
    return categoryList;
  };

  return (
    <Container>
      <h1>News ({now})</h1>
      <Row>{getCategory()}</Row>

      <br />
      {isDataBack ? <DisplayHeadline headline={headline} /> : ""}
    </Container>
  );
};

export default DisplayMain;
