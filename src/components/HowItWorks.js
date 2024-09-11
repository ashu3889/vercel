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

class HowItWorks extends React.Component {
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
						
						<h1 class="entry-title">Trading plan</h1>
					  <div class="entry-content">
              <p data-adtags-visited="true">Hello readers, Thanks for visiting my site.</p>
              <p data-adtags-visited="true"> This website lists the trades made by an algorithmic trading system that searches the different markets (the Nasdaq 8500+ stocks, European, and Asian stock markets) every day to identify the stocks that satisfy the trading setup rules.</p>
              <p data-adtags-visited="true"> This algo setup identifies the stock which moves in sideways trend and waits for the price to break the sideways range. If price shows weakness outside sideways range then price will likely move back to sideways range and present an opportunity with good risk and reward ratio. This system detects that point of inflection and generate the triggers. </p>
            </div>
          </header>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HowItWorks);
