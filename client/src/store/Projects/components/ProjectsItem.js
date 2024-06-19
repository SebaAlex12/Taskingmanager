import { useState } from "react";
import { useSelector } from 'react-redux';

import ProjectsEditForm from "./ProjectsEditForm";

// import ModalDialog from "../../../common/ModalDialog/components/ModalDialog";
// import TasksShortList from "../../Tasks/components/TasksShortList";

import { SmallerButton } from "../../../themes/basic";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ProjectsItem = ({ projectTasks, item }) => {

  const [ toggleEditForm, setToggleEditForm ] = useState(false);

  const loggedUser = useSelector(state=>state.users.logged_user);

  return (
        <div className="item-box">
          <div className="title">
            <div className="name">
            <span className="task-counter" style={{fontWeight:"bold",marginRight:"4px"}}>{ projectTasks.length }</span>
                <span>{item.name}</span>
            </div>
            <div className="buttons">
              {loggedUser.status === "Administrator" ||
              loggedUser.status === "Menedżer" ? (
                  <SmallerButton
                    title="edytuj"
                    onClick={() =>
                      setToggleEditForm(prevState => !prevState)
                    }
                  >
                    <FontAwesomeIcon icon={faEdit} />
                  </SmallerButton>
              ) : null}
            </div>
          </div>
          <div className="edit-form">
            {/* {
              showModalTasksListTrigger && (
                <ModalDialog 
                    showModal={() => setShowModalTasksListTrigger(false)}
                >
                  <TasksShortList 
                      projectName={item.name}
                      deleteProjectHandler={deleteHandler}
                      tasks={projectTasks}
                      deleteTaskHandler={deleteTaskHandler}
                  />
                </ModalDialog>
              )
            } */}
            {loggedUser.status === "Administrator" ||
            loggedUser.status === "Menedżer" ||
            loggedUser.status === "Pracownik" ? (
              <>
                {toggleEditForm ? <ProjectsEditForm item={item} /> : null}
              </>
            ) : null}
        </div>
      </div>
  )
}

export default ProjectsItem;

/*
  deleteHandler = () => {
      const { item: { _id, name }, removeProject } = this.props;
      const result = window.confirm(
        "Czy napewno chcesz usunąć projekt: " + name
      );
      if (result === true) {
        const response = removeProject(_id);
        if (response) {
          updateMessages([
            { name: "Projekt" },
            { value: name + " został usunięty" },
          ]);
        }
      }
  }
*/