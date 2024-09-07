		import React ,{Component} from 'react';		
		// import { connect } from "react-redux";
		// import FinalYearlyBPB from './final_yearly_bpb.js';
        //import TestJaga from './test_final_yearly_bpb.js';
        import { Switch, Route } from 'react-router-dom';


		// // import Straddle from './straddle/straddle.js';
	

		// // import FourHourlyNSE from './four_ttf/executer';
		// // import FourHourly from './four_ttf/executor_nasdaq';
		// import Monthly2024 from './nasdaq_2024/monthlyStockCalulator';
		// import Weekly2024 from './nasdaq_2024/weaklyStockCalculator';
		// import UltimateOptions2024 from './nasdaq_2024/ultimateOptions';
		import Results from './result';


		
		
		// import Monthly from './Trade_Management/monthlyStockCalulator';
		// import Weekly from './Trade_Management/weaklyStockCalculator';
		// import UltimateOptions from './Trade_Management/ultimateOptions';
		// import UltimateOptionsTM from './Trade_Management/ultimateOption_TM';

		
		
		// import UltimateDTTFCalculator from './D_TTF/tradeCalculator';
		// import YTC from './ytc/final_yearly_bpb';
		// import YTCBitcoin from './ytc/final_yearly_bpb_bitcoin';
		// import YTCCoindDcx from './ytc/final_year_coindcx';
		// // YTCCoindcx

		
		// import YTC_CLOSE from './ytc/final_yearly_bpb_bitcoin';
		// import Search from './stocks/findStocks';

		// import ThirtyWeekly from './30min/weeklyStockCalculator';
		// import ThirtyDaily from './30min/dailyStockCalculator.js';
		// import Thirty from './30min/tradeCalculator_5.js';

		// import FindBitcoin from './bitcoin/finder/findAllBitcoin';
		// import FindBitcoinMonthly from './bitcoin/BitcoinFilter/monthlyFinder';
		// import FindBitcoinWeekly from './bitcoin/BitcoinFilter/weeklyFinder';
		// import ExecuteHourly from './bitcoin/executer/hourly';
		// import ExecuteFourHourly from './bitcoin/executer/fourHourly';
		// import EMACalculator from './ema/emaAlgo.js';

		// import EMACalculatorNew from './ema/ema_new.js';


		// import Crypto2023M from './2023/crypto/monthly/monthlyCalculator';
		// import Crypto2023W from './2023/crypto/weekly/weeklyCalculator';
		// import Crypto2023H from './2023/crypto/hourly/executor';

		// import CryptoHourly from './bitcoin/ultimateOptions';


		

		// <Route exact path='/weekly' component={Weekly}/>
		
		//    {/* <Route exact path='/hourly' component={UltimateOptionsTM}/>

		// <Route exact path='/directionalD' component={DirectionalDaily}/>
		// <Route exact path='/directionalW' component={DirectionalWeekly}/> */}

				


		export default  class Board extends Component{

		  render(){

		    return(
		       <div>
		        <Switch>
					{/* <Route exact path='/m' component={Monthly2024}/>
					<Route exact path='/w' component={Weekly2024}/>
					<Route exact path='/h' component={UltimateOptions2024}/> */}
					<Route exact path='/result' component={Results}/>

					{/* <Route exact path='/cryptoM' component={Crypto2023M}/>
					<Route exact path='/cryptoW' component={Crypto2023W}/>
					<Route exact path='/cryptoH' component={Crypto2023H}/>	
					<Route exact path='/30W' component={ThirtyWeekly}/>
					<Route exact path='/30' component={Thirty}/>
					<Route exact path='/30D' component={ThirtyDaily}/>
					<Route exact path='/ytc' component={YTC}/>
					<Route exact path='/ytcB' component={YTCBitcoin}/>
					<Route exact path='/ytcC' component={YTCCoindDcx}/>
					<Route exact path='/ytc1' component={YTC_CLOSE}/>
					<Route exact path='/monthly' component={Monthly}/>
					<Route exact path='/weekly' component={Weekly}/>
					<Route exact path='/hourly' component={UltimateOptions}/>
					<Route exact path='/findAllBitcoin' component={FindBitcoin}/>
					<Route exact path='/bitcoinMonthly' component={FindBitcoinMonthly}/>
					<Route exact path='/bitcoinWeekly' component={FindBitcoinWeekly}/>
					<Route exact path='/bitcoinHourly' component={ExecuteHourly}/>	
					<Route exact path='/luna' component={ExecuteFourHourly}/>
					<Route exact path='/ema' component={EMACalculator}/>
					<Route exact path='/ema_new' component={EMACalculatorNew}/>
					<Route exact path='/search' component={Search}/>
					<Route exact path='/fourHour' component={FourHourly}/>
					<Route exact path='/fourNSE' component={FourHourlyNSE}/>
					<Route exact path='/cryptoHourly' component={CryptoHourly}/> */}
                </Switch>		 
		        </div>)
		    }
		}

