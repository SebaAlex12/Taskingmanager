import React, { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import MessengersItem from "./MessengersItem";
// import { Button } from "../../../themes/basic";

import MessengersAddForm from "./MessengersAddForm";
import MessengersChannelForm from "./MessengersChannelForm";
import MessengersQuickUsersListForm from "./MessengersQuickUsersListForm";
import { StyledMessengerList } from "../styles/StyledMessengerList";
import { mapReverse } from "../../../common/tools";

const MessengersList = (props) => {

      const {
      filteredUsers,
      selectedUsers,
      selectedChannelId,
      filterSelectedUsersHandler,
    } = props;

    const [ messengers, setMessengers ] = useState([]);

    const mess = useSelector(state => state.messengers.messengers);

    console.log('mess',mess);
    
    useEffect(() => {
        setMessengers(mess);
    },[mess]);

    const messengersReverse = mapReverse(messengers, function (i) {
      return i;
    });

    let n = 0;

    const messengersContent = messengersReverse.map((messenger) => {
      return (
        <MessengersItem
          item={messenger}
          key={n++}
          selectedUsers={selectedUsers}
          filterSelectedUsersHandler={filterSelectedUsersHandler}
        />
      );
    });

  return (
      <StyledMessengerList>
        <div className="mesgs">
          <div className="type_msg">
            <div className="input_msg_write">
              <MessengersQuickUsersListForm
                selectedUsers={selectedUsers}
                selectedChannelId={selectedChannelId}
                filterSelectedUsersHandler={filterSelectedUsersHandler}
              />
              <MessengersChannelForm
                selectedChannelId={selectedChannelId}
                filteredUsers={filteredUsers}
                filterSelectedUsersHandler={filterSelectedUsersHandler}
              />
              <MessengersAddForm filteredUsers={filteredUsers} />
            </div>
          </div>
          <div className="msg_history">
            <div className="messengers-list-box">{messengersContent}</div>
          </div>
        </div>
      </StyledMessengerList>    
  )
}

export default MessengersList;