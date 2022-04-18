import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  totalSupply:'',
  address:'',
  error:'',
  symbol:'',
  name:'',
  decimals:0,
  allowance:0,
  approved:false,
  presale_rate: "",
  soft_cap: "",
  hard_cap: "",
  min_buy: "",
  max_buy: "",
  refund: "refund",
  whiteListable:"whiteListable",
  dex_amount: "",
  dex_rate: "",
  dex_lockup: "",
  endDate:"",
  startDate:"",
  logo:"",
  website:"",
  facebook:"",
  twitter:"",
  github:"",
  telegram:"",
  instagram:"",
  discord:"",
  reddit:"",
  description:""
};
const slice = createSlice({
  name: 'tokenListing',
  initialState,
  reducers: {
    // START LOADING
    setTotalSupply(state, action) {
      state.totalSupply = action.payload;
    },  
    setAddress(state, action) {
      state.address = action.payload;
    },    
    setError(state, action) {
      state.error = action.payload;
    },
    setParsed(state, action) {
        state.symbol=action.payload.symbol;
        state.name=action.payload.name;
        state.decimals=action.payload.decimals;
    },
    setApproved(state, action) {
      state.approved = action.payload;
    },
    setAllowance(state, action) {
      state.allowance = action.payload;
    },
    setMainInfo(state, action){
      state.presale_rate=action.payload.presale_rate;
      state.soft_cap=action.payload.soft_cap;
      state.hard_cap=action.payload.hard_cap;
      state.min_buy=action.payload.min_buy;
      state.max_buy=action.payload.max_buy;
      state.refund=action.payload.refund;
      state.whiteListable=action.payload.whiteListable;
      state.dex_amount=action.payload.dex_amount;
      state.dex_rate=action.payload.dex_rate;
      state.dex_lockup=action.payload.dex_lockup;
      state.endDate=action.payload.endDate;
      state.startDate=action.payload.startDate;
    },
    setAdditionalInfo(state, action){
      state.logo=action.payload.logo;
      state.website=action.payload.website;
      state.facebook=action.payload.facebook;
      state.twitter=action.payload.twitter;
      state.github=action.payload.github;
      state.telegram=action.payload.telegram;
      state.instagram=action.payload.instagram;
      state.discord=action.payload.discord;
      state.reddit=action.payload.reddit;
      state.description=action.payload.description;
    }
  }
});


// Reducer
export default slice.reducer;
export function setTotalSupply(totalSupply) {
  return (dispatch) => {
    dispatch(slice.actions.setTotalSupply(totalSupply));   
  };
}
export function setAddress(address) {
  return (dispatch) => {
    dispatch(slice.actions.setAddress(address));   
  };
}
export function setError(error) {
  return (dispatch) => {
    dispatch(slice.actions.setError(error));   
  };
}

export function setParsed(parsed) {
  return (dispatch) => {
    dispatch(slice.actions.setParsed(parsed));   
  };
}
export function setApproved(approved) {
  return (dispatch) => {
    dispatch(slice.actions.setApproved(approved));   
  };
}
export function setAllowance(allowance) {
  return (dispatch) => {
    dispatch(slice.actions.setAllowance(allowance));   
  };
}
export function setMainInfo(mainInfo) {
  return (dispatch) => {
    dispatch(slice.actions.setMainInfo(mainInfo));   
  };
}
export function setAdditionalInfo(additioinalInfo) {
  return (dispatch) => {
    dispatch(slice.actions.setAdditionalInfo(additioinalInfo));   
  };
}