import React, { Component } from "react";
import { connect } from "react-redux";

import MailsList from "./MailsList";
import { fetchMails } from "../actions";

class MailsListContainer extends Component {
  constructor(props) {
    super(props);
    const { fetchMails } = this.props;
    fetchMails();
  }
  render() {
    const { mails } = this.props;
    console.log("mails", mails);
    const mailsListContent =
      mails && mails.length > 0 ? (
        <MailsList items={mails} />
      ) : (
        "List is loading..."
      );
    return (
      <div>
        <h1>Skrzynka mailowa</h1>
        {mailsListContent}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    mails: state.mails.mails
  };
};

export default connect(mapStateToProps, { fetchMails })(MailsListContainer);
