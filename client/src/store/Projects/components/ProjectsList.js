import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import ProjectsItem from "./ProjectsItem";
import TextFieldGroup from "../../../common/Forms/components/TextFieldGroup";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { StyledProjectList } from "../styles/StyledProjectList";
import { BiggerButton, SmallerButton, ListBox } from "../../../themes/basic";
import { faTimes, faArrowAltCircleDown } from "@fortawesome/free-solid-svg-icons";

const ProjectsList = () => {
  
  const projects = useSelector((state) => state.projects.projects);

  const [ toggleProjectsList, setToggleProjectsList ] = useState(false);
  const [ filteredProjects, setFilteredProjects ] = useState([]);

  useEffect(() => {
      setFilteredProjects(projects);
  },[toggleProjectsList]);

  const btn_list_clazz = toggleProjectsList ? "project-list-flow-box active" : "project-list-flow-box";

  const filterProjectsHandler = (name) => {

    const filtered =  projects.filter(item => {
        console.log('name item',item.name.toLowerCase());
        if(item.name.toLowerCase().includes(name.toLowerCase()) === true){
            return item;
        }
      });

      setFilteredProjects(filtered)
  }

  const projectsContent = filteredProjects.length > 0 ? filteredProjects.map(project => {
    return <ProjectsItem key={project._id} item={project} />;
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
                  <SmallerButton
                    className="remove-filter"
                  >
                    <FontAwesomeIcon title="usuń filtrowanie" icon={faTimes} />
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