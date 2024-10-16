import { createReducer } from "@reduxjs/toolkit";

export const adminReducer = createReducer({}, (builder) => {
    builder

        // GET ADMIN STATS 
        .addCase('getAdminStatsRequest', (state) => {
            state.loading = true;
        })
        .addCase('getAdminStatsSuccess', (state, action) => {
            state.loading = false;
            state.stats = action.payload.stats;
            state.userCount = action.payload.userCount;
            state.subscriptionCount = action.payload.subscriptionCount;
            state.viewsCount = action.payload.viewsCount;
            state.subscriptionPercentage = action.payload.subscriptionPercentage;
            state.usersPercentage = action.payload.usersPercentage;
            state.viewsPercentage = action.payload.viewsPercentage;
            state.subscriptionProfit = action.payload.subscriptionProfit;
            state.usersProfit = action.payload.usersProfit;
            state.viewsProfit = action.payload.viewsProfit;
        })
        .addCase('getAdminStatsFail', (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })

        // GET ALL USERS 
        .addCase('getAllUsersRequest', (state) => {
            state.loading = true;
        })
        .addCase('getAllUsersSuccess', (state, action) => {
            state.loading = false;
            state.users = action.payload;
        })
        .addCase('getAllUsersFail', (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })

        // UPDATE ROLE 
        .addCase('updateRoleRequest', (state) => {
            state.loading = true;
        })
        .addCase('updateRoleSuccess', (state, action) => {
            state.loading = false;
            state.message = action.payload;
        })
        .addCase('updateRoleFail', (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })


        // DELETE USERS
        .addCase('deleteUserRequest', (state) => {
            state.loading = true;
        })
        .addCase('deleteUserSuccess', (state, action) => {
            state.loading = false;
            state.message = action.payload;
        })
        .addCase('deleteUserFail', (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })

        // CREATE COURSE 
        .addCase('createCourseRequest', (state) => {
            state.loading = true;
        })
        .addCase('createCourseSuccess', (state, action) => {
            state.loading = false;
            state.message = action.payload;
        })
        .addCase('createCourseFail', (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })

        // DELETE COURSE 
        .addCase('deleteCourseRequest', (state) => {
            state.loading = true;
        })
        .addCase('deleteCourseSuccess', (state, action) => {
            state.loading = false;
            state.message = action.payload;
        })
        .addCase('deleteCourseFail', (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })

        // ADD LECTURE  
        .addCase('addLectureRequest', (state) => {
            state.loading = true;
        })
        .addCase('addLectureSuccess', (state, action) => {
            state.loading = false;
            state.message = action.payload;
        })
        .addCase('addLectureFail', (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })

        // DELETE LECTURE  
        .addCase('deleteLectureRequest', (state) => {
            state.loading = true;
        })
        .addCase('deleteLectureSuccess', (state, action) => {
            state.loading = false;
            state.message = action.payload;
        })
        .addCase('deleteLectureFail', (state, action) => {
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