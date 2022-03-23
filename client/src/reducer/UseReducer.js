export const initialState = {
    isLoggedIn: false,
    userType: null
};
export const reducer = (state, action) => {
    switch (action.type) {
        case 'LEARNER_LOGIN':
            return { ...state, isLoggedIn: true,userType:"LEARNER" };
        case 'INSTRUCTOR_LOGIN':
            return { ...state, isLoggedIn: true,userType:"INSTRUCTOR" };
        case 'USER_LOGOUT':
            return { ...state, isLoggedIn: false,userType: null};
        default:
            return state;
    }
}