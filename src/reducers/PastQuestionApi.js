const defaultApiReducer = {};

export default (state = defaultApiReducer, action)  => {
    switch (action.type) {
        case "INITIALISE_APPSTATE":
            return action.data
        default:
            return state;
    }
}