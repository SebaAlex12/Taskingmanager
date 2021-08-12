import React, { Component } from "react";
import { connect } from "react-redux";

import MailsItem from "./MailsItem";

class MailsList extends Component {
  render() {
    const { items } = this.props;
    const mailsItemsContent =
      items && items.length > 0
        ? items.map(item => <MailsItem key={item._id} item={item} />)
        : "Items are loading ...";

    return (
      <div>
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">Nadawca</th>
              <th scope="col">Odbiorca</th>
              <th scope="col">Nazwa projektu</th>
              <th scope="col">Tytuł</th>
              <th scope="col">Treść</th>
              <th scope="col">Ścieżka do pliku</th>
              <th scope="col">Załączniki</th>
              <th scope="col">Utworzył</th>
              <th scope="col">Utworzono</th>
            </tr>
          </thead>
          {mailsItemsContent}
        </table>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

export default connect(mapStateToProps)(MailsList);
