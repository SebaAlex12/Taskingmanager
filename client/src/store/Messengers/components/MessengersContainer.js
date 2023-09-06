import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { socket } from '../../ini';

import MessengersList from "./MessengersList";
import { StyledMessengersContainer } from "../styles/StyledMessengersContainer";
import MessengersUsersList from "./MessengersUsersList";
import MessangersChatRoomContainer from "./MessangersChatRoomContainer";
import { fetchMessengersByName } from "../actions";

const MessengersContainer = () => {

    const usersIndyvidualArray = {
      _id: "-5",
      name: "[Indyvidual+Channel]",
      status: "Kanał indywidualny",
    };

    const usersEmployeeArray = {
      _id: "-4",
      name: "[Employee]",
      status: "Kanał pracowników",
    };

    const usersManagerArray = {
      _id: "-3",
      name: "[Manager]",
      status: "Kanał menedżerów",
    };

    const usersAdminArray = {
      _id: "-2",
      name: "[Administrator]",
      status: "Kanał administratorów",
    };

    const usersAdminMenegerEmployeeArray = {
      _id: "-1",
      name: "[Administrator+Manager+Employee]",
      status: "Kanał administratorów, menedżerów i pracowników",
    };

    const dispatch = useDispatch();
    const loggedUser = useSelector(state => state.users.logged_user);
    const users = useSelector(state => state.users);

    console.log('loading component',loggedUser);
    

    const [ selectedUsers, setSelectedUsers ] = useState();
    const [ filteredUsers, setFilteredUsers ] = useState();
    const [ selectedChannelId, setSelectedChannelId ] = useState();

    socket.on('chat', function(msg) {
        console.log('chat message iv got it',msg);
        dispatch(fetchMessengersByName({ name: loggedUser.name }));
    });

    useEffect(() => {

      dispatch(fetchMessengersByName({ name: loggedUser.name }));

      setSelectedUsers([
        usersEmployeeArray,
        usersManagerArray,
        usersAdminArray,
        usersAdminMenegerEmployeeArray,
        usersIndyvidualArray,
      ]);
      
      setFilteredUsers(        
        Object.prototype.hasOwnProperty.call(
          localStorage,
          "filteredUsers"
      ) ? JSON.parse(localStorage.getItem("filteredUsers"))
        : null);

      setSelectedChannelId(
        Object.prototype.hasOwnProperty.call(
          localStorage,
          "selectedChannelId"
        )
          ? JSON.parse(localStorage.getItem("selectedChannelId"))
          : null
      );

    },[]);

    const filterSelectedUsersHandler = (selectedChannelId, checkedUser = null) => {
        
          let newUsersSelected = [];
          if (selectedChannelId === "-1") {
            newUsersSelected = users.filter((user) =>
              user.status === "Administrator" ||
              user.status === "Menedżer" ||
              user.status === "Pracownik"
                ? user
                : null
            );
          } else if (selectedChannelId === "-2") {
            newUsersSelected = users.filter((user) =>
              user.status === "Administrator" ? user : null
            );
          } else if (selectedChannelId === "-3") {
            newUsersSelected = users.filter((user) =>
              user.status === "Menedżer" ? user : null
            );
          } else if (selectedChannelId === "-4") {
            newUsersSelected = users.filter((user) =>
              user.status === "Pracownik" ? user : null
            );
          } else if (selectedChannelId === "-5") {
            if (checkedUser !== null) {
              if (checkedUser.checked === true) {
                newUsersSelected = [...filteredUsers, checkedUser.data];
              } else {
                newUsersSelected = filteredUsers.filter((user) =>
                  user._id !== checkedUser.data._id ? user : null
                );
              }
            }
          } else {
            newUsersSelected = users.filter((user) => {
              if (user._id === selectedChannelId) {
                return user;
              } else {
                return null;
              }
            });
          }
          localStorage.setItem("filteredUsers", JSON.stringify(newUsersSelected));
          localStorage.setItem(
            "selectedChannelId",
            JSON.stringify(selectedChannelId)
          );
          setFilteredUsers(newUsersSelected);
          setSelectedChannelId(selectedChannelId);
    };

    const filterUsersHandler = (users) => {
          localStorage.setItem("filteredUsers", JSON.stringify(users));
          setFilteredUsers(users);
    };

    return (
      <StyledMessengersContainer className="messenger-container-box">
         <div className="container">
           <h3 className=" text-center">Wiadomości</h3>
           <div className="messaging">
             <div className="inbox_msg">
               <div className="inbox_people">
                 <div className="headind_srch">
                   <div className="recent_heading">
                     <h4>Recent</h4>
                   </div>
                   <div className="srch_bar">
                     <div className="stylish-input-group">
                       <input
                        type="text"
                        className="search-bar"
                        placeholder="Search"
                      />
                      <span className="input-group-addon">
                        <button type="button">
                          {" "}
                          <i
                            className="fa fa-search"
                            aria-hidden="true"
                          ></i>{" "}
                        </button>
                      </span>{" "}
                    </div>
                  </div>
                </div>
                {
                    selectedUsers && selectedChannelId ? (<MessengersUsersList
                    selectedUsers={selectedUsers}
                    selectedChannelId={selectedChannelId}
                    filterSelectedUsersHandler={filterSelectedUsersHandler}
                  />
                  ) : 'wczytywanie...'
              }
              </div>
              {selectedChannelId == "-5" && filteredUsers ? (
                <MessangersChatRoomContainer
                  filteredUsers={filteredUsers}
                  filterUsersHandler={filterUsersHandler}
                />
              ) : 'wczytywanie...'
              }
              {
                selectedUsers && selectedChannelId && filteredUsers ? (
                <MessengersList
                  filteredUsers={filteredUsers}
                  selectedUsers={selectedUsers}
                  selectedChannelId={selectedChannelId}
                  filterSelectedUsersHandler={filterSelectedUsersHandler}
                />
                ) : 'wczytywanie..'
              }
            </div>
          </div>
        </div>
      </StyledMessengersContainer>
    )

}

export default MessengersContainer;

// class MessengersContainer extends Component {
//   constructor(props) {
//     super(props);

//     const usersIndyvidualArray = {
//       _id: "-5",
//       name: "[Indyvidual+Channel]",
//       status: "Kanał indywidualny",
//     };

//     const usersEmployeeArray = {
//       _id: "-4",
//       name: "[Employee]",
//       status: "Kanał pracowników",
//     };

//     const usersManagerArray = {
//       _id: "-3",
//       name: "[Manager]",
//       status: "Kanał menedżerów",
//     };

//     const usersAdminArray = {
//       _id: "-2",
//       name: "[Administrator]",
//       status: "Kanał administratorów",
//     };

//     const usersAdminMenegerEmployeeArray = {
//       _id: "-1",
//       name: "[Administrator+Manager+Employee]",
//       status: "Kanał administratorów, menedżerów i pracowników",
//     };

//     this.state = {
//       selectedUsers: [
//         usersEmployeeArray,
//         usersManagerArray,
//         usersAdminArray,
//         usersAdminMenegerEmployeeArray,
//         usersIndyvidualArray,
//       ],
//       filteredUsers: [ props.loggedUser ],
//       selectedChannelId: Object.prototype.hasOwnProperty.call(
//         localStorage,
//         "selectedChannelId"
//       )
//         ? JSON.parse(localStorage.getItem("selectedChannelId"))
//         : null,
//     };
//   }
//   componentDidMount() {
//     const {
//       loggedUser,
//       fetchMessengersByName,
//       fetchProjectsByLoggedUserProjects,
//     } = this.props;
//     fetchMessengersByName({ name: loggedUser.name });
//     fetchProjectsByLoggedUserProjects(loggedUser.projects);
//   }

//   static getDerivedStateFromProps(nextProps, nextState) {
//     if (nextProps.users.length > 0 && nextState.selectedUsers.length === 5) {
//       const { loggedUser, users } = nextProps;
//       let selectedUsers = [];
//       let selectedModifyUsers = [];
//       let filteredUsers = [ loggedUser ];

//       if (loggedUser.status === "Klient") {
//         const persons = loggedUser.users.split(",");
//         selectedModifyUsers = users.filter((user) =>
//           persons.includes(user.name) ? user : null
//         );
//         filteredUsers = selectedModifyUsers;
//       } else {
//         selectedModifyUsers = users;
//         filteredUsers = selectedModifyUsers.filter((user) =>
//           user.status !== "Klient" ? user : null
//         );
//       }

//       if (Object.prototype.hasOwnProperty.call(localStorage, "filteredUsers")) {
//         filteredUsers = JSON.parse(localStorage.getItem("filteredUsers"));
//       } else {
//         localStorage.setItem("filteredUsers", JSON.stringify(filteredUsers));
//       }

