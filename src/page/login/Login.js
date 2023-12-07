import { useEffect, useState, useReducer } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faKey } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useGlobalStore } from "../../global/GlobalStoreContext";
import { SendEmail } from "../../api/email/Email";
import "../../styles/scss/page/_login.scss";

const inputReducer = (state, action) => {
  switch (action.type) {
    case "ID":
      return {
        value: action.id,
        isValid: action.id.trim().length > 0,
      };
    case "PASSWORD":
      return {
        value: action.password,
        isValid: action.password.trim().length > 0,
      };
    default:
      return state;
  }
};

const Login = () => {
  const [formIsValid, setFormIsValid] = useState(true);
  const [errorMsgView, setErrorMsgView] = useState(false);
  const navigate = useNavigate();
  const { loggedInEmployeeIdContext } = useGlobalStore();
  const initialState = { value: "", isValid: null };
  const [idState, dispatchId] = useReducer(inputReducer, initialState);
  const [passwordState, dispatchPassword] = useReducer(
    inputReducer,
    initialState
  );

  // ID、PASSWORD Validation Status
  const { isValid: idIsValid } = idState;
  const { isValid: passwordIsValid } = passwordState;

  // ID、PASSWORD Value
  const { value: userName } = idState;
  const { value: userPassword } = passwordState;

  useEffect(() => {
    const identifier = setTimeout(() => {
      setFormIsValid(!(idIsValid && passwordIsValid));
    }, 500);
    return () => {
      clearTimeout(identifier);
    };
  }, [idIsValid, passwordIsValid]);

  function idChangeHandler(e) {
    dispatchId({ type: "ID", id: e.target.value });
  }
  function passwordChangeHandler(e) {
    dispatchPassword({ type: "PASSWORD", password: e.target.value });
  }
  function loginHandler() {
    if (userName !== "Godfrey" || userPassword !== "123") {
      setErrorMsgView(true);
      SendEmail();
    } else {
      loggedInEmployeeIdContext.setLoggedInEmployeeID(userName);
      navigate("/colleague-feedback");
    }
  }

  return (
    <div className="bg-container">
      <div className="login-container">
        <div className="login-container-title">Backend System</div>
        <div className="sub-container">
          <FontAwesomeIcon
            className="icon-container"
            icon={faUser}
            size="2xl"
            style={{ color: "#6b94e1" }}
          />
          <span className="sub-container-title">ID</span>
          <div className="input-container">
            <InputText className="id" onChange={idChangeHandler} />
          </div>
        </div>
        <div className="sub-container">
          <FontAwesomeIcon
            className="icon-container"
            icon={faKey}
            size="2xl"
            style={{ color: "#6b94e1" }}
          />
          <span className="sub-container-title">Password</span>
          <div className="input-container">
            <InputText
              type="password"
              className="pwd"
              onChange={passwordChangeHandler}
            />
          </div>
        </div>
        <div hidden={!errorMsgView} className="error-MSG">
          Incorrect ID or password
        </div>

        <div className="sub-container">
          <Button
            className="button"
            label="Log In"
            disabled={formIsValid}
            onClick={loginHandler}
          />
        </div>
      </div>
    </div>
  );
};
export default Login;
