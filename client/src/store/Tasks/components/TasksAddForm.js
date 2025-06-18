import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { priorities, statuses } from "../../ini";
import { addTask } from "../actions";
import { isValid } from "../../../common/Forms/Validation";

import { StyledTaskForm } from "../styles/StyledTaskForm";

const initialIsValid = {status:true,message:""};

const TasksAddForm = ({ closeFormAction }) => {

  const [ title, setTitle ] = useState("");
  const [ description, setDescription ] = useState("");
  const [ priority, setPriority ] = useState("Normalny");
  const [ termAt, setTermAt ] = useState("");
  const [ projectId, setProjectId ] = useState("");
  const [ responsiblePersonId, setResponsiblePersonId ] = useState("");
  const [ status, setStatus] = useState("Do wykonania");
  const [ validation, setValidation ] = useState(initialIsValid);

  /* form validation */

  const [ titleIsValid, setTitleIsValid ] = useState(initialIsValid);
  const [ descriptionIsValid, setDescriptionIsValid ] = useState(initialIsValid);
  const [ priorityIsValid, setPriorityIsValid ] = useState(initialIsValid);
  // const [ termAtIsValid, setTermAtIsValid ] = useState(initialIsValid);
  const [ projectNameIsValid, setProjectNameIsValid ] = useState(initialIsValid);
  const [ responsiblePersonIsValid, setResponsiblePersonIsValid ] = useState(initialIsValid);
  const [ statusIsValid, setStatusIsValid ] = useState(initialIsValid);

  const users = useSelector(state => state.users.users);
  const projects = useSelector(state => state.projects.projects);
  const loggedUser = useSelector(state => state.users.logged_user);
  

  const loggedUserProjects = loggedUser.projects ? loggedUser.projects.split(",") : [];
  const filteredProjects = loggedUser.status === 'Administrator' ? projects : projects.filter(project => loggedUserProjects.includes(project._id) && project.visible === 'on');
  const filteredUsers = users.filter(user => user.projects.includes(projectId) && projectId.length > 0);

  const dispatch = useDispatch();

  const addHandler = (event) => {

    event.preventDefault();

    const checkTitleIsValid = isValid(title, {notEmpty:true});
    const checkDescriptionIsValid = isValid(description, {notEmpty:true});
    const checkPriorityIsValid = isValid(priority, {notEmpty:true});
    const checkProjectNameIsValid = isValid(projectId, {notEmpty:true});
    const checkResponsiblePersonIsValid = isValid(responsiblePersonId, {notEmpty:true});
    const checkStatusIsValid = isValid(status, {notEmpty:true});

    setTitleIsValid(checkTitleIsValid);
    setDescriptionIsValid(checkDescriptionIsValid);
    setPriorityIsValid(checkPriorityIsValid);
    // setTermAtIsValid(isValid(termAt, {notEmpty:true}));
    setProjectNameIsValid(checkProjectNameIsValid);
    setResponsiblePersonIsValid(checkResponsiblePersonIsValid);
    setStatusIsValid(checkStatusIsValid);

    if(checkTitleIsValid.status === false || 
      checkDescriptionIsValid.status === false || 
      checkPriorityIsValid.status === false || 
      checkProjectNameIsValid.status === false || 
      checkResponsiblePersonIsValid.status === false || 
      checkStatusIsValid.status === false ){
            setValidation({status:false,message:"Formularz niepoprawnie wypełniony"});
    }else{
          const data = {
            userId: loggedUser._id,
            createdById: loggedUser._id,
            projectId: projectId,
            projectName: projectId,
            responsiblePersonId,
            title,
            description,
            responsiblePersonLastCommentId:false,
            priority,
            status,
            termAt,
          };
      
          dispatch(addTask(data));
      
          setTitle("");
          setDescription("");
          setPriority("");
          setTermAt("");
          setProjectId("");
          setResponsiblePersonId("");
          setStatus("");

          setValidation({status:true,message:""});
          closeFormAction();
    }

  };

  return (
          <StyledTaskForm>
            <div className="task-add-form-box">
              { validation.status === false && <div className="message notValid">{ validation.message }</div> }
              <form action="">
                <div className="form-group">
                  <input
                    onChange={(event) => setTitle(event.target.value)}
                    type="text"
                    name="title"
                    value={title}
                    className={`form-control ${ titleIsValid.status === false ? "notValid" : "" }`}
                    placeholder="Tytuł"
                    required
                  />
                  { !titleIsValid.status && (<i className="notValid">{ titleIsValid.message }</i>)}
                </div>
                <div className="form-group">
                  <textarea
                    onChange={(event) => setDescription(event.target.value)}
                    type="text"
                    name="description"
                    value={description}
                    className={`form-control ${ descriptionIsValid.status === false ? "notValid" : "" }`}
                    rows="10"
                    placeholder="Opis"
                    required
                  />
                  { !descriptionIsValid.status && (<i className="notValid">{ descriptionIsValid.message }</i>)}
                </div>
                <div className="form-group">
                  <select
                    className={`form-control ${ priorityIsValid.status === false ? "notValid" : "" }`}
                    onChange={(event) => setPriority(event.target.value)}
                    name="priority"
                    value={priority}
                    required
                  >
                    <option value="">Wybierz priorytet</option>
                    {priorities
                      ? priorities.map((prt) => {
                          return (
                            <option
                              key={prt._id}
                              value={prt.name}
                              defaultValue={prt.name === status ? "selected" : null}
                            >
                              {prt.name}
                            </option>
                          );
                        })
                      : null}
                  </select>
                  { !priorityIsValid.status && (<i className="notValid">{ priorityIsValid.message }</i>)}
                </div>
                <div className="form-group">
                  <input
                    onChange={(event) => setTermAt(event.target.value)}
                    type="date"
                    name="termAt"
                    value={termAt}
                    className="form-control"
                    placeholder="Termin"
                    required
                  />
                </div>
                <div className="form-group">
                  <select
                    className={`form-control ${ projectNameIsValid.status === false ? "notValid" : "" }`}
                    onChange={(event) => setProjectId(event.target.value)}
                    name="projectId"
                    required
                  >
                    <option>Wybierz projekt</option>
                    {
                      filteredProjects.map((project) => 
                            (
                                <option key={project._id} value={project._id}>
                                      {project.name}
                                  </option>
                            )
                      )
                    }
                  </select>
                  { !projectNameIsValid.status && (<i className="notValid">{ projectNameIsValid.message }</i>)}
                </div>
                <div className="form-group">
                  <select
                    className={`form-control ${ responsiblePersonIsValid.status === false ? "notValid" : "" }`}
                    onChange={(event) => setResponsiblePersonId(event.target.value)}
                    name="responsiblePersonId"
                    required
                  >
                    <option>Przypisz do</option>
                    {
                        filteredUsers.map((user) => (
                            <option key={user._id} value={user._id}>
                              {user.name}
                            </option>
                          ))
                    }
                  </select>
                  { !responsiblePersonIsValid.status && (<i className="notValid">{ responsiblePersonIsValid.message }</i>)}
                </div>
                <div className="form-group">
                  <select
                    className={`form-control ${ statusIsValid.status === false ? "notValid" : "" }`}
                    onChange={(event) => setStatus(event.target.value)}
                    name="status"
                    value={status}
                    required
                  >
                    <option>Wybierz stan</option>
                    {statuses
                      ? statuses.map((sts) => {
                          return (
                            <option
                              key={sts._id}
                              defaultValue={sts.name === status ? "selected" : null}
                            >
                              {sts.name}
                            </option>
                          );
                        })
                      : null}
                  </select>
                  { !statusIsValid.status && (<i className="notValid">{ statusIsValid.message }</i>)}
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
          </StyledTaskForm>
  )
}
export default TasksAddForm;