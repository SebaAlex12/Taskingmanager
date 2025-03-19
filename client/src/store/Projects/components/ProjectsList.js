import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { updateProject } from '../actions';

import ProjectsItem from "./ProjectsItem";
import TextFieldGroup from "../../../common/Forms/components/TextFieldGroup";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { StyledProjectList } from "../styles/StyledProjectList";
import { BiggerButton, SmallerButton, ListBox } from "../../../themes/basic";
import { faArrowAltCircleDown, faLightbulb } from "@fortawesome/free-solid-svg-icons";

const ProjectsList = () => {

  console.log('render projects list...');

  const dispatch = useDispatch();

  const globalStateProjects = useSelector((state) => state.projects.projects);
  const loggedUser = useSelector((state) => state.users.logged_user);

  const [ toggleProjectsList, setToggleProjectsList ] = useState(false);
  const [ toggleVisibleProjectsList, setToggleVisibleProjectsList ] = useState(true);

  const [ projects, setProjects ] = useState([]);
  const [ filteredProjects, setFilteredProjects ] = useState([]);

  useEffect(() => {
        setProjects(globalStateProjects);
        const items = filterProjects(globalStateProjects);
        setFilteredProjects(items);
  },[globalStateProjects]);

  useEffect(() => {
      const items = filterProjects(projects);
      setFilteredProjects(items);
  },[toggleVisibleProjectsList]);

  const filterProjects = (items) => {
      const filtered = toggleVisibleProjectsList === true ? items.filter(item => item.visible === 'on') : items;
      return filtered;
  }

  const btn_list_clazz = toggleProjectsList ? "project-list-flow-box active" : "project-list-flow-box";

  const filterProjectsHandler = (name) => {

    const items = filterProjects(projects);

    const filtered =  items.filter(item => {
        if(item.name.toLowerCase().includes(name.toLowerCase()) === true){
            return item;
        }
      });
      setFilteredProjects(filtered);
  }

  const switchVisibleProjectsHandler = () => {
      setToggleVisibleProjectsList(toggleVisibleProjectsList === true ? false : true);
  }

  const switchItemHandler = (item) => {
      const newItem =         { 
        ...item, 
        visible: item.visible === "on" ? "off" : "on"
      };
      dispatch(updateProject(newItem));
  }

  const projectsContent = filteredProjects.length > 0 ? filteredProjects.map(project => {
    return <ProjectsItem key={project._id} item={project} switchItemHandler={switchItemHandler}/>;
  }) : "projects are loading...";

    return (
        <StyledProjectList>
          <div className="projects-box">
            <div className={btn_list_clazz}>
              <BiggerButton
                variant="primary"
                title="Pokaż listę projektów"
                onClick={() => setToggleProjectsList(prev => !prev)}
              >
                <FontAwesomeIcon icon={faArrowAltCircleDown} />
                <span>Lista Projektów</span>
              </BiggerButton>
                  {toggleProjectsList ? (
                    <ListBox
                      className="projects-list"
                    >
                      
                      { 
                        loggedUser.status === 'Administrator' && 
                          <SmallerButton className="remove-filter" onClick={switchVisibleProjectsHandler}>
                              <FontAwesomeIcon icon={faLightbulb} />
                          </SmallerButton> 
                      }
                      <div className="filter-box">
                        <TextFieldGroup
                          onChange={event => filterProjectsHandler(event.target.value)}
                          type="text"
                          className="form-control"
                          placeholder="filtruj po nazwie"
                          title="filtruj po nazwie"
                        />
                      </div>
                      <div className="items">{projectsContent}</div>
                    </ListBox>
                  ) : null}
            </div>
          </div>
        </StyledProjectList>
    )
}

export default ProjectsList;