<template>
    <b-form @submit.prevent="onClickSignIn">

        <alert 
            v-if="error"
            :text="`${error}`"
            class="mt-2"
        />

        <b-form-group
            label="Email"
        >
            <b-form-input
                type="email"
                id="txtpost" 
                v-model.trim="$v.email.$model"
                :class="{ 'is-invalid' : $v.email.$error, 'is-valid' : !$v.email.$invalid }"
            ></b-form-input>
            <div class="invalid-feedback feedback">
                <span v-if="!$v.email.required">Email is required</span>
                <span v-if="!$v.email.email">Must be a valid email</span>
            </div>
        </b-form-group>

        <b-form-group
            label="Password"
        >
            <b-form-input
                id="txtpost" 
                type="password"
                v-model.trim="$v.password.$model"
                :class="{ 'is-invalid' : $v.password.$error, 'is-valid' : !$v.password.$invalid }"
            ></b-form-input>
            <div class="invalid-feedback feedback">
                <span v-if="!$v.password.required">Password is required</span>
            </div>
        </b-form-group>

        <b-row>
            <b-col>
                <b-button 
                    v-if="!loading"
                    type="submit" 
                    block 
                    variant="primary" 
                    @click="onClickSignIn"
                >Sign In</b-button>
                <b-button 
                    v-else 
                    disabled 
                    class="btn btn-primary btn-md" 
                    id="btnpost"
                    block
                >
                <b-spinner small type="grow"></b-spinner>
                    Loading...
                </b-button>
            </b-col>
            <b-col>
                <b-button 
                    type="reset" 
                    block 
                    variant="outline-light" 
                    @click="onClickReset"
                >Cancel</b-button>
            </b-col>
        </b-row>
    </b-form>
</template>

<script>

    import { auth } from '@/services'

    import { toastAlertStatus } from '@/utils'

    import { required, email } from 'vuelidate/lib/validators'

    export default {
        name: 'sign-in-form',

        components: {
            Alert: () => import('@/components/mixins/Alert')
        },

        data () {
            return {
                loading: false,
                email: null,
                password: null,
                error: null
            }
        },

        
        validations: {
            email: {
                required,
                email
            },
            password: {
                required
            }
        },

        methods: {

            onClickSignIn () {
                this.$v.$touch()
                if (!this.$v.$invalid) {
                   this.loading = true

                   const { email, password } = this.$data

                   auth.signInWithEmailAndPassword(email, password)
                    .then(() => {
                        toastAlertStatus('success', 'Sign In Successfully')
                        this.onClickReset()
                    })
                    .catch(error => {
                        this.loading = false
                        this.error = error
                        toastAlertStatus('error', error)
                    })

                }
            },

            onClickReset () {
                this.$v.$reset()
                this.email = null
                this.password = null
                this.loading = false
            }
        }
        
    }
</script>