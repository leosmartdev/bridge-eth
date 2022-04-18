import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  chainId: 1,
};
const slice = createSlice({
  name: 'network',
  initialState,
  reducers: {
    // START LOADING
    switchNetwork(state, action) {
      state.chainId = parseInt(action.payload);
    }    
  }
});


// Reducer
export default slice.reducer;
export function switchNetwork(network) {
  return (dispatch) => {
    dispatch(slice.actions.switchNetwork(network));   
  };
}