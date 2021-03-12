import { Nav, Navbar } from "react-bootstrap";
import { BrowserRouter as Router, Link } from "react-router-dom";

const NavBar = (props) => {
  const breakingNews =
    "https://static.straitstimes.com.sg/s3fs-public/rss_breaking_news.opml";
  const printEdition =
    "https://static.straitstimes.com.sg/s3fs-public/rss_print.opml";
  const sundaytimes =
    "https://static.straitstimes.com.sg/s3fs-public/rss_sunday_print.opml";

  return (
    <>
      <Router>
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand as={Link} to="/">
            News
          </Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link
              as={Link}
              to="/"
              onClick={(e) => {
                props.handleClick(breakingNews, e);
              }}
            >
              Breaking News
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/"
              onClick={(e) => {
                props.handleClick(printEdition, e);
              }}
            >
              Print Edition
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/"
              onClick={(e) => {
                props.handleClick(sundaytimes, e);
              }}
            >
              Sunday Times
            </Nav.Link>
          </Nav>
        </Navbar>
      </Router>
    </>
  );
};

export default NavBar;
