import React, { useState } from 'react';

import TaskAddForm from './../store/Tasks/components/TasksAddForm';
import ProjectsAddForm from './../store/Projects/components/ProjectsAddForm';
import RegistryForm from './../store/Users/components/RegistryForm';

import { BiggerButton } from './../themes/basic';

import {
    faSyncAlt,
    faLayerGroup,
    faArrowAltCircleDown,
  } from "@fortawesome/free-solid-svg-icons";
  import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const RightButtonsBox = () => {
    const [ toggleTasksAddForm, setToggleTasksAddForm ] = useState(false);
    const [ toggleProjectAddForm, setToggleProjectAddForm ] = useState(false);
    const [ toggleUserAddForm, setToggleUserAddForm ] = useState(false);

    return (
        <div className="right-buttons-box">
            <div className='item'>
                <BiggerButton
                        variant="primary"
                        title="Rozwiń formularz"
                        onClick={() => setToggleUserAddForm(prevState => !prevState)}
                >
                    <FontAwesomeIcon icon={faArrowAltCircleDown} />
                    <span>Dodaj użytkownika</span>
                </BiggerButton>
                    {toggleUserAddForm ? <RegistryForm /> : null}
            </div>
            <div className='item'>
            <BiggerButton
                    variant="primary"
                    title="Rozwiń formularz"
                    onClick={() => setToggleProjectAddForm(prevState => !prevState)}
              >
                <FontAwesomeIcon icon={faArrowAltCircleDown} />
                <span>Dodaj projekt</span>
            </BiggerButton>
              {toggleProjectAddForm ? <ProjectsAddForm /> : null}
            </div>
            <div className='item'>
                <BiggerButton
                        variant="primary"
                        title="Rozwiń formularz"
                        onClick={() => setToggleTasksAddForm(prevState => !prevState)}
                >
                    <FontAwesomeIcon icon={faArrowAltCircleDown} />
                    <span>Dodaj zadanie</span>
                </BiggerButton>
                {toggleTasksAddForm ? <TaskAddForm /> : null}
            </div>
      </div>
    )
}

export default RightButtonsBox;