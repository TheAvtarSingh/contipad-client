import React, { useEffect, useState } from "react";
import { useDebounce } from "../CustomHooks/debouncing";
import "./Pad.css";
import Bottombar from "../BottomBar/bottombar";
import Cookies from "js-cookie";
import io from "socket.io-client";
import { user } from "../AnonymousUser/AnonymousUser";



function Pad() {
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("Your Contipad title ");
  const [message, setMessage] = useState(null);
  const [allJoiners, setAllJoiners] = useState([]);
  const [alert, setAlert] = useState(false);

  const debouncedText = useDebounce(content, 1000);

  const handleLogout = () => {
    Cookies.remove("user");
    Cookies.set("isLoggedIn", false, { expires: 7 });
  };


  useEffect(() => {
    const socket = io("https://contipad-server-thenorthcap.koyeb.app", { transports: ["websocket"] });
    socket.on("connection", () => {
      console.log("Connected to server");
    });
    socket.emit("joined", { user });
    socket.on("welcome", (data) => {
      setMessage(data.message);
    });
    socket.on("userJoined", (data) => {
      setAlert(true);
      setAllJoiners((prevJoiners) => [...prevJoiners, data.message]);
    });
    socket.on("userLeft", (data) => {
      // remve from joiners
      setAlert(true);
      setAllJoiners((prevJoiners) => [...prevJoiners, data.message]);
    });
    return () => {
      socket.disconnect()
      
      socket.off();
    };
  }, []);
  useEffect(() => {
    setTimeout(() => setAlert(false), 4000);
    
  }, [alert]);
  
  
  

  return (
    <>
      <div className="heading">
        <h1>{title}</h1>
      </div>
      {alert && allJoiners.map((joiner, index) => (
        <div key={index} className={joiner.includes("Left") ? "alert alert-danger" : "alert alert-success"} role="alert">
          {joiner}
        </div>
      ))}

      {message && (
        <div className="userName">
          <h5>{message}</h5>
        </div>
      )}

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
      <button
        type="button"
        onClick={handleLogout}
        className="btn btn-primary m-4"
      >
        Logout
      </button>
      <Bottombar />
    </>
  );
}

export default Pad;
