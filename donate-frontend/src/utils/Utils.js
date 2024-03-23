// ** Checks if an object is empty (returns boolean)
export const isObjEmpty = obj => Object.keys(obj).length === 0

export const isUserLoggedIn = () => localStorage.getItem('userData')
export const getUserData = () => JSON.parse(localStorage.getItem('userData'))

export const getToken = () => {
    return localStorage.getItem('accessToken');
};

export const removeToken = () => {
    localStorage.removeItem('accessToken');
};
export const setToken = (val) => {
    localStorage.setItem('accessToken', val);
};

export const setUserData = (val) => {
    localStorage.setItem('userData', val);
};

export const removeUserData = () => {
    localStorage.removeItem('userData');
};

export const getHomeRouteForLoggedInUser = userRole => {
    if (userRole === 'admin') return '/admin/dashboard'
    if (userRole === 'donator') return '/donator/dashboard'
    if (userRole === 'needy') return '/needy/dashboard'
    return '/sign-in'
}