// Step 2: Create actions and reducers and call them in the

// Set up initial states
const initialStates = {
  books: [],
  searchTerm: ""
};

export const FETCH_BOOKS_SUCCEEDED = "FETCH_BOOKS_SUCCEEDED";
export const SEARCH = "SEARCH";

// Action: takes in payload and return an action object with type and payload
export const fetchBooksSuccess = payload => ({
  type: "FETCH_BOOKS_SUCCEEDED",
  payload
});

// Action has type and payload (what the input parameters are)
export const search = payload => ({
  type: SEARCH,
  payload
});

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
