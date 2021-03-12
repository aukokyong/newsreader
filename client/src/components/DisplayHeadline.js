import { Fragment, useState } from "react";
import DisplayArticle from "./DisplayArticle";
import DisplayArticleLoading from "./DisplayArticleLoading";
import axios from "axios";
import { Container } from "react-bootstrap";

const DisplayHeadline = (props) => {
  //   console.log(props.headline);

  const [article, setArticle] = useState("");
  const [isDataBack, setIsDataback] = useState(false);
  const [articleLink, setArticleLink] = useState("");
  const [showArticle, setShowArticle] = useState(false);

  const handleClick = (url, event) => {
    // console.log("clicked");
    setShowArticle(true);

    axios
      .post("/url", { url: url })
      .then((response) => {
        // console.log(response.data);
        setArticle(response.data);
        setIsDataback(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getTitle = () => {
    const parser = new DOMParser();
    const xml = parser.parseFromString(props.headline, "application/xml");
    const title = xml.getElementsByTagName("title")[0].innerHTML;
    // console.log(title);
    return <h1>{title}</h1>;
  };

  const getHeadline = () => {
    const parser = new DOMParser();
    const xml = parser.parseFromString(props.headline, "application/xml");
    const item = xml.getElementsByTagName("item");
    // console.log(item.length);

    const headlineList = [];

    for (let i = 0; i < item.length; i++) {
      const title = item[i].getElementsByTagName("title")[0].innerHTML;
      const link = item[i].getElementsByTagName("link")[0].innerHTML;
      //   console.log(title);
      //   console.log(link);
      headlineList.push(
        <li key={i + title}>
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              handleClick(link, e);
              setArticleLink(link);
            }}
          >
            {title}
          </a>
        </li>
      );
    }
    return headlineList;
  };

  return (
    <Container>
      <Fragment>{getTitle()}</Fragment>
      <ul style={{ maxHeight: "60vh", overflow: "auto" }}>{getHeadline()}</ul>

      {isDataBack ? (
        <DisplayArticle
          article={article}
          articleLink={articleLink}
          showArticle={showArticle}
          setArticle={setArticle}
          setShowArticle={setShowArticle}
          SetIsDataback={setIsDataback}
        />
      ) : (
        <DisplayArticleLoading
          showArticle={showArticle}
          setShowArticle={setShowArticle}
        />
      )}
    </Container>
  );
};

export default DisplayHeadline;
