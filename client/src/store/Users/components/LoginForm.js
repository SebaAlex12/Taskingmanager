import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../actions";

import MessagesAlertInfo from "../../Messages/components/MessagesAlertInfo";
import LoaderInfo from "../../../common/LoaderInfo";

const LoginForm = () => {
  const dispatch = useDispatch();
  let { logged_user } = useSelector(state => state.users);
  const { errors } = useSelector(state => state.users);
  const [ isLogging, setIsLogging ] = useState(false);

  if(logged_user){
      window.location.href = "/dashboard";
  }

  const email = useRef();
  const password = useRef();

  const loginHandler = (event) => {
      event.preventDefault();
      setIsLogging(true);
      dispatch(loginUser({ email: email.current.value, password: password.current.value }));
      setIsLogging(false);
  }

  return(
        <React.Fragment>
          <div
            className="login-form-box mb-3 mt-3"
            style={{
              marginTop: "150px",
              width: "300px",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
              { isLogging === true && <LoaderInfo>Trwa logowanie do systemu..." </LoaderInfo>}
              { errors.length > 0 ? <MessagesAlertInfo errors={errors} /> : null }
            <form action="post">
              <div className="form-group form-row">
                <label htmlFor="">Email:</label>
                <input
                  ref={email}
                  className="form-control"
                  type="text"
                />
              </div>
              <div className="form-group form-row">
                <label htmlFor="">Hasło:</label>
                <input
                  ref={password}
                  className="form-control"
                  type="password"
                />
              </div>
              <div className="form-group">
                <input
                  onClick={loginHandler}
                  className="btn btn-primary float-right"
                  type="submit"
                  value="zaloguj"
                />
              </div>
            </form>
          </div>
        </React.Fragment>
  )

}

export default LoginForm;