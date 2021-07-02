import React from "react";
import { Dispatch } from "redux";
import { useDispatch } from "react-redux";
import { faCalendarCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { addCalendar } from "../actions";
import { Button } from "../../../themes/basic";

interface Iprops{
  eventId: number | undefined,
  userId: number | undefined,
  eventType: string,
  title: string,
  description: string | undefined,
  selectedDate: string,
  status: string,
  btnTitle: string | undefined,
  disabled: boolean | undefined
}

const CalendarQuickAddButton = (props:any) => {
  const dispatch = useDispatch();
  const {
    eventId,
    userId,
    eventType,
    title,
    description,
    selectedDate,
    status,
    btnTitle,
    disabled,
  } = props;
  const data = {
    eventId: eventId ? eventId : "",
    userId: userId ? userId : "",
    eventType: eventType ? eventType : "",
    title: title ? title : "",
    description: description ? description : "",
    selectedDate: selectedDate ? selectedDate : "",
    status: status ? status : "",
  };

  const addHandler = (dispatch:Dispatch, data:any) => {
    dispatch(addCalendar(data));
  };

  return (
    <Button
      title={btnTitle}
      onClick={() => addHandler(dispatch, data)}
      disabled
    >
      <FontAwesomeIcon icon={faCalendarCheck} />
    </Button>
  );
};

export default CalendarQuickAddButton;
