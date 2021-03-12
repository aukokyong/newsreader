import axios from "axios";
import { useState } from "react";
import NavBar from "./components/Navbar.js";
import DisplayMain from "./components/DisplayCategory.js";

const App = () => {
  const [category, setCategory] = useState("");
  const [isDataBack, setIsDataback] = useState(false);

  const handleClick = (url, event) => {
    // console.log("clicked");
    setIsDataback(false);

    axios
      .post("/url", { url: url })
      .then((response) => {
        // console.log(response.data);
        setCategory(response.data);
        setIsDataback(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <NavBar handleClick={handleClick} />
      {isDataBack ? <DisplayMain category={category} /> : ""}
    </>
  );
};

export default App;
