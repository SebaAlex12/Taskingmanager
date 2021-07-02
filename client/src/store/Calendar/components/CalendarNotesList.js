import React from "react";
import { useDispatch } from "react-redux";
import moment from "moment/min/moment-with-locales";
import styled from "styled-components";

import { Button } from "../../../themes/basic";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { removeCalendar } from "../actions";

const CalendarNotesList = (props) => {

    const dispatch = useDispatch();
    const { noteDailyEvents, closeModal } = props;
    const removeEvent = async (id) => {
        const result = window.confirm(
            "Czy napewno chcesz usunąć wydarzenie ?"
        );
        if (result === true) {
            const response = await dispatch(removeCalendar(id));
            if (response) {
              closeModal();
            }
      }
    };

    const listContainer = noteDailyEvents.length > 0 && (
        noteDailyEvents.map(dailyEvent => {
            return(
                        <tr key={dailyEvent._id}>
                          <td>{dailyEvent.title}</td>
                          <td>
                            <textarea cols="60" rows="6" disabled defaultValue={dailyEvent.description} />
                          </td>
                          <td>
                            {moment(new Date(dailyEvent.selectedDate))
                              .locale("pl")
                              .format("HH:mm:ss")}
                          </td>
                          <td>
                            {moment(new Date(dailyEvent.createdAt)).locale("pl").format("LLLL")}
                          </td>
                          {/* <td>{dailyEvent.projectName}</td>
                          <td>{dailyEvent.status}</td>
                          <td>{dailyEvent.priority}</td>
                          <td>{dailyEvent.termAt}</td> */}
                          <td>
                            <Button
                              onClick={() => removeEvent(dailyEvent._id)}
                              title="Usuń wydarzenie"
                            >
                              <FontAwesomeIcon icon={faTimes} />
                            </Button>
                          </td>
                        </tr>
            );
        })
    );
    return (
      <CalendarNotesListStyled>
        <h2>
          Lista przypisanych notatek na dzień: <br />
          {noteDailyEvents.length > 0
            ? moment(new Date(noteDailyEvents[0].selectedDate))
                .locale("pl")
                .format("LLLL")
            : null}
        </h2>
        <table>
          <thead>
            <tr>
              <th>Tytuł</th>
              <th>Opis</th>
              <th>Godzina</th>
              <th>Utworzone</th>
              {/* <th>Projekt</th>
              <th>Stan</th>
              <th>Priorytet</th>
              <th>Termin</th> */}
              <th>Akcje</th>
            </tr>
          </thead>
          <tbody>{listContainer}</tbody>
        </table>
      </CalendarNotesListStyled>
    );
}

export default CalendarNotesList;

const CalendarNotesListStyled = styled.div`
`;