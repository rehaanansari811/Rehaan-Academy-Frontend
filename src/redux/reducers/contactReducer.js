import { createReducer } from "@reduxjs/toolkit";

export const contactReducer = createReducer({}, (builder) => {
    builder

        // CONTACT US  
        .addCase('contactRequest', (state) => {
            state.loading = true;
        })
        .addCase('contactSuccess', (state, action) => {
            state.loading = false;
            state.message = action.payload;
        })
        .addCase('contactFail', (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })

        // COURSE REQUEST  
        .addCase('courseRequest', (state) => {
            state.loading = true;
        })
        .addCase('courseSuccess', (state, action) => {
            state.loading = false;
            state.message = action.payload;
        })
        .addCase('courseFail', (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })


        .addCase('clearError', (state) => {
            state.error = null;
        })
        .addCase('clearMessage', (state) => {
            state.message = null;
        });

});