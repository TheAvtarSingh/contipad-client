import React, { useState } from "react";
import { Link} from "react-router-dom";

let user;

function AnonymousUser() {
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");

  
  const handleInputChange = (e) => {
    setUsername(e.target.value);
  };
 const handleSubmit = (e) => {
    if (!username) {
      setError("Please Enter Your Name");
      e.preventDefault();
    } else {
      user = username;
      setUsername("");
  
    }
  };
  return (
    <main>
      <form className="login-form" >
        <h1>Welcome To Contipad</h1>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Enter Your Name
          </label>
          <span className="text-danger">*</span>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={username}
            onChange={handleInputChange}
          />
          <div className="form-text text-danger">{error}</div>
        </div>
         
      
     

        <div className="buttons my-1">
          <Link to={'/pad'} type="button" >
          <button type="button"  onClick={handleSubmit} className="btn btn-primary mx-2">
            Submit
          </button>
          </Link>
          <button
            type="reset"
            onClick={() => {
              setUsername("");
              setError("");
            }}
            className="btn btn-primary mx-2"
          >
            Clear
          </button>
        </div>
       
        <Link
          to={"/signup"}
          type="button"
          className="btn btn-primary mx-2 my-2"
        >
          Signup
        </Link>
      </form>
    </main>
  );
}

export default AnonymousUser;
export {user};
