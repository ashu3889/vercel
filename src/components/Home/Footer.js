import React from 'react';
import '../styles.css';

const Footer = ({ appName, token }) => {
  if (token) {
    return null;
  }
  return (
    <div className="banner footer-banner">
      <div className="container">
        <p style={{fontSize: '15px'}}>Disclaimer: I would like to remind you that the data contained in this website is not necessarily real-time nor accurate. All CFDs (stocks, indexes, futures), cryptocurrencies, and Forex prices are not provided by exchanges but rather by market makers, and so prices may not be accurate and may differ from the actual market price, meaning prices are indicative and not appropriate for trading purposes. Therefore I doesn't bear any responsibility for any trading losses you might incur as a result of using this data. I will not accept any liability for loss or damage as a result of reliance on the information including data, quotes, charts and buy/sell signals contained within this website. Please be fully informed regarding the risks and costs associated with trading the financial markets, it is one of the riskiest investment forms possible.</p>
        <p style={{fontSize: '15px'}}> © 2024 Tickerscanner.com, All rights reserved.</p>
      </div>
    </div>
  );
};

export default Footer;