//       return {
//         selectedUsers: selectedModifyUsers.concat(
//           nextState.selectedUsers,
//           selectedUsers
//         ),
//         filteredUsers,
//       };
//     }
//     return false;
//   }
//   filterSelectedUsersHandler = (selectedChannelId, checkedUser = null) => {
//     const { selectedUsers, filteredUsers } = this.state;

//     let newUsersSelected = [];
//     if (selectedChannelId === "-1") {
//       newUsersSelected = selectedUsers.filter((user) =>
//         user.status === "Administrator" ||
//         user.status === "Menedżer" ||
//         user.status === "Pracownik"
//           ? user
//           : null
//       );
//     } else if (selectedChannelId === "-2") {
//       newUsersSelected = selectedUsers.filter((user) =>
//         user.status === "Administrator" ? user : null
//       );
//     } else if (selectedChannelId === "-3") {
//       newUsersSelected = selectedUsers.filter((user) =>
//         user.status === "Menedżer" ? user : null
//       );
//     } else if (selectedChannelId === "-4") {
//       newUsersSelected = selectedUsers.filter((user) =>
//         user.status === "Pracownik" ? user : null
//       );
//     } else if (selectedChannelId === "-5") {
//       if (checkedUser !== null) {
//         if (checkedUser.checked === true) {
//           newUsersSelected = [...filteredUsers, checkedUser.data];
//         } else {
//           newUsersSelected = filteredUsers.filter((user) =>
//             user._id !== checkedUser.data._id ? user : null
//           );
//         }
//       }
//     } else {
//       newUsersSelected = selectedUsers.filter((user) => {
//         if (user._id === selectedChannelId) {
//           return user;
//         } else {
//           return null;
//         }
//       });
//     }
//     localStorage.setItem("filteredUsers", JSON.stringify(newUsersSelected));
//     localStorage.setItem(
//       "selectedChannelId",
//       JSON.stringify(selectedChannelId)
//     );

//     this.setState({
//       filteredUsers: newUsersSelected,
//       selectedChannelId,
//     });
//   };
//   filterUsersHandler = (users) => {
//     localStorage.setItem("filteredUsers", JSON.stringify(users));
//     this.setState({
//       filteredUsers: users,
//     });
//   };
//   render() {
//     const { selectedUsers, selectedChannelId, filteredUsers } = this.state;
//     return (
//       <StyledMessengersContainer className="messenger-container-box">
//         <div className="container">
//           <h3 className=" text-center">Wiadomości</h3>
//           <div className="messaging">
//             <div className="inbox_msg">
//               <div className="inbox_people">
//                 <div className="headind_srch">
//                   <div className="recent_heading">
//                     <h4>Recent</h4>
//                   </div>
//                   <div className="srch_bar">
//                     <div className="stylish-input-group">
//                       <input
//                         type="text"
//                         className="search-bar"
//                         placeholder="Search"
//                       />
//                       <span className="input-group-addon">
//                         <button type="button">
//                           {" "}
//                           <i
//                             className="fa fa-search"
//                             aria-hidden="true"
//                           ></i>{" "}
//                         </button>
//                       </span>{" "}
//                     </div>
//                   </div>
//                 </div>
//                 <MessengersUsersList
//                   selectedUsers={selectedUsers}
//                   selectedChannelId={selectedChannelId}
//                   filterSelectedUsersHandler={this.filterSelectedUsersHandler}
//                 />
//               </div>
//               {selectedChannelId == "-5" ? (
//                 <MessangersChatRoomContainer
//                   filteredUsers={filteredUsers}
//                   filterUsersHandler={this.filterUsersHandler}
//                 />
//               ) : null}
//               <MessengersList
//                 filteredUsers={filteredUsers}
//                 selectedUsers={selectedUsers}
//                 selectedChannelId={selectedChannelId}
//                 filterSelectedUsersHandler={this.filterSelectedUsersHandler}
//               />
//             </div>
//           </div>
//         </div>
//       </StyledMessengersContainer>
//     );
//   }
// }

// const mapStateToProps = (state) => {
//   return {
//     messengers: state.messengers.messengers,
//     users: state.users.users,
//     loggedUser: state.users.logged_user,
//   };
// };

// export default connect(mapStateToProps, {
//   fetchMessengersByName,
//   fetchProjectsByLoggedUserProjects,
// })(MessengersContainer);
