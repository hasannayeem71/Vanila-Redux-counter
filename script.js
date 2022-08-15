const allCounterContainer = document.getElementById("all-counter-containter");
const resetButton = document.getElementById("reset");
const addCounterGroup = document.getElementById("add-counter");
const counters = document.getElementsByClassName("count-value");

// action identifiers
const INCREMENT = "increment";
const DECREMENT = "decrement";
const ADDCOUNTER = "addCounter";
const RESET = "reset";
// action creators
const increment = (value, id) => {
  return {
    type: INCREMENT,
    payload: { value, id },
  };
};

const decrement = (value, id) => {
  return {
    type: DECREMENT,
    payload: { value, id },
  };
};

const addCounter = (id, diference) => {
  createCounterBox(id, diference);
  return {
    type: ADDCOUNTER,
    payload: { id },
  };
};
const reset = () => {
  return {
    type: RESET,
  };
};

// initial state
const initialState = {
  counter: [
    {
      id: 0,
      value: 0,
    },
  ],
};

// create reducer function
function counterReducer(state = initialState, action) {
  if (action.type === INCREMENT) {
    /*   const newState = state.counter.find(
      (counter) => counter.id === action.payload.id
    ); */
    return {
      ...state,
      counter: state.counter.map((counter) => {
        if (counter.id === action.payload.id) {
          return {
            ...counter,
            value: counter.value + action.payload.value,
          };
        } else {
          return counter;
        }
      }),
    };
  } else if (action.type === DECREMENT) {
    return {
      ...state,
      counter: state.counter.map((counter) => {
        if (counter.id === action.payload.id) {
          return {
            ...counter,
            value: counter.value - action.payload.value,
          };
        } else {
          return counter;
        }
      }),
    };
  } else if (action.type === ADDCOUNTER) {
    return {
      ...state,
      counter: [...state.counter, { id: action.payload.id, value: 0 }],
    };
  } else if (action.type === RESET) {
    return {
      ...state,
      counter: state.counter.map((counter) => {
        return {
          ...counter,
          value: 0,
        };
      }),
    };
  } else {
    return state;
  }
}

// create store
const store = Redux.createStore(counterReducer);

const render = () => {
  const state = store.getState();
  for (let i = 0; i < state.counter.length; i++) {
    const counter = state.counter[i];
    document.getElementById(`textID-${counter.id}`).innerText = counter.value;
  }
};

// update UI initially
render();

store.subscribe(render);

// add new counter button click listener

addCounterGroup.addEventListener("click", () => {
  let diference = Math.floor(Math.random() * 10) + 1;
  const id = store.getState().counter.length;
  store.dispatch(addCounter(id, diference));
});

// reset all
resetButton.addEventListener("click", () => {
  store.dispatch(reset());
});

// create new counter box
const createCounterBox = (id, diference = 1) => {
  const newCounterGroup = document.createElement("div");

  newCounterGroup.innerHTML = `
  <div id="single-counter-container"
            class="p-4 h-auto flex flex-col items-center justify-center space-y-5 bg-white rounded shadow"
          >
            <div id="textID-${id}" class="text-2xl font-semibold count-value">0</div>
            <div class="flex space-x-3">
              <button
                class="bg-indigo-400 text-white px-3 py-2 rounded shadow"
              
                onClick="store.dispatch(increment(${diference}, ${id}))"
              >
                Increment
              </button>
              <button
                class="bg-red-400 text-white px-3 py-2 rounded shadow"
              
                onClick="store.dispatch(decrement(${diference},${id}))"
              >
                Decrement
              </button>
            </div>
          </div>`;
  allCounterContainer.prepend(newCounterGroup);
};
