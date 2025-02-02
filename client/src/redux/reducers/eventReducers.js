const initialState = {
  event: {}, 
};

const eventReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SAVE_EVENT_DATA":
      return {
        ...state,
        event: {
          ...state.event,
          ...action.payload, 
        },
      };
    default:
      return state;
  }
};

export default eventReducer;
