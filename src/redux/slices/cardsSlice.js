import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    cards: [],
};

const cardsSlice = createSlice({
    name: 'cards',
    initialState,
    reducers: {
        addCard: (state, action) => {
            state.cards.push(action.payload);
        },
        removeCard: (state, action) => {
            state.cards = state.cards.filter(card => card.id !== action.payload);
        },
        clearCards: (state) => {
            state.cards = [];
        },
        updateCard: (state, action) => {
            const index = state.cards.findIndex(card => card.id === action.payload.id);
            if (index !== -1) {
                state.cards[index] = action.payload;
            }
        },
    },
});

export const { addCard, removeCard, clearCards, updateCard } = cardsSlice.actions;

export default cardsSlice.reducer;
