<template>
    <b-form @submit.prevent="onClickSignUp">

        <alert 
            v-if="error"
            :text="`${error}`"
            class="mt-2"
        />

        <b-form-group
            label="Username"
        >
            <b-form-input
                id="txtpost" 
                v-model.trim="$v.username.$model"
                :class="{ 'is-invalid' : $v.username.$error, 'is-valid' : !$v.username.$invalid }"
            ></b-form-input>
            <div class="invalid-feedback feedback">
                <span v-if="!$v.username.required">Username is required</span>
                <span v-if="!$v.username.minLength">Username must have at least {{ $v.username.$params.minLength.min }} letters. </span>
                <span v-if="!$v.username.maxLength">Username must have at most {{ $v.username.$params.maxLength.max }} letters.</span>
            </div>
        </b-form-group>

        <b-form-group
            label="Name"
        >
            <b-form-input
                id="txtpost" 
                v-model.trim="$v.name.$model"
                :class="{ 'is-invalid' : $v.name.$error, 'is-valid' : !$v.name.$invalid }"
            ></b-form-input>
            <div class="invalid-feedback feedback">
                <span v-if="!$v.name.required">Name is required</span>
                <span v-if="!$v.name.minLength">Name must have at least {{ $v.name.$params.minLength.min }} letters. </span>
                <span v-if="!$v.name.maxLength">Name must have at most {{ $v.name.$params.maxLength.max }} letters.</span>
            </div>
        </b-form-group>

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
                <span v-if="!$v.password.minLength">Password must have at least {{ $v.password.$params.minLength.min }} letters. </span>
                <span v-if="!$v.password.maxLength">Password must have at most {{ $v.password.$params.maxLength.max }} letters.</span>
            </div>
        </b-form-group>

        <b-row>
            <b-col>
                <b-button 
                    v-if="!loading"
                    type="submit" 
                    block 
                    variant="primary"
                    @click="onClickSignUp"
                >Sign Up</b-button>
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

    import { ADD_USERS_MUTATION } from '@/graphql/mutations'

    import { required, email, minLength, maxLength } from 'vuelidate/lib/validators'

    export default {
        name: 'sign-up-form',

        components: {
            Alert: () => import('@/components/mixins/Alert')
        },
        
        data () {
            return {
                loading: false,
                name: null,
                username: null,
                email: null,
                password: null,
                error: null
            }
        },

        validations: {
            name: {
                required,
                minLength: minLength(5),
                maxLength: maxLength(25)
            },
            username: {
                required,
                minLength: minLength(5),
                maxLength: maxLength(20)
            },
            email: {
                required,
                email
            },
            password: {
                required,
                minLength: minLength(5),
                maxLength: maxLength(20)
            }
        },

        methods: {
            onClickSignUp () {
                this.$v.$touch()
                if (!this.$v.$invalid) {

                    this.loading = true

                    const { name, username, email, password } = this.$data

                    auth.createUserWithEmailAndPassword(email, password)
                     .then((firebase) => {
                        this.createUserInHasura(firebase, name, username, email, password)
                     })
                     .catch(error => {
                         this.loading = false
                         this.error = error
                         toastAlertStatus('error', error)
                     })
                }
            },

            createUserInHasura (firebase, name, username, email, password) {
                this
                 .$apollo
                 .mutate({
                     mutation: ADD_USERS_MUTATION,
                     variables: {
                        firebase_id: firebase.uid,
                        name: name,
                        username: username,
                        email: email,
                        password: password
                     }
                 })
                 .then(() => {
                    toastAlertStatus('success', 'Sign Up Successfully. Please Sign In.')
                    this.onClickReset()
                 })
                 .catch(error => {
                    this.loading = false
                    this.error = error
                    toastAlertStatus('error', error)
                })
            },

            onClickReset () {
                this.name = null
                this.username = null
                this.email = null
                this.password = null
                this.error = null
                this.loading = false
                this.$v.$reset()
            }
        }


    }
</script>