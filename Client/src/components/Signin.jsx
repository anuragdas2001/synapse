import { useNavigate } from "react-router-dom";
import styles from "../styles/Login.module.css";

import { useState, useEffect } from "react";
import { auth } from "../Firebase/Firebase";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
export const SignIn = () => {
  const [login, setLogin] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  // const history = useHistory();
  useEffect(() => {
    if (login) {
      navigate("/");
    }
  }, [login, navigate]);
  const handleSignin = (e, email, password) => {
    e.preventDefault();
    console.log(email);
    console.log(password);
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log("FireBase Authentication Successful");
        setLogin(true);
        console.log(login);
        // navigate("/");
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };

  return (
    <>
      <h1 className={styles.LoginHead}>Login</h1>
      <div className={styles.LoginForm}>
        <form onSubmit={(e) => handleSignin(e, email, password)}>
          <input
            className={styles.InputBtn}
            type="email"
            value={email}
            placeholder="Enter Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <br />
          <input
            className={styles.InputBtn}
            type="password"
            value={password}
            placeholder="Enter Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <br />
          <button className={styles.SubmitBtn} type="submit">
            Login
          </button>
        </form>
      </div>
    </>
  );
};
