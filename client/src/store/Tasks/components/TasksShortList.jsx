import React from "react";

import styled from "styled-components";

import { Button } from "../../../themes/basic";

const TasksShortList = ({tasks, deleteProjectHandler}) => {
    const listContainer = tasks.map( item => {
        return (
            <ShortTaskItem key={item._id}>
                <ShortTaskTitle><span>Tytuł:</span> { item.title }</ShortTaskTitle>
                <ShortTaskDesc><span>Opis:</span> { item.description }</ShortTaskDesc>
            </ShortTaskItem>
        )
    })
    console.log("deleteprojecthandler", deleteProjectHandler);
    return(
        <ShortTaskList>
            <h1>Lista tasków {tasks.length}</h1>
            {listContainer}
            <Button
                    className="delete"
                    onClick={() => deleteProjectHandler()}
                    title="zapisz zmiany"
            >
                Usuń projekt
            </Button>
        </ShortTaskList>
    )
}

export default TasksShortList;

const ShortTaskList = styled.div`

`;

const ShortTaskItem = styled.div`
    display:flex;
    flex-direction:column;
    text-align:left;
    span{
        font-weight:bold;
    }
`;

const ShortTaskTitle = styled.div`

`;

const ShortTaskDesc = styled.div`

`;