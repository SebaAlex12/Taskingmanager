import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../actions";

import MessagesAlertInfo from "../../Messages/components/MessagesAlertInfo";
import LoaderInfo from "../../../common/LoaderInfo";

const LoginForm = () => {
console.log('loghin form');
  const dispatch = useDispatch();
  let { logged_user } = useSelector(state => state.users);

  if(logged_user){
    window.location.href = "/dashboard";
  }

  const loading = false;
  const errors = [];

  const email = useRef();
  const password = useRef();

  const loginHandler = (event) => {
      event.preventDefault();
      dispatch(loginUser({ email: email.current.value, password: password.current.value }));
  }

  return(
        <React.Fragment>
          { loading === true ? <LoaderInfo>Trwa ładowanie strony...</LoaderInfo> : null }
          { errors.length > 0 ? <MessagesAlertInfo errors={errors} /> : null }
          <div
            className="login-form-box mb-3 mt-3"
            style={{
              marginTop: "150px",
              width: "300px",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
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