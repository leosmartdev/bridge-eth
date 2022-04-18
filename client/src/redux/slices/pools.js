import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  pools:[]
};
const slice = createSlice({
  name: 'pools',
  initialState,
  reducers: {
    setPools(state, action) {
      state.pools=action.payload;
    },  
    
  }
});


// Reducer
export default slice.reducer;
export function setPools(pools) {
  return (dispatch) => {
    dispatch(slice.actions.setPools(pools));   
  };
}
