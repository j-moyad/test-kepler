<template>
    <div class="container pt-3">
        <b-card title="Registrar usuario">
            <validation-observer ref="observer" v-slot="{ handleSubmit }">
                <b-form @submit.prevent="handleSubmit(signUp)">
                    <validation-provider rules="required" name="Name" v-slot="{ valid, errors }">
                        <b-form-group label="Nombre" label-for="name">
                            <b-form-input size="sm"  placeholder="Nombre" v-model="name"
                                          :state="errors[0] ? false : (valid ? true : null)"></b-form-input>
                            <b-form-invalid-feedback>{{ errors[0] }}</b-form-invalid-feedback>
                        </b-form-group>
                    </validation-provider>
                    <validation-provider rules="required|email" name="Email" v-slot="{ valid, errors }">
                        <b-form-group label="Correo electrónico" label-for="email">
                            <b-form-input size="sm" placeholder="Correo electrónico" v-model="email"
                                          :state="errors[0] ? false : (valid ? true : null)"></b-form-input>
                            <b-form-invalid-feedback>{{ errors[0] }}</b-form-invalid-feedback>
                        </b-form-group>
                    </validation-provider>
                    <validation-provider rules="required|password|min:10|max:15" name="Password" v-slot="{ valid, errors }" vid="password">
                        <b-form-group label="Contraseña" label-for="password">
                            <b-form-input size="sm" placeholder="Contraseña" type="password"
                                          v-model="password"
                                          :state="errors[0] ? false : (valid ? true : null)"></b-form-input>
                            <b-form-invalid-feedback>{{ errors[0] }}</b-form-invalid-feedback>
                        </b-form-group>
                    </validation-provider>
                    <validation-provider rules="required|confirmed:password" name="ConfirmPassword" v-slot="{ valid, errors }">
                        <b-form-group label="Confirmar contraseña" label-for="confirm-password">
                            <b-form-input size="sm" placeholder="Confirmar contraseña" type="password" v-model="password2"
                                          :state="errors[0] ? false : (valid ? true : null)"></b-form-input>
                            <b-form-invalid-feedback>{{ errors[0] }}</b-form-invalid-feedback>
                        </b-form-group>
                    </validation-provider>

                    <b-button block variant="primary" class="mt-4" :disabled="isSigningUp" type="submit">
                        Registrarse
                    </b-button>
                </b-form>
            </validation-observer>
        </b-card>
    </div>
</template>
<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate';
import '../js/validations';
import { createUser } from '../js/routes';

export default {
    name: 'Registration',
    data() {
        return {
            name: '',
            email: '',
            password: '',
            password2: '',
            isSigningUp: false,
            errors: {
                name: '',
                email: '',
                password: '',
                password2: ''
            }
        }
    },
    components: {
        ValidationObserver,
        ValidationProvider
    },
    methods: {
        signUp() {
            this.$axios.$post(createUser(), {
                name: this.name,
                email: this.email,
                password: this.password
            }).then(response => {
                if (typeof response === 'object' && 'id' in response) {
                    this.$bvToast.toast('Se ha registrado el usuario', {
                        title: 'Registro de usuario',
                        variant: 'success',
                        autoHideDelay: 5000
                    });

                    this.name = '';
                    this.email = '';
                    this.password = '';
                    this.password2 = '';

                    this.$nextTick(() => {
                        this.$refs.observer.reset();
                    });
                } else {
                    this.$bvToast.toast('Ocurrió un error al registrar usuario, favor de comunicarse con el equipo de soporte.', {
                        title: 'Error',
                        variant: 'danger',
                        noAutoHide: true
                    });
                }
            }).catch(() => {
                this.$bvToast.toast('Ocurrió un error al registrar usuario, favor de comunicarse con el equipo de soporte.', {
                    title: 'Error',
                    variant: 'danger',
                    noAutoHide: true
                });
            });
        }
    }

}
</script>

<style scoped>

</style>
