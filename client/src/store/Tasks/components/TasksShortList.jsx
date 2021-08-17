import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

import { WarningButton } from "../../../themes/basic";

const TasksShortList = ({projectName, tasks, deleteTaskHandler, deleteProjectHandler}) => {

    const listContainer = tasks.map( item => {
        return (
            <ShortTaskItem key={item._id}>
                <ShortTaskListContent>
                    <ShortTaskTitle><span>Tytuł:</span> { item.title }</ShortTaskTitle>
                    <ShortTaskDesc><span>Opis:</span> { item.description }</ShortTaskDesc>
                </ShortTaskListContent>
                <WarningButton onClick={() => deleteTaskHandler(item._id)}>
                    <FontAwesomeIcon icon={faTimes} />
                </WarningButton>
            </ShortTaskItem>
        )
    });
    const buttonDeleteProject = tasks.length > 0 ? 
        <div className="message">Żeby usunąć projekt musisz najpierw usunąć wszystkie zadania.</div>
        : <WarningButton
                className="delete"
                onClick={() => deleteProjectHandler()}
                title="zapisz zmiany"
        >
            Usuń projekt
        </WarningButton>;

    return(
        <ShortTaskList>
            <h2>Nazwa projektu: {projectName}</h2>
            <h3>Lista wszystkich zadań: {tasks.length}</h3>
            {listContainer}
            {buttonDeleteProject}
        </ShortTaskList>
    )
}

export default TasksShortList;

const ShortTaskList = styled.div`
    .message{
        color:green;
        font-weight:bold;
        text-align:right;
    }    
`;

const ShortTaskListContent = styled.div`
    display:flex;
    flex-direction:column;
`;

const ShortTaskItem = styled.div`
    display:flex;
    flex-direction:row;
    justify-content:space-between;
    align-items:baseline;
    span{
        font-weight:bold;
    }
`;

const ShortTaskTitle = styled.div`

`;

const ShortTaskDesc = styled.div`

`;