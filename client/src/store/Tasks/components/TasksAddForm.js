import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { priorities, statuses } from "../../ini";
import { addTask } from "../actions";

import { StyledTaskForm } from "../styles/StyledTaskForm";

const TasksAddForm = () => {

  const [ title, setTitle ] = useState("");
  const [ description, setDescription ] = useState("");
  const [ priority, setPriority ] = useState("");
  const [ termAt, setTermAt ] = useState("");
  const [ projectName, setProjectName ] = useState("");
  const [ responsiblePerson, setResponsiblePerson ] = useState("");
  const [ status, setStatus] = useState("");
  const [ message, setMessage ] = useState("");

  const users = useSelector(state => state.users.users);
  const projects = useSelector(state => state.projects.projects);
  const loggedUser = useSelector(state => state.users.logged_user);

  const loggedUserProjects = loggedUser.projects ? loggedUser.projects.split(",") : [];
  const filteredProjects = projects.filter(project => loggedUserProjects.includes(project.name));
  const filteredUsers = users.filter(user => user.projects.includes(projectName) && projectName.length > 0);

  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(() => {
        setMessage("");
    },5000);
  },[message]);

  const addHandler = (event) => {

    event.preventDefault();
    
    const data = {
      userId: loggedUser._id,
      createdBy: loggedUser.name,
      projectId: "1",
      projectName,
      responsiblePerson,
      title,
      description,
      responsiblePersonLastComment:false,
      priority,
      status,
      termAt,
    };

    dispatch(addTask(data));

    setTitle("");
    setDescription("");
    setPriority("");
    setTermAt("");
    setProjectName("");
    setResponsiblePerson("");
    setStatus("");
    // setMessage("Zadanie zostało dodane");

  };

  return (
          <StyledTaskForm>
            <div className="task-add-form-box">
              { message.length > 0 && <div className="message">{ message }</div> }
              <form action="">
                <div className="form-group">
                  <input
                    onChange={(event) => setTitle(event.target.value)}
                    type="text"
                    name="title"
                    value={title}
                    className="form-control"
                    placeholder="Tytuł"
                    required
                  />
                </div>
                <div className="form-group">
                  <textarea
                    onChange={(event) => setDescription(event.target.value)}
                    type="text"
                    name="description"
                    value={description}
                    className="form-control"
                    rows="10"
                    placeholder="Opis"
                    required
                  />
                </div>
                <div className="form-group">
                  <select
                    className="form-control"
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
                    className="form-control"
                    onChange={(event) => setProjectName(event.target.value)}
                    name="projectName"
                    required
                  >
                    <option>Wybierz projekt</option>
                    {
                      filteredProjects.map((project) => 
                            (
                                <option key={project._id} value={project.name}>
                                      {project.name}
                                  </option>
                            )
                      )
                    }
                  </select>
                </div>
                <div className="form-group">
                  <select
                    className="form-control"
                    onChange={(event) => setResponsiblePerson(event.target.value)}
                    name="responsiblePerson"
                    required
                  >
                    <option>Przypisz do</option>
                    {
                        filteredUsers.map((user) => (
                            <option key={user._id} value={user.name}>
                              {user.name}
                            </option>
                          ))
                    }
                  </select>
                </div>
                <div className="form-group">
                  <select
                    className="form-control"
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