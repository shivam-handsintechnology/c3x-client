
import { createSlice } from '@reduxjs/toolkit';
import { getApi, postApi } from '../../service/axiosInterceptors';
const initialState = {
  loading: false,
  error: false,
  data: [],
  message: "",
};
const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    createItem: async (state, action) => {
      await postApi('users', action.payload).then((response) => {
        // //console.log({ response })
      }
      ).catch((error) => {
        // //console.log({ error })
      });

    },
    deleteItem: async (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    updateItem: async (state, action) => {
      const { id, updatedItem } = action.payload;
      const index = state.items.findIndex(item => item.id === id);
      if (index !== -1) {
        state.items[index] = { ...state.items[index], ...updatedItem };
      }
    },
    fetchItems: (state, action) => {

      return {
        ...state,
        ...action.payload
      };

    },
  },
});

export const { createItem, deleteItem, updateItem, fetchItems } = usersSlice.actions;

export default usersSlice.reducer;
