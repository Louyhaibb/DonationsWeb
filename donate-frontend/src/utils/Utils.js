import moment from 'moment';

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
    if (userRole === 'donator') return '/donator/items'
    if (userRole === 'needy') return '/needy/profile'
    return '/sign-in'
}

export const getDateFormat = (formattedDate) => {
    const formattedDateMoment = moment(`${formattedDate}`, 'YYYY-MM-DD HH:mm A');
    const formattedDateTime = moment(formattedDateMoment).format('llll');
    return formattedDateTime;
  };

export const calculateProfilePercentage = (profileData) => {
    let filledFields = 0;
    
    if (profileData.firstName) filledFields += 5;
    if (profileData.lastName) filledFields += 5;
    if (profileData.age) filledFields += 10;
    if (profileData.children) filledFields += 5;
    if (profileData.married) filledFields += 5;
    if (profileData.gender) filledFields += 5;
    if (profileData.city) filledFields += 10;
    if (profileData.shirtSize) filledFields += 10;
    if (profileData.bottomSize) filledFields += 10;
    if (profileData.shoeSize) filledFields += 10;
    
    return (filledFields / 75) * 100;
}