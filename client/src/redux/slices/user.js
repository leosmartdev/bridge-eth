import { createSlice } from "@reduxjs/toolkit";
// utils
import axios from "../../utils/axios";

// ----------------------------------------------------------------------

function objFromArray(array, key = "id") {
  return array.reduce((accumulator, current) => {
    accumulator[current[key]] = current;
    return accumulator;
  }, {});
}

const initialState = {
  isLoading: false,
  error: false,
  users: [],
  user: {},
};

const slice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.isLoading = true;
    },

    // HAS ERROR
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    // GET LABELS
    getUsersSuccess(state, action) {
      state.isLoading = false;
      state.users = action.payload;
    },
    getUserSuccess(state, action) {
      state.isLoading = false;
      state.user = action.payload;
    },
  },
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------

export function getUsers() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get("/api/user/get");
      dispatch(slice.actions.getUsersSuccess(response.data.users));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getUserById(id) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(`/api/user/getbyid/${id}`);
      console.log("userid");
      dispatch(slice.actions.getUserSuccess(response.data.user));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
export function rateUser(account, id, rateValue, art, rarity, hype) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post("/api/user/rate", {
        account,
        id,
        rateValue,
        art,
        rarity,
        hype,
      });
      dispatch(slice.actions.getUserSuccess(response.data.user));
      // toast.success(`Your overall rating is ${rateValue.toFixed(2)}`);
    } catch (error) {
      dispatch(slice.actions.hasError(error));
      // toast.error(error.error);
    }
  };
}

export function commentUser(account, id, comment) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post("/api/user/comment", {
        account,
        comment,
        id,
      });
      dispatch(slice.actions.getUserSuccess(response.data.user));
      // toast.success("Comment submitted");
    } catch (error) {
      dispatch(slice.actions.hasError(error));
      // toast.error(error.error);
    }
  };
}

export function approve(boolean, id) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post("/api/user/approve", {
        approved: boolean,
        id,
      });
      dispatch(slice.actions.getUsersSuccess(response.data.users));
      // toast.success(
      //   boolean === true ? "Approved successfully!" : "Denied successfully!"
      // );
    } catch (error) {
      dispatch(slice.actions.hasError(error));
      // toast.error(error.error);
    }
  };
}

export function deleteNFT(id) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post("/api/user/delete", {
        id,
      });
      dispatch(slice.actions.getUsersSuccess(response.data.users));
      // toast.success("Deleted successfully!");
    } catch (error) {
      dispatch(slice.actions.hasError(error));
      // toast.error(error.error);
    }
  };
}

export function updateNFT(data) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post(`/api/user/update/${data.id}`, data);
      dispatch(slice.actions.getUsersSuccess(response.data.users));
      // toast.success("Updated successfully!");
    } catch (error) {
      dispatch(slice.actions.hasError(error));
      // toast.error(error.error);
    }
  };
}

export function promote(id, type) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post("/api/user/promote", {
        id,
        type,
      });
      dispatch(slice.actions.getUsersSuccess(response.data.users));
      // toast.success("Promoted successfully!");
    } catch (error) {
      dispatch(slice.actions.hasError(error));
      // toast.error(error.error);
    }
  };
}

export function filterNFTs(filterData) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post("/api/user/filter", { filterData });
      dispatch(slice.actions.getUsersSuccess(response.data.users));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
      // toast.error(error.error);
    }
  };
}

export function setNotify(account, id, time) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post("/api/user/notify", {
        account,
        id,
        time,
      });
      dispatch(slice.actions.getUsersSuccess(response.data.users));
      // toast.success("You set notify successfully!");
    } catch (error) {
      dispatch(slice.actions.hasError(error));
      // toast.error(error.error);
    }
  };
}
