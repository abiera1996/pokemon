import * as Yup from 'yup';

export const LoginSchema = Yup.object().shape({
    username: Yup.string()
        .required('Required')
        .min(3, 'UserName must be 3 characters long.')
        .test('username', 'Required', function (value) {
            let validationUsername = false;
            if (value != undefined) {
                validationUsername = '' != value.replace(/\s/g, '');
            }
            return validationUsername;
        }),
    password: Yup.string()
        .min(4, 'Password must be 4 characters long.')
        .required('Required')
        .test('password', 'Required', function (value) {
            let validationPassword = false;
            if (value != undefined) {
                validationPassword = '' != value.replace(/\s/g, '');
            }
            return validationPassword;
        }),
});
