<template>
    <b-modal 
        v-model="show" 
        hide-footer
        title="Sign In / Sign Up"
        class="modal-header"
    >
        <b-tabs fill>
            
            <b-tab title="Sign In">
                <b-form>

                    <b-form-group
                        label="Email"
                    >
                        <b-form-input
                            type="email"
                            required
                            id="txtpost" 
                            v-model="email"
                        ></b-form-input>
                    </b-form-group>

                    <b-form-group
                        label="Password"
                    >
                        <b-form-input
                            required
                            id="txtpost" 
                            type="password"
                            v-model="password"
                        ></b-form-input>
                    </b-form-group>

                    <b-row>
                        <b-col>
                            <b-button type="submit" block variant="primary">Sign In</b-button>
                        </b-col>
                        <b-col>
                            <b-button type="reset" block variant="outline-light">Cancel</b-button>
                        </b-col>
                    </b-row>
                </b-form>
            </b-tab>

            <b-tab title="Sign Up">
                <b-form>
                    <b-form-group
                        label="Name"
                    >
                        <b-form-input
                            required
                            id="txtpost" 
                            v-model="name"
                        ></b-form-input>
                    </b-form-group>

                    <b-form-group
                        label="Username"
                    >
                        <b-form-input
                            required
                            id="txtpost" 
                            v-model="username"
                        ></b-form-input>
                    </b-form-group>

                    <b-form-group
                        label="Email"
                    >
                        <b-form-input
                            type="email"
                            id="txtpost" 
                            v-model="email"
                            required
                        ></b-form-input>
                    </b-form-group>

                    <b-form-group
                        label="Password"
                    >
                        <b-form-input
                            required
                            id="txtpost" 
                            type="password"
                            v-model="password"
                        ></b-form-input>
                    </b-form-group>

                    <b-row>
                        <b-col>
                            <b-button 
                                type="submit" 
                                block 
                                variant="primary"
                            >Sign Up</b-button>
                        </b-col>
                        <b-col>
                            <b-button 
                                type="reset" 
                                block 
                                variant="outline-light"
                            >Cancel</b-button>
                        </b-col>
                    </b-row>
                </b-form>
            </b-tab>

        </b-tabs>
    </b-modal>
</template>

<script>
    export default {
        name: 'auth-dialog',

        props: ['visible'],

        components: {
            SignInForm: () => import('./SignUpForm'),
            SignUpForm: () => import('./SignUpForm')
        },

        data () {
            return {
                loading: false,
                name: null,
                username: null,
                email: null,
                password: null
            }
        },

        computed: {
            show: {
                get () {
                    return this.visible
                },
                set (value) {
                    if (!value) {
                        this.$emit('close')
                    }
                }
            }
        }

    }
</script>