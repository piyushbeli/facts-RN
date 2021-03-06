import { CONSTANTS } from "./constant";

const phoneAPI = require('phone');

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

/* @Params - date -> 2018-01-29
   @Return - date -> Jan 29
*/
export const formatDate = (date: string | undefined) => {
    if (!date) return '';
    const dateArray = date.split('-');
    return `${MONTHS[parseInt(dateArray[1]) - 1]}, ${parseInt(dateArray[2])}`;
};

export const capitalize = (text: string) => {
    const textArr = text.split(" ");
    for (let i = 0; i < textArr.length; i++) {
        textArr[i] = textArr[i].substr(0,1).toUpperCase() + textArr[i].substr(1).toLowerCase();
    }
    return textArr.join(" ");
}

export const isValidEmail = (email: string) => {
    let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(String(email).toLowerCase());
}

export const isValidPhone = (phone: string) => {
    // let regex = /^([7-9][0-9]{9})$/;
    // return regex.test(String(phone));
    return phoneAPI(phone).length;
}

export const validate = (type: string, value: any, field?: string, extraValue?: string) => {
    let error = '';
    switch(type) {
        case 'emailOrPhone':
            error = validate('email', value);
            if (error) {
              error = validate('phone', value);
            }
            if (error) {
              error = 'Please enter valid email or phone'
            }
            break;
        case 'email':
            if (!value || !isValidEmail(value))
                error = 'Please enter valid email.'
            break;

        case 'password':
            if (!value)
                error = 'Password must not be empty.'
            break;

        case 'cpassword':
            if (value != extraValue)
                error = 'Passowrd do not match.'
            break;

        case 'phone':
            if (value && !isValidPhone(formatPhone(value)))
                error = `Please enter valid phone number.`
            break;

        case 'required':
            if (!value)
                error = `${field} can't be empty.`
            break;

        default:
            break;
    }
    return error;
}


export const formatObject = (obj: any) => {
    for (let key in obj) {
        if (!obj[key]) {
            obj[key] = '';
        }
    }
    return obj;
}

export const formatPhone = (phone: any) => {
    return CONSTANTS.COUNTRY_CODE + phone;
}
