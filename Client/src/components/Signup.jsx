import { useState,useEffect } from "react";
import styles from "../styles/Login.module.css";
import { useNavigate, Link, NavLink } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../Firebase/Firebase";
export const SignUp = () => {
  const [login, setLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
//   useEffect(() => {
//     if (login) {
//       navigate("/signin");
//     }
//   }, [login, navigate]);

  const handleSignUp = (e, email, password) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        console.log("FireBase User Created !");
        // setLogin(false);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  };

  return (
    <>
      <h1 className={styles.LoginHead}>Sign Up</h1>
      <div className={styles.LoginForm}>
        <form action="" onSubmit={(e) => handleSignUp(e, email, password)}>
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
            Sign Up
          </button>
        </form>
        <span className={styles.SignUpSuggestionBtn}>
          <NavLink
            style={{ textDecoration: "none", color: "black" }}
            to="/signin"
          >
            Already have an account ?
          </NavLink>
        </span>
      </div>
    </>
  );
};
