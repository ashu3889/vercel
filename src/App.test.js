import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { shufflecards ,sortcards ,deletecards  ,addDrawnCards ,sortDrawnCards} from './action/action.js';
import cardDeckReducers from './reducer/card_reducer.js';
import drawnCardReducer from './reducer/drawn_cards_reducers.js';
import OperationButton from './component/OperationButton.js';
import Card from './component/Card.js';
import { shallow, mount, render } from 'enzyme';
import { CardDeckBody } from './containers/CardDeckBody.js';
import { ShuffleDeck } from './containers/DrawnCardDeck.js';
import  Container  from './containers/Container.js';



it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});





describe('Components', () => {
    describe('OperationButton Component', () => { 
 // make our assertion and what we expect to happen 
        it('should render without throwing an error', () => {
                expect(shallow(<OperationButton/>).find('.shufflecard').length).toEqual(1)
         })
    });

    describe('Card Component', () => { 
 // make our assertion and what we expect to happen 
        it('should render without throwing an error', () => {
                expect(shallow(<Card/>).find('.card').length).toEqual(1)
         })
    })
});


describe('Actions', () => {
      describe('shufflecards', () => {
         it('has the correct type', () => {
             const action = shufflecards();         
              expect(action.type).toBe('Shuffle');
          });

          it('has the correct payload', () => {
              const action = shufflecards('new comment');
              expect(action.payload).toBe('new comment');
          });
         });

      describe('sortcards', () => {
         it('has the correct type', () => {
             const action = sortcards();      
             expect(action.type).toBe('Sortcards');
          });

          it('has the correct payload', () => {
              const action = shufflecards('new comment');
              expect(action.payload).toBe('new comment');
            });
        });

      describe('deletecards', () => {
          it('has the correct type', () => {
             const action = deletecards();         
             expect(action.type).toBe('DeleteCard');
             });

           it('has the correct payload', () => {
               const action = deletecards('new comment');
               expect(action.payload).toBe('new comment');
            });
        });

      describe('addDrawnCards', () => {
          it('has the correct type', () => {
             const action = addDrawnCards();         
             expect(action.type).toBe('AddDrawnCard');
         });

           it('has the correct payload', () => {
              const action = addDrawnCards('new comment');
              expect(action.payload).toBe('new comment');
          });
        });

       describe('sortDrawnCards', () => {
           it('has the correct type', () => {
              const action = sortDrawnCards();         
              expect(action.type).toBe('SortDrawnCard');
             });

             it('has the correct payload', () => {
                  const action = sortDrawnCards('new comment');
                   expect(action.payload).toBe('new comment');
             });
         });
});


describe('Reducers', () => {

	describe('Card DeckReducers', () => {

      it('handles action with unknown type', () => {
         expect(cardDeckReducers(undefined, {})).toEqual([]);
       });

      it('handles action of type Shuffle', () => {
          const action = { type: 'Shuffle', payload: 'data' };
          expect(cardDeckReducers([], action)).toEqual([]);
        });

      it('handles action of type Sortcards', () => {
           const action = { type: 'Sortcards', payload: 'data' };
           expect(cardDeckReducers([{count: 2,value:'A♣' ,type:'clubs' },{count: 1,value:'A♣' ,type:'clubs' }], action)).toEqual([{count: 1,value:'A♣' ,type:'clubs' },{count: 2,value:'A♣' ,type:'clubs' }]);
        });

       it('handles action of type DeleteCard', () => {
          const action = { type: 'DeleteCard', payload: '1' };
          expect(cardDeckReducers([{count: '1',value:'A♣' ,type:'spades' }], action)).toEqual([]);
        });  
    });

    describe('Drawn Card Reducer', () => {

       it('handles action with unknown type', () => {
         expect(drawnCardReducer(undefined, {})).toEqual([]);
       });

       it('handles action of type AddDrawnCard', () => {
          const action = { type: 'AddDrawnCard', payload: 'data' };
          expect(drawnCardReducer([], action)).toEqual(['data']);
        });


        it('handles action of type SortDrawnCard', () => {
          const action = { type: 'SortDrawnCard', payload: 'data' };
          expect(drawnCardReducer([{count: 2,value:'A♣' ,type:'clubs' },{count: 1,value:'A♣' ,type:'clubs' }], action)).toEqual([{count: 1,value:'A♣' ,type:'clubs' },{count: 2,value:'A♣' ,type:'clubs' }]);
        });

       it('handles action of type ShufflerawnCard', () => {
          const action = { type: 'ShufflerawnCard', payload: 'data' };
           expect(cardDeckReducers([], action)).toEqual([]);
        });
    });
});

describe('Container', () => {
    describe('CardDeckBody container', () => { 
        it('should render without throwing an error', () => {          
             const data =[{count: 1,value:'A♣' ,type:'clubs' }];         
             expect(shallow(<CardDeckBody carddata = {data} />).find('.carddeck').length).toEqual(1)
         })
    });

    describe('DrawnCardDeck container', () => { 
        it('should render without throwing an error', () => {          
             const data =[{count: 1,value:'A♣' ,type:'clubs' }];         
             expect(shallow(<ShuffleDeck carddata = {data} />).find('.drawndeck').length).toEqual(1)
         })
    });

    describe('Container ', () => { 
        it('should render without throwing an error', () => {          
                      
             expect(shallow(<Container/>).length).toEqual(1);
         })
    });
   
   
});
