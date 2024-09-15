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
            <p><strong>Disclaimer for TickerScanner.com</strong>
            </p><p><strong>1. No Financial Advice</strong></p><p>The information provided on TickerScanner.com is for general informational purposes only and does not constitute financial advice. The content on this site is not intended to be a substitute for professional financial, investment, or tax advice. Always consult with a qualified financial advisor, investment professional, or tax professional before making any investment decisions or financial commitments.</p><p><strong>2. Accuracy and Reliability</strong></p><p>While we strive to ensure that the information on TickerScanner.com is accurate and up-to-date, we make no warranties or representations of any kind, express or implied, about the completeness, accuracy, reliability, or suitability of the information provided. The financial markets are dynamic and information can change rapidly. Any reliance you place on the information found on this website is strictly at your own risk.</p><p><strong>3. No Endorsement</strong></p><p>TickerScanner.com may contain links to third-party websites or resources. These links are provided for convenience and informational purposes only. We do not endorse, guarantee, or take responsibility for the content, accuracy, or reliability of any external sites. Your use of any linked sites is at your own risk.</p><p><strong>4. Investment Risks</strong></p><p>Investing in financial markets involves risk, including the risk of losing capital. Past performance of any financial product, security, or market is not indicative of future results. We do not guarantee any specific outcomes or returns on investments. It is important to conduct your own research and consider your individual financial situation and risk tolerance before making investment decisions.</p><p><strong>5. Limitation of Liability</strong></p><p>To the fullest extent permitted by law, TickerScanner.com and its affiliates, partners, and employees will not be liable for any direct, indirect, incidental, special, consequential, or punitive damages arising out of or in connection with the use of this website, the information provided, or any decisions made based on such information.</p><p><strong>6. Changes to the Disclaimer</strong></p><p>TickerScanner.com reserves the right to update or modify this disclaimer at any time. Changes will be effective immediately upon posting to this website. It is your responsibility to review this disclaimer periodically for any updates.</p><p><strong>7. Contact Information</strong></p><p>For any questions or concerns regarding this disclaimer or the content on TickerScanner.com, please contact us at algo_trader@tickerscanner.com.</p>
          </header>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Disclaimer);
