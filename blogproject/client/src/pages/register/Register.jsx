import { Link } from "react-router-dom";
import axios from "axios";
import "./register.scss";
import { useRef, useState } from "react";

const Register = () => {
  const [err, seterr] = useState(null);

  const [inputs, setinputs] = useState({
    username: "",
    email: "",
    password: "",
    name: "",
  });

  const usernameref = useRef(null);
  const emailref = useRef(null);
  const passwordref = useRef(null);
  const nameref = useRef(null);

  const handleonclickregister = async (e) => {
    e.preventDefault();
    setinputs({
      username: usernameref.current.value,
      email: emailref.current.value,
      password: passwordref.current.value,
      name: nameref.current.value,
    });

    try {
      await axios.post("http://localhost:8888/api/auth/register", inputs);
    } catch (err) {
      seterr(err.response.data);
    }
  };

  console.log(err);

  return (
    <div className="register">
      <div className="card">
        <div className="left">
          <h1>Lama Social.</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero cum,
            alias totam numquam ipsa exercitationem dignissimos, error nam,
            consequatur.
          </p>
          <span>Do you have an account?</span>
          <Link to="/login">
            <button>Login</button>
          </Link>
        </div>
        <div className="right">
          <h1>Register</h1>
          <form>
            <input type="text" placeholder="Username" ref={usernameref} />
            <input type="email" placeholder="Email" ref={emailref} />
            <input type="password" placeholder="Password" ref={passwordref} />
            <input type="text" placeholder="Name" ref={nameref} />
            {err && err}
            <button onClick={handleonclickregister}>Register</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
