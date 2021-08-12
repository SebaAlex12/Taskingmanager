import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMinusSquare,
  faPencilAlt,
  faPlusSquare,
  faEdit,
  faCertificate,
} from "@fortawesome/free-solid-svg-icons";
// import { useDispatch } from "react-redux";

import CatalogProjectsAddForm from "./CatalogProjectsAddForm";
import CatalogProjectsContainer from "./CatalogProjectsContainer";
import TextFieldGroup from "../../../common/Forms/components/TextFieldGroup";
import TextareaFieldGroup from "../../../common/Forms/components/TextareaFieldGroup";
import Aux from "../../../hoc/Auxiliary";
import { Button, WarningButton } from "../../../themes/basic";

class CatalogItem extends Component {
  constructor(props) {
    super(props);
    const { item } = this.props;
    this.state = {
      editItem: false,
      moreItem: false,
      item: item,
      showWebsitesList: false,
    };
  }
  onChangeHandler = (event) => {
    const { item } = this.state;
    const newItem = {
      ...item,
      [event.target.name]: event.target.value,
    };
    this.setState({
      item: newItem,
    });
  };
  updateItemHandler = async () => {
    const { updateItem } = this.props;
    const { item } = this.state;
    // if (editItem) {
    const response = await updateItem(item);
    //   if (response) {
    this.setState({ editItem: false });
    //   }
    // }
  };
  render() {
    const { item, editItem, moreItem, showWebsitesList } = this.state;
    const { removeItem, updateItem } = this.props;

    // let n = 1;
    // const websitesContent = item.websites
    //   ? item.websites.map((website) => <div key={n++}>{website.name}</div>)
    //   : null;

    const websitesContent = item.websites ? (
      <CatalogProjectsContainer websites={item.websites} />
    ) : null;

    const sum = item.websites ? item.websites.length : 0;

    const itemContent = editItem ? (
      <Aux>
        <td className="url">
          <TextFieldGroup
            type="text"
            title={item.url}
            onChange={this.onChangeHandler}
            name="url"
            value={item.url}
          />
        </td>
        <td className="login">
          {" "}
          <TextFieldGroup
            type="text"
            title={item.login}
            onChange={this.onChangeHandler}
            name="login"
            value={item.login}
          />
        </td>
        <td className="password">
          <TextFieldGroup
            type="text"
            title={item.password}
            onChange={this.onChangeHandler}
            name="password"
            value={item.password}
          />
        </td>
        <td className="multicode">
          <TextFieldGroup
            type="text"
            title={item.multicode}
            onChange={this.onChangeHandler}
            name="multicode"
            value={item.multicode}
          />
        </td>
        <td className="price">
          <TextFieldGroup
            type="text"
            title={item.price}
            onChange={this.onChangeHandler}
            name="price"
            value={item.price}
          />
        </td>
        <td className="websites">
          <Button
            title="Pokaż listę podpiętych stron"
            onClick={() =>
              this.setState({ showWebsitesList: !showWebsitesList })
            }
          >
            <FontAwesomeIcon icon={faCertificate} />
          </Button>
          {showWebsitesList ? websitesContent : null}
        </td>
        <td className="sum">{sum}</td>
        <td className="rank">{item.rank}</td>
        <td className="status">{item.status}</td>
      </Aux>
    ) : (
      <Aux>
        <td className="url">{item.url}</td>
        <td className="login">{item.login}</td>
        <td className="password">{item.password}</td>
        <td className="multicode">{item.multicode}</td>
        <td className="price">{item.price}</td>
        <td className="websites">
          <Button
            title="Pokaż listę podpiętych stron"
            onClick={() =>
              this.setState({ showWebsitesList: !showWebsitesList })
            }
          >
            <FontAwesomeIcon icon={faCertificate} />
          </Button>
          {showWebsitesList ? websitesContent : null}
        </td>
        <td className="sum">{sum}</td>
        <td className="rank">{item.rank}</td>
        <td className="status">{item.status}</td>
      </Aux>
    );

    return (
      <Aux>
        <tr>
          {itemContent}
          <td className="actions">
            {editItem ? (
              <Button onClick={this.updateItemHandler}>
                <FontAwesomeIcon icon={faPlusSquare} />
              </Button>
            ) : (
              <Button onClick={() => this.setState({ moreItem: !moreItem })}>
                <FontAwesomeIcon icon={faEdit} />
              </Button>
            )}
            <Button
              // className="edit"
              onClick={() => this.setState({ editItem: !editItem })}
              title="edytuj rekord"
            >
              <FontAwesomeIcon icon={faPencilAlt} />
            </Button>
            <WarningButton
              onClick={() => removeItem(item._id)}
              className="remove"
            >
              <FontAwesomeIcon icon={faMinusSquare} />
            </WarningButton>
          </td>
        </tr>
        {moreItem ? (
          <tr>
            <td colSpan="2">
              <div className="catalog-item-desc-box">
                <TextareaFieldGroup
                  onChange={this.onChangeHandler}
                  name="description"
                  cols="10"
                  rows="5"
                  value={item.description}
                  placeholder="Dodaj notatkę"
                />
                <Button onClick={this.updateItemHandler}>
                  <FontAwesomeIcon icon={faPencilAlt} />
                </Button>
              </div>
            </td>
            <td colSpan="5">
              <CatalogProjectsContainer websites={item.websites} />
            </td>
            <td colSpan="5">
              <CatalogProjectsAddForm updateItem={updateItem} item={item} />
            </td>
          </tr>
        ) : null}
      </Aux>
    );
  }
}

export default CatalogItem;
