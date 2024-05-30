import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import TaskAddForm from './../store/Tasks/components/TasksAddForm';
import ProjectsAddForm from './../store/Projects/components/ProjectsAddForm';
import RegistryForm from './../store/Users/components/RegistryForm';
import ReportsListContainer from './../store/Reports/components/ReportsListContainer';
import ModalBox from './../common/ModalBox';

import { BiggerButton } from './../themes/basic';

import {
    faArrowAltCircleDown,
  } from "@fortawesome/free-solid-svg-icons";
  import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const RightButtonsBox = () => {
    const loggedUser = useSelector(state=>state.users.logged_user);
    const [ toggleTasksAddForm, setToggleTasksAddForm ] = useState(false);
    const [ toggleProjectAddForm, setToggleProjectAddForm ] = useState(false);
    const [ toggleUserAddForm, setToggleUserAddForm ] = useState(false);
    const [ toggleReportsListContainer, setToggleReportsListContainer ] = useState(false);

    return (
        <div className="right-buttons-box">
            {
                loggedUser.name === "Franek" || loggedUser.name === "Piotrek" || loggedUser.name =="Marian" ? (
                    <div className="item">
                        <BiggerButton
                                variant="primary"
                                title="Rozwiń formularz"
                                onClick={() => setToggleReportsListContainer(prevState => !prevState)}
                        >
                            Raporty
                        </BiggerButton>
                        { toggleReportsListContainer && <ModalBox closeHandler={() => setToggleReportsListContainer(false)}><ReportsListContainer /></ModalBox> }
                    </div>
                ) : ''
            }
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