// select dom elements
const addMatchBtn = document.querySelector(".lws-addMatch");
const resetBtn = document.querySelector(".lws-reset");
const allMatchesContainer = document.querySelector(".all-matches");

// action identifiers
const INCREMENT = "increment";
const DECREMENT = "decrement";
const ADD_MATCH = "addMatch";
const DELETE_MATCH = "deleteMatches";
const RESET_MATCHES = "resetMatches";

// action creators
const increment = (id, value) => {
  return {
    type: INCREMENT,
    payload: {
      id,
      value,
    },
  };
};

const decrement = (id, value) => {
  return {
    type: DECREMENT,
    payload: {
      id,
      value,
    },
  };
};

const addMatch = () => {
  return {
    type: ADD_MATCH,
    payload: {
      id: store.getState().length + 1,
    },
  };
};
// const deleteMatches = () => {
//   return {
//     type: DELETE_MATCH,
//   };
// };
const resetMatches = () => {
  return {
    type: RESET_MATCHES,
  };
};

// initial state
const initialState = [
  {
    id: 1,
    value: 0,
  },
];

// create reducer function
function scoreboardReducer(state = initialState, action) {
  if (action.type === ADD_MATCH) {
    return [
      ...state,
      {
        id: action.payload.id,
        value: 0,
      },
    ];
  } else if (action.type === INCREMENT) {
    const newMatches = state.map((item) => {
      if (item.id === action.payload.id) {
        return { ...item, value: item.value + Number(action.payload.value) };
      } else {
        return item;
      }
      console.log(newMatches)
    });
    return newMatches;
  } else if (action.type === DECREMENT) {
    const newMatches = state.map((item) => {
      if (item.id === action.payload.id) {
        return { ...item, value: item.value - Number(action.payload.value) };
      } else {
        return item;
      }
    });
    return newMatches;
  } else if (action.type === RESET_MATCHES) {
    const resetedMatches = state.map((item) => ({...item, value: 0 }));
    return resetedMatches;
  } else if (action.type === DELETE_MATCH) {
    const newMatches = state.filter((item) => item.id === action.payload);
    return newMatches;
  } else {
    return state;
  }
}

// create store
const store = Redux.createStore(scoreboardReducer);

// increment Score handler
const incrementHandler = (id, formEl) => {
  const input = formEl.querySelector(".lws-increment");
  const value = Number(input.value);
  console.log(value);

  if (value > 0) {
    store.dispatch(increment(id, value));
  }
};

const decrementHandler = (id, formEl) => {
  const input = formEl.querySelector(".lws-decrement");
  const value = Number(input.value);
  const match = store.getState().find((match) => match.id === id);

  if (value > 0 && match.value >= value) {
    store.dispatch(decrement(id, value));
  } else {
    const singleResult = document.querySelector(".lws-singleResult");
    singleResult.innerHTML = 0;
  }
};

const render = () => {
  const state = store.getState();
  let matchesMarkup = "";
  state.map((match) => {
    console.log(match.id);
    console.log(store.getState())
    matchesMarkup += `<div class="match">
       <div class="wrapper">
         <button class="lws-delete">
           <img src="./image/delete.svg" alt="" />
         </button>
         <h3 class="lws-matchName">Match ${match.id}</h3>
       </div>
       <div class="inc-dec">
         <form  class="incrementForm" onsubmit="event.preventDefault(); incrementHandler(${match.id}, this)">
           <h4>Increment</h4>
           
           <input type="number" name="increment" class="lws-increment" />
         </form>

         <form class="decrementForm" onsubmit="event.preventDefault(); decrementHandler(${match.id}, this)">
           <h4>Decrement</h4>
           <input type="number" name="decrement" class="lws-decrement" />
         </form>
       </div>
       <div class="numbers">
         <h2 class="lws-singleResult">${match.value}</h2>
       </div>
     </div>`;
  });
  allMatchesContainer.innerHTML = matchesMarkup;
};

// update UI initially
render();
store.subscribe(render);

// addMatch btnHandler
addMatchBtn.addEventListener("click", () => {
  store.dispatch(addMatch());
});
resetBtn.addEventListener("click", () => {
  store.dispatch(resetMatches());
});
// deleteBtn.addEventListener("click", () => {
//   store.dispatch(deleteMatches());
// });
