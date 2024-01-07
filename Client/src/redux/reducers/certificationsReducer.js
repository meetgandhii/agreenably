const initialData = {
  certifications: [],
};

export const certificationsReducer = (state = initialData, action) => {
  switch (action.type) {
    case "GET_ALL_certifications": {
      return {
        ...state,
        certifications: action.payload,
      };
    }

    default:
      return state;
  }
};
