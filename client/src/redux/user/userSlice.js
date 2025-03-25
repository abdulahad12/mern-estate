import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const loginUser = createAsyncThunk(
  "user/signin",
  async (userData, { rejectWithValue, getState, dispatch }) => {
    try {
      const endpoint =
        userData.provider === "google"
          ? "/api/auth/google"
          : "/api/auth/signin";

      const res = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (!res.ok) throw new Error("Failed to fetch users");

      // if (!res.ok) {
      //   const errordata = await res.json();
      //   throw new Error(errordata.message || "Login failed");
      // }

      const data = await res.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const userSlice = createSlice({
  name: "user",

  initialState: {
    loading: false,
    error: null,
    currentUser: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.currentUser = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default userSlice.reducer;
