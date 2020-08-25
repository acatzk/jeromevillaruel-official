<template>
    <b-modal 
        v-model="show" 
        hide-footer
        title="Sign In / Sign Up"
        class="modal-header"
    >
        <b-tabs fill>
            
            <b-tab title="Sign In">
                <sign-in-form 
                   @close="show = !show"
                />
            </b-tab>

            <b-tab title="Sign Up">
                <sign-up-form />
            </b-tab>

        </b-tabs>
    </b-modal>
</template>

<script>

    export default {
        name: 'auth-dialog',

        props: ['visible'],

        components: {
            SignInForm: () => import('./SignInForm'),
            SignUpForm: () => import('./SignUpForm')
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