import styled from "styled-components";

export const StyledCalendarAddForm = styled.div`
  .calendar-add-form-box {
    display: block;
  }
  .calendar-add-form-box form {
    position: relative;
  }
  .calendar-add-form-box label {
    margin-left: 5px;
  }
  .calendar-add-form-box .message {
    color: red;
  }
  .calendar-add-form-box .types-box {
    display: flex;
    flex-direction: column;
    float: left;
    margin-right: 20px;
  }
  .calendar-add-form-box .time-box {
    display: flex;
    flex-direction: column;
    float: left;
  }
  .calendar-add-form-box input[type="submit"] {
    position: absolute;
    right: 0px;
    top: 0px;
  }
`;
