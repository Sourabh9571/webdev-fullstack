import { useContext, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContextProvider";
import "./login.scss";

const Login = () => {
  const navigate = useNavigate();
  const [err, seterr] = useState(null);

  const usernameref = useRef(null);
  const passwordref = useRef(null);

  const { loginfun } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await loginfun({
        username: usernameref.current.value,
        password: passwordref.current.value,
      });
      navigate("/");
    } catch (err) {
      console.log(err);
      seterr(err);
    }
  };

  return (
    <div className="login">
      <div className="card">
        <div className="left">
          <h1>Hello World.</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero cum,
            alias totam numquam ipsa exercitationem dignissimos, error nam,
            consequatur.
          </p>
          <span>Don't you have an account?</span>
          <Link to="/register">
            <button>Register</button>
          </Link>
        </div>
        <div className="right">
          <h1>Login</h1>
          <form>
            <input type="text" placeholder="Username" ref={usernameref} />
            <input type="password" placeholder="Password" ref={passwordref} />

            <button onClick={handleLogin}>Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
