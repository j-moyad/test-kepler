import { extend } from 'vee-validate';
import { confirmed, email, max, min, required } from 'vee-validate/dist/rules';

extend('required', {
    ...required,
    message: 'Este campo es requerido'
});

extend('email', {
    ...email,
    message: 'Ingresa un correo electrónico válido'
});

extend('confirmed', {
    ...confirmed,
    message: 'Las contraseñas no coinciden'
});

extend('min', {
    ...min,
    message: 'La contraseña debe contener al menos 10 caracteres'
});

extend('max', {
    ...max,
    message: 'La contraseña debe contener hasta 15 caracteres'
});

extend('password', value => {
    // Se valida que contenga al menos uno de cada uno de los siguientes caracteres: símbolo, número, minúscula y mayúscula
    if (/[+*.#$%&/()¿?¡!@]/.test(value) && /[0-9]/.test(value) && /[a-z]/.test(value) && /[A-Z]/.test(value)) {
        return true;
    }

    return 'La contraseña debe contener al menos uno de los siguientes símbolos +*.#$%&/()¿?¡!@, una mayúscula, una minúscula y un número.'
});
