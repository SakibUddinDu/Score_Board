// select dom elements
const incrementEl = document.querySelector('.lws-increment')
const decrementEl = document.querySelector('.lws-decrement')
const singleResult = document.querySelector('.lws-singleResult')
const addMatchBtn = document.querySelector('.lws-addMatch')
const reset= document.getElementById('reset')
const allMatchesContainer=document.querySelector('.all-matches')

// action identifiers
const INCREMENT = "increment";
const DECREMENT = "decrement";
const ADD_MATCH = "addMatch";
const RESET_MATCHES = "resetMatches";

// action creators
const increment = (id,value) => {
    return {
        type: INCREMENT,
         payload: {
            id,
            value,
        }
    };
};

const decrement = (id, value) => {
    return {
        type: DECREMENT,
        payload: {
            id,
            value,
        }
    };
};
const addMatch = (incrementValue, decrementValue) =>{
    return{
        type: ADD_MATCH,
        payload: {
            id: store.getState().length + 1,
            incrementBy:incrementValue,
            decrementBy:decrementValue
            // value: store.getState().length + Math.floor(Math.random() * 5),
        },
    }
}
const resetMatches = () =>{
    return{
        type: RESET_MATCHES,
    }
}

// initial state
const initialState = [{
    id: 1,
    value: 0,
    incrementBy:1,//input theke
    decrementBy:1,
}]

// helper function 
// function nextMatchId(matches){
//     const maxId = matches.reduce((maxId, match)=>Math.max(match.id, maxId), -1)
// }
// create reducer function
function scoreboardReducer(state = initialState, action) {
    if (action.type === ADD_MATCH) {
        return [
            // console.log(state);
            ...state,
            {
                id:action.payload.id,
                value: 0,
                incrementBy:action.payload.incrementBy,//input theke
                decrementBy:action.payload.decrementBy,   
            },
        ]
            
    
    } else if (action.type === DECREMENT) {
        return {
            ...state,
            value: state.value - action.payload,
        };
    } else if (action.type === DECREMENT) {
        return {
            ...state,
            value: state.value - action.payload,
        };
    } else if (action.type === DECREMENT) {
        return {
            ...state,
            value: state.value - action.payload,
        };
    } else {
        return state;
    }
}

// create store
const store = Redux.createStore(scoreboardReducer);


const render = () => {
    const state = store.getState();
    let matchesMarkup='';
    state.map((match)=>{
       matchesMarkup+=`<div class="match">
       <div class="wrapper">
         <button class="lws-delete">
           <img src="./image/delete.svg" alt="" />
         </button>
         <h3 class="lws-matchName">Match ${match.id}</h3>
       </div>
       <div class="inc-dec">
         <form class="incrementForm">
           <h4>Increment</h4>
           <input type="number" name="increment" class="lws-increment" />
         </form>
         <form class="decrementForm">
           <h4>Decrement</h4>
           <input type="number" name="decrement" class="lws-decrement" />
         </form>
       </div>
       <div class="numbers">
         <h2 class="lws-singleResult">${match.value}</h2>
       </div>
     </div>` 
    })
    console.log(state);
    allMatchesContainer.innerHTML = matchesMarkup;
};

// update UI initially
render();

store.subscribe(render);
// addMatch btnHandler
addMatchBtn.addEventListener("click", ()=>{
    const incrementValue=document.querySelector('.lws-increment');
    const decrementValue=document.querySelector('.lws-decrement');
    store.dispatch(addMatch(incrementValue,decrementValue))
})



// button click listeners
// incrementEl.addEventListener("click", () => {
//     store.dispatch(increment(3));
// });

// decrementEl.addEventListener("click", () => {
//     store.dispatch(decrement(2));
// });
