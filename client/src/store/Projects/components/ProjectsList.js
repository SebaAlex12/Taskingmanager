import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { updateProject } from '../actions';

import ProjectsItem from "./ProjectsItem";
import TextFieldGroup from "../../../common/Forms/components/TextFieldGroup";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { StyledProjectList } from "../styles/StyledProjectList";
import { BiggerButton, SmallerButton, ListBox } from "../../../themes/basic";
import { faArrowAltCircleDown, faLightbulb } from "@fortawesome/free-solid-svg-icons";

let reloadProjects = false;

const ProjectsList = () => {

  console.log('render projects list...');

  const [ toggleProjectsList, setToggleProjectsList ] = useState(false);
  const [ toggleVisibleProjectsList, setToggleVisibleProjectsList ] = useState(true);

  const globalStateProjects = useSelector((state) => state.projects.projects);

  // const projectsList = toggleVisibleProjectsList === true ? state.projects.projects.filter(project => project.visible === 'on') : state.projects.projects;

  const [ projects, setProjects ] = useState([]);
  const [ filteredProjects, setFilteredProjects ] = useState([]);

  console.log('globalStateProjects',globalStateProjects);

  const dispatch = useDispatch();

  useEffect(() => {
      console.log('use effect start');
      reloadBaseProjects();
  },[]);

  useEffect(() => {
    reloadBaseProjects();
  },[toggleProjectsList,toggleVisibleProjectsList]);

  const reloadBaseProjects = () => {
    console.log('reload base projects...');
      const filtered = toggleVisibleProjectsList === true ? globalStateProjects.filter(project => project.visible === 'on') : globalStateProjects;
      setProjects(globalStateProjects);
      setFilteredProjects(filtered);
  }

  if(reloadProjects){
    reloadBaseProjects();
    reloadProjects = false;
  }



  const btn_list_clazz = toggleProjectsList ? "project-list-flow-box active" : "project-list-flow-box";

  const filterProjectsHandler = (name) => {

    const filtered =  projects.filter(item => {
        if(item.name.toLowerCase().includes(name.toLowerCase()) === true){
            return item;
        }
      });
      setFilteredProjects(filtered);
  }

  const switchItemHandler = (item) => {
      const newItem =         { 
        ...item, 
        visible: item.visible === "on" ? "off" : "on"
      };
      dispatch(updateProject(newItem));
      reloadProjects = true;
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
                      {/* <SmallerButton
                        className="remove-filter"
                      >
                        <FontAwesomeIcon title="usuń filtrowanie" icon={faTimes} />
                      </SmallerButton> */}
                      <SmallerButton className="remove-filter" onClick={() => setToggleVisibleProjectsList(toggleVisibleProjectsList === true ? false : true)}>
                      <FontAwesomeIcon icon={faLightbulb} />
                      </SmallerButton>
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