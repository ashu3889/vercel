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
						
            <p><strong>About</strong></p>
					  <div class="entry-content">
              <p data-adtags-visited="true">Hello readers, Thanks for visiting my site.</p>
              <p data-adtags-visited="true">
                This website list result generated by an algo trading setup. This setup detects weekness in price once it breaks the sideways range and trigger signals.</p>
              <a href="mailto:algo_trader@tickerscanner.com"> 
                Email:algo_trader@tickerscanner.com for any queries on algo.
              </a>
              <p style={{fontSize: '15px', marginTop: '20px'}}> 
                <a 
                  id="follow-button" 
                  target="_blank"
                  class="btn_twitter" 
                  title="Follow @Algo_trader3899 on X"
                  href="https://x.com/trader3899"
                >
                  <i></i>
                  <span class="label" id="l">Follow <b>@Algo_trader3899</b></span>
                </a>
              </p>
            </div>
          </header>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HowItWorks);
