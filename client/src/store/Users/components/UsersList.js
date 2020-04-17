import React, { Component } from "react";
import { connect } from "react-redux";

import TextFieldGroup from "../../../common/Forms/components/TextFieldGroup";

import { BiggerButton, SmallerButton, ListBox } from "../../../themes/basic";
import { StyledUserList } from "../styles/StyledUserList";
import {
  faTimes,
  faArrowAltCircleDown,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { removeUser, updateUser } from "../actions";
import RegistryForm from "./RegistryForm";
import UsersLastActiveList from "./UsersLastActiveList";

import { updateFilter } from "../../Filters/actions";
import UsersItem from "./UsersItem";

class UsersList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userFilterName: "",
      toggleRegistryForm: false,
      toggleUsersList: false,
    };
  }
  removeUserHandler = (id) => {
    const { removeUser } = this.props;
    removeUser(id);
  };
  updateUserHandler = (data) => {
    const { updateUser } = this.props;
    updateUser(data);
  };
  removeProjectFilterResponsiblePersonHandler = () => {
    const {
      updateFilter,
      filters: { statuses, priorities, projectName },
    } = this.props;
    updateFilter({ statuses, priorities, projectName, responsiblePerson: "" });
  };
  filterItems = (items) => {
    const { userFilterName } = this.state;
    const filteredItems = items.filter((item) => {
      return item.name.toLowerCase().indexOf(userFilterName) !== -1;
    });
    if (document.querySelector(".remove-filter")) {
      if (userFilterName.length > 0) {
        document.querySelector(".remove-filter").classList.add("active");
      } else {
        document.querySelector(".remove-filter").classList.remove("active");
      }
    }
    return filteredItems;
  };
  toggleClassHandler = (event) => {
    event.preventDefault();
    event.target.classList.toggle("active");
    this.setState({
      userFilterName: "",
    });
  };
  onChangeInput = (event) => {
    this.setState({
      ...this.state,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };
  render() {
    const {
      loggedUser,
      filters: { responsiblePerson },
    } = this.props;
    const { toggleRegistryForm, toggleUsersList, userFilterName } = this.state;

    // check if someone created new company
    const insertedCompanyName = localStorage.getItem("companyName");

    let users = this.state.users > 0 ? this.state.users : this.props.users;

    if (users && users.length > 0) {
      users = this.filterItems(users);
    }

    const usersContent = users.map((user) => {
      return <UsersItem item={user} key={user._id} />;
    });
    const windowHeight = window.innerHeight - 50;
    const clazz =
      responsiblePerson !== ""
        ? "glyphicon glyphicon-filter active"
        : "glyphicon glyphicon-filter";

    const btn_clazz = toggleRegistryForm ? "flow-box active" : "flow-box";
    const btn_list_clazz = toggleUsersList
      ? "user-list-flow-box active"
      : "user-list-flow-box";

    return (
      <StyledUserList>
        <div className="users-box">
          <UsersLastActiveList />
          {loggedUser.status === "Administrator" ||
          loggedUser.status === "Menedżer" ? (
            <div className={btn_clazz}>
              <BiggerButton
                variant="primary"
                title="Rozwiń formularz"
                onClick={() =>
                  this.setState({
                    toggleRegistryForm: !toggleRegistryForm,
                  })
                }
              >
                <FontAwesomeIcon icon={faArrowAltCircleDown} />
                <span>Dodaj użytkownika</span>
              </BiggerButton>
              {toggleRegistryForm ? <RegistryForm /> : null}
            </div>
          ) : null}
          <div className={btn_list_clazz}>
            {!insertedCompanyName ? (
              <React.Fragment>
                <BiggerButton
                  variant="primary"
                  title="Pokaż listę użytkowników"
                  onClick={() =>
                    this.setState({
                      toggleUsersList: !toggleUsersList,
                    })
                  }
                >
                  <FontAwesomeIcon icon={faArrowAltCircleDown} />
                  <span>Lista użytkowników</span>
                </BiggerButton>
                <i
                  className={clazz}
                  onClick={
                    responsiblePerson !== ""
                      ? this.removeProjectFilterResponsiblePersonHandler
                      : null
                  }
                ></i>
              </React.Fragment>
            ) : null}
            {toggleUsersList ? (
              <ListBox
                className="users-list"
                style={{ height: `${windowHeight}px` }}
              >
                <SmallerButton
                  className="remove-filter"
                  onClick={this.toggleClassHandler}
                >
                  <FontAwesomeIcon title="usuń filtrowanie" icon={faTimes} />
                </SmallerButton>
                <div className="filter-box">
                  <TextFieldGroup
                    onChange={this.onChangeInput}
                    value={userFilterName}
                    type="text"
                    name="userFilterName"
                    className="form-control"
                    placeholder="filtruj po nazwie"
                    title="filtruj po nazwie"
                  />
                </div>
                <div className="items">{usersContent}</div>
              </ListBox>
            ) : null}
          </div>
        </div>
      </StyledUserList>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    users: state.users.users,
    loggedUser: state.users.logged_user,
    filters: state.filters.filters,
  };
};

export default connect(mapStateToProps, {
  removeUser,
  updateUser,
  updateFilter,
})(UsersList);
