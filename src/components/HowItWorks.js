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
              <p data-adtags-visited="true">Hello readers, Thanks for visiting my site</p>
              <p data-adtags-visited="true">I would like to explain my trading plan in this short write-up. My trading system identifies the sideways setup and and if price shows weakness outside sideways range then it generates trigger. This helps is getting trade setup with great risk and reward ratio.</p>
              <p data-adtags-visited="true"> Price trades in three directions, uptrend, downtrend and sideways.  If price breaks the sideways trend and shows weakness then it will likely move back to sideways range and that gives a good trading opportunity</p>
              <p data-adtags-visited="true"> My trading system scans various markets (nasdaq 8500+ stocks, european , asian) daily and find the stocks which meets the setup rules. I am currently listing only nasdaq trades here but will other market results in the future</p>

            </div>
          </header>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HowItWorks);
