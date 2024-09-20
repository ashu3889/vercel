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
						
            <p><strong>How to use this tool.</strong></p>
					  <div class="entry-content">
              {/* <p style={{ fontFamily: 'Titillium Web'}}></p> */}
              <ul style={{paddingLeft: 50}}>
                <li>1. Select the market ex. Nasdaq and choose the trade type "buy" or "sell" in home page.</li>
                <li>2. Pick the latest stock and analyze the chart (timeframe: daily candle) in tradingview.com </li>
                <li>3. If risk and reward ratio is favourable, then plan entry and exit point should be 2% of the entry price. Goal is to take only 2% and exit. </li>
                <li>4. This trade should ideally complete in  max 2-3 days considering the volume is sufficient. If not, then exit after 3 days and plan a entry in new stock (follow first step)</li>
              </ul>

              <p style={{ fontFamily: 'Titillium Web'}} >Trading Setup rule</p>
              <ul style={{paddingLeft: 50}}>
                <li style={{listStyle: 'auto'}}>Detects a sideways trend and draw sideways support and resistance line.</li>
                <li style={{listStyle: 'auto'}}>Wait for price to break sideways range and check price strength post breakout.</li>
                <li style={{listStyle: 'auto'}}>If price shows weakness, plan the entry, this will give an entry with good risk:reward ratio</li>
              </ul>
            </div>
          </header>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HowItWorks);
