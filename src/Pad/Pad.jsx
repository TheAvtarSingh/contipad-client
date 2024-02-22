import React from "react";
import { useEffect, useState } from "react";
import { useDebounce } from "../CustomHooks/debouncing";
import "./Pad.css";
import Bottombar from "../BottomBar/bottombar";
import Cookies from "js-cookie";
function Pad() {
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("Your Contipad title ");

  const debouncedText = useDebounce(content, 1000);


 const handleLogout = ()=>{
  Cookies.remove("user");
  Cookies.set('isLoggedIn', false, { expires: 7 });
 }

  return (
    <>
      <div className="heading">
        <h1 contentEditable="true">{title}{debouncedText}</h1>
       
      </div>

      <div>
        <textarea
          name="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="input-container"
          type="text"
          placeholder="Write Your Text Here !!"
        />
       
      </div>
      <button type="button" onClick={handleLogout} className="btn btn-primary m-4">
              Logout
            </button>
      <Bottombar />
    </>
  );
}

export default Pad;
