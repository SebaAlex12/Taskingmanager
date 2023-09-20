import React, { Component } from "react";
import { useSelector } from "react-redux";
import { Routes, Route, Link } from "react-router-dom";
// import io from "socket.io-client";
// import { socket } from "../../store/ini";

import { logoutUser } from "../../store/Users/actions";
import Tasks from "../../root/Tasks";
// import Payments from "../../root/Payments";
import Messengers from "../../root/Messengers";
import Seo from "../../root/Seo";
import Patterns from "../../root/Patterns";
import MailsListContainer from "../../store/Mails/components/MailsListContainer";
import CalendarContainer from "../../store/Calendar/components/CalendarContainer";
// import Interview from "../../store/Cameras/components/Interview";
import MessagesAlertList from "../../store/Messages/components/MessagesAlertList";
import Catalogs from "../../root/Catalogs";
import ImportBasic from "../../store/Import/components/ImportBasic";
import { DashboardBox } from './../basic';

// import Preloader from "../../common/Preloader";
import { updateMessenger } from "../../store/Messengers/actions";
import { updateAlertMessages } from "../../store/Messages/actions";

const Dashboard = () => {

  const { logged_user } = useSelector(state => state.users);

  if(!logged_user){
    window.location.href = "/";    
  }

  const logoutUserHandler = () => {
      logoutUser();
      localStorage.removeItem("jwtTokenAuthorization");
//     localStorage.removeItem("companyName");
      window.location.href = "/";
  }

  return(
      <DashboardBox>
        <div className="content-box">
            {/* <MessagesAlertList /> */}
            <div className="center-buttons-box">
            <Link className="btn btn-default" to="/dashboard/tasks">
              Zadania
            </Link>
            <Link className="btn btn-default" to="/dashboard/messenger">
              Komunikator
            </Link>
            {/* <Link className="btn btn-default" to="/calendar">
              Kalendarz
            </Link> */}
            <button className="btn btn-default" onClick={logoutUserHandler}>
              Logout
            </button>
        </div>
        {/* <BrowserRouter className="container"> */}
        <Routes>
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/messenger" element={<Messengers />} />
          {/* <Route exact path="/" component={Tasks} />
          <Route exact path="/messenger" component={Messengers} />
          <Route exact path="/mails" component={MailsListContainer} />
          <Route exact path="/imports" component={ImportBasic} />
          <Route exact path="/calendar" component={CalendarContainer} />
          {loggedUser.status === "Administrator" ? (
            <React.Fragment>
                <Route exact path="/patterns" component={Patterns} />
                <Route exact path="/seo" component={Seo} />
                <Route exact path="/catalogs" component={Catalogs} />
            </React.Fragment>
          ) : null} */}
        </Routes>
        {/* </BrowserRouter> */}
        </div>
      </DashboardBox>
    )
}

export default Dashboard;


// class Dashboard extends Component {
//   constructor(props) {
//     super(props);
//     const { updateMessenger, updateAlertMessages, loggedUser } = this.props;
//   }
//   logoutUserHandler = async () => {
//     const { logoutUser } = this.props;
//     localStorage.removeItem("companyName");
//     const reload = () => {
//       window.location.href = "/";
//     };
//     await logoutUser();
//     await reload();
//   };
//   render() {
//     const { loggedUser } = this.props;

//     return (
//       <div className="dashboard-box">
//         <MessagesAlertList />
//         <div className="logged-user">
//           Witaj:{" "}
//           {loggedUser
//             ? `${loggedUser.name} / ${loggedUser.status} : [ firma: ${loggedUser.company}]`
//             : null}
//         </div>
//         <Link className="btn btn-default" to="/messenger">
//           Komunikator
//         </Link>
//         <Link className="btn btn-default" to="/tasks">
//           Zadania
//         </Link>
//         <Link className="btn btn-default" to="/calendar">
//           Kalendarz
//         </Link>
//         {loggedUser.status === "Administrator" ? (
//           <React.Fragment>
//             <Link className="btn btn-default" to="/imports">
//               Importy
//             </Link>
//           </React.Fragment>
//         ) : null}
//         <button className="btn btn-default" onClick={this.logoutUserHandler}>
//           Logout
//         </button>
//         <BrowserRouter className="container">
//           <Route exact path="/tasks" component={Tasks} />
//           <Route exact path="/" component={Tasks} />
//           <Route exact path="/messenger" component={Messengers} />
//           <Route exact path="/mails" component={MailsListContainer} />
//           <Route exact path="/imports" component={ImportBasic} />
//           <Route exact path="/calendar" component={CalendarContainer} />
//           {loggedUser.status === "Administrator" ? (
//             <React.Fragment>
//                 <Route exact path="/patterns" component={Patterns} />
//                 <Route exact path="/seo" component={Seo} />
//                 <Route exact path="/catalogs" component={Catalogs} />
//             </React.Fragment>
//           ) : null}
//         </BrowserRouter>
//       </div>
//     );
//   }
// }

// const mapStateToProps = (state) => {
//   return {
//     loggedUser: state.users.logged_user,
//   };
// };

// export default connect(mapStateToProps, {
//   logoutUser,
//   updateMessenger,
//   updateAlertMessages,
// })(Dashboard);
