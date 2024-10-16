import { server } from "../store";
import axios from 'axios';

// CREATE COURSE
export const createCourse = (formData) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-type': 'multipart/form-data',
            },

            withCredentials: true,
        };
        dispatch({ type: 'createCourseRequest' });
        const { data } = await axios.post(
            `${server}/createCourse`, formData, config
        );
        dispatch({ type: 'createCourseSuccess', payload: data.message });
    } catch (error) {
        dispatch({ type: 'createCourseFail', payload: error.response.data.message });
    }
}

// DELETE COURSE
export const deleteCourse = (id) => async dispatch => {
    try {
        const config = {
            withCredentials: true,
        };
        dispatch({ type: 'deleteCourseRequest' });
        const { data } = await axios.delete(
            `${server}/course/${id}`, config
        );
        dispatch({ type: 'deleteCourseSuccess', payload: data.message });
    } catch (error) {
        dispatch({ type: 'deleteCourseFail', payload: error.response.data.message });
    }
}

// ADD LECTURE
export const addLecture = (id, formData) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-type': 'multipart/form-data',
            },

            withCredentials: true,
        };
        dispatch({ type: 'addLectureRequest' });
        const { data } = await axios.post(
            `${server}/course/${id}`, formData, config
        );
        dispatch({ type: 'addLectureSuccess', payload: data.message });
    } catch (error) {
        dispatch({ type: 'addLectureFail', payload: error.response.data.message });
    }
}

// DELETE LECTURE
export const deleteLecture = (courseId, lectureId) => async dispatch => {
    try {
        const config = {
            withCredentials: true,
        };
        dispatch({ type: 'deleteLectureRequest' });
        const { data } = await axios.delete(
            `${server}/lecture?courseId=${courseId}&lectureId=${lectureId}`, config
        );
        dispatch({ type: 'deleteLectureSuccess', payload: data.message });
    } catch (error) {
        dispatch({ type: 'deleteLectureFail', payload: error.response.data.message });
    }
}

// GET ALL USERS 
export const getAllUsers = () => async dispatch => {
    try {
        const config = {
            withCredentials: true,
        };
        dispatch({ type: 'getAllUsersRequest' });
        const { data } = await axios.get(
            `${server}/admin/users`,
            config
        );
        dispatch({ type: 'getAllUsersSuccess', payload: data.users });
    } catch (error) {
        dispatch({ type: 'getAllUsersFail', payload: error.response.data.message });
    }
}

// UPDATE ROLE 
export const updateRole = (id) => async dispatch => {
    try {
        const config = {
            withCredentials: true,
        };
        dispatch({ type: 'updateRoleRequest' });
        const { data } = await axios.put(
            `${server}/admin/user/${id}`,
            {},
            config
        );
        dispatch({ type: 'updateRoleSuccess', payload: data.message });
    } catch (error) {
        dispatch({ type: 'updateRoleFail', payload: error.response.data.message });
    }
}

// DELETE USERS 
export const deleteUser = (id) => async dispatch => {
    try {
        const config = {
            withCredentials: true,
        };
        dispatch({ type: 'deleteUserRequest' });
        const { data } = await axios.delete(
            `${server}/admin/user/${id}`,
            config
        );
        dispatch({ type: 'deleteUserSuccess', payload: data.message });
    } catch (error) {
        dispatch({ type: 'deleteUserFail', payload: error.response.data.message });
    }
}

// GET DASHBOARD STATS 
export const getDashboardStats = () => async dispatch => {
    try {
        const config = {
            withCredentials: true,
        };
        dispatch({ type: 'getAdminStatsRequest' });

        const { data } = await axios.get(`${server}/admin/stats`, config);

        dispatch({ type: 'getAdminStatsSuccess', payload: data });
    } catch (error) {
        dispatch({
            type: 'getAdminStatsFail',
            payload: error.response.data.message,
        });
    }
}