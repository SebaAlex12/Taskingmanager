import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import jwt_decode from 'jwt-decode';

import { addProject } from "../actions";
import { updateUser, fetchLoggedUser } from '../../Users/actions';

import { isValid } from "../../../common/Forms/Validation";
import { StyledProjectForm } from "../styles/StyledProjectForm";

const initialIsValid = {status:true,message:""};

const ProjectsAddForm = ({ closeFormAction }) => {

  const [ name, setName ] = useState("");
  const [ description, setDescription ] = useState("");

  const [ nameIsValid, setNameIsValid ] = useState(initialIsValid);
  const [ validation, setValidation ] = useState(initialIsValid); 

  const dispatch = useDispatch();
  const loggedUser = useSelector(state=>state.users.logged_user);

  const addHandler = (event) => {
    event.preventDefault();

    const checkNameIsValid = isValid(name, {notEmpty:true});

    setNameIsValid(checkNameIsValid);

    if(checkNameIsValid.status === false){
        setValidation({status:false,message:"Formularz niepoprawnie wypełniony"});
    }else{
        dispatch(addProject({ name, company: loggedUser.company, description}));


        if(loggedUser.status === "Administrator"){

          console.log("Logged user is administratot add new project to administrator");

          const loggedUserProjects = [ ...loggedUser.projects.split(','), name];
    
          dispatch(updateUser({
            _id: loggedUser._id,
            name: loggedUser.name,
            email: loggedUser.email,
            status: loggedUser.status,
            projects: loggedUserProjects.join(','),
          }));

          const {
            lastActive,
            createdAt,
            tokenCreatedAt,
            logged,
          } = jwt_decode(localStorage.jwtTokenAuthorization);

          dispatch(fetchLoggedUser({
            _id: loggedUser._id,
            name: loggedUser.name,
            email: loggedUser.email,
            status: loggedUser.status,
            company: "Blumoseo",
            projects: loggedUserProjects.join(','),
            users:"",
            createdAt,
            lastActive,
            tokenCreatedAt,
            logged,
          }))

        }

        setName("");
        setDescription("");
        setValidation({status:true,message:""});
        
        closeFormAction();

    }
  }

  return (
    <StyledProjectForm>
        <div className="project-add-form-box">
        { validation.status === false && <div className="message notValid">{ validation.message }</div> }
          <form action="">
            <div className="form-group">
              <input
                onChange={(event) => setName(event.target.value)}
                type="text"
                name="name"
                value={ name }
                className="form-control"
                placeholder="Nazwa"
                title="Nazwa domeny"
                required
              />
              { !nameIsValid.status && (<i className="notValid">{ nameIsValid.message }</i>)}
            </div>
            <div className="form-group">
              <textarea
                onChange={(event) => setDescription(event.target.value)}
                type="text"
                name="description"
                value={ description }
                className="form-control"
                rows="5"
                placeholder="Opis"
                title="Opis"
                required
              />
            </div>
            <div className="form-group">
              <input
                onClick={addHandler}
                className="btn btn-primary float-right"
                type="submit"
                value="dodaj"
              />
            </div>
          </form>
        </div>
      </StyledProjectForm>
  )

}

export default ProjectsAddForm;