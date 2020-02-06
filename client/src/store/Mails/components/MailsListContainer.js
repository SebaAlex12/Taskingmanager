import React, { Component } from 'react';
import { connect } from 'react-redux'; 

import { fetchMails } from '../actions';

class MailsListContainer extends Component {
    constructor(props){
        super(props);
        const { fetchMails } = this.props;
        fetchMails();
    }
    render() {
        return (
            <div>
                <h1>Skrzynka mailowa</h1>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        mails: state.mails.mails
    }
}

export default connect( mapStateToProps, { fetchMails })(MailsListContainer);