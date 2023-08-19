import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface IBook {
  book: {
    searchTerm: string | null;
  };
}

const initialState: IBook = {
  book: {
    searchTerm: null,
  },
};

const bookSlice = createSlice({
  name: "book",
  initialState,
  reducers: {
    searchTerm: (state, action: PayloadAction<string | null>) => {
      state.book.searchTerm = action.payload;
    },
  },
});

export const { searchTerm } = bookSlice.actions;

export default bookSlice.reducer;
