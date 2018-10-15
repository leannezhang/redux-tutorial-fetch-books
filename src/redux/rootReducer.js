// Step 2: Create actions and reducers
// You can call the actions from the component or the store

// Set up initial states
const initialStates = {
  books: [],
  searchTerm: ""
};

export const FETCH_BOOKS_SUCCEEDED = "FETCH_BOOKS_SUCCEEDED";
export const SEARCH = "SEARCH";

// ActionCreator: takes in payload and return an action object with type and payload
export const fetchBooksSuccess = payload => ({
  type: "FETCH_BOOKS_SUCCEEDED",
  payload
});

export const search = payload => ({
  type: SEARCH,
  payload
});

// Reducer takes in initialStates and an action object
export default function reducers(state = initialStates, action) {
  switch (action.type) {
    case FETCH_BOOKS_SUCCEEDED:
      return { ...state, books: action.payload };
    case SEARCH:
      return { ...state, searchTerm: action.payload };
    default:
      return state;
  }
}
