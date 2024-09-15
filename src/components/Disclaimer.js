import { Link } from 'react-router-dom';
import ListErrors from './ListErrors';
import React from 'react';
import agent from '../agent';
import { connect } from 'react-redux';
import {
  UPDATE_FIELD_AUTH,
  LOGIN,
  LOGIN_PAGE_UNLOADED
} from '../constants/actionTypes';

const mapStateToProps = state => ({ ...state.auth });

const mapDispatchToProps = dispatch => ({
  onChangeEmail: value =>
    dispatch({ type: UPDATE_FIELD_AUTH, key: 'email', value }),
  onChangePassword: value =>
    dispatch({ type: UPDATE_FIELD_AUTH, key: 'password', value }),
  onSubmit: (email, password) =>
    dispatch({ type: LOGIN, payload: agent.Auth.login(email, password) }),
  onUnload: () =>
    dispatch({ type: LOGIN_PAGE_UNLOADED })
});

class Disclaimer extends React.Component {
  constructor() {
    super();
    this.changeEmail = ev => this.props.onChangeEmail(ev.target.value);
    this.changePassword = ev => this.props.onChangePassword(ev.target.value);
    this.submitForm = (email, password) => ev => {
      ev.preventDefault();
      this.props.onSubmit(email, password);
    };
  }

  componentWillUnmount() {
    this.props.onUnload();
  }

  render() {
    const email = this.props.email;
    const password = this.props.password;
    return (
      <div className="auth-page">
        <div className="container page">
					<header class="entry-header">
						
						<h2 class="entry-title" style={{ fontFamily: 'Titillium Web'}}>Disclaimer</h2>
					  <div class="entry-content">
              <p data-adtags-visited="true">
                I would like to remind you that the data contained in this website is not necessarily real-time nor accurate. All CFDs (stocks, indexes, futures), cryptocurrencies, and Forex prices are not provided by exchanges but rather by market makers, and so prices may not be accurate and may differ from the actual market price, meaning prices are indicative and not appropriate for trading purposes. Therefore I doesn't bear any responsibility for any trading losses you might incur as a result of using this data. I will not accept any liability for loss or damage as a result of reliance on the information including data, quotes, charts and buy/sell signals contained within this website. Please be fully informed regarding the risks and costs associated with trading the financial markets, it is one of the riskiest investment forms possible.
              </p>
            </div>
          </header>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Disclaimer);
