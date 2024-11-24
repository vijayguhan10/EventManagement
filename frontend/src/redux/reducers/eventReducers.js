const initialState = {
  events: [],
};

const eventReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SAVE_EVENT_DATA":
      return {
        ...state,
        events: [...state.events, action.payload],
      };
    default:
      return state;
  }
};

export default eventReducer;
