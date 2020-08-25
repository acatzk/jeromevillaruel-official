<template>
    <form @submit.prevent="freedomPost">


        <b-form-group label="Name" v-show="false">
            <b-form-input
                id="txtpost"
                v-for="user in users" :key="user.uid"
                :value="name = user.name"
                :disabled="true"
            ></b-form-input>
        </b-form-group>

        <b-form-group label="Post anything here...">
            <b-textarea 
            id="txtpost" 
            v-model="$v.freedomWords.$model"
            :class="{ 'is-invalid' : $v.freedomWords.$error, 'is-valid' : !$v.freedomWords.$invalid }"
            ></b-textarea>
            <div class="invalid-feedback feedback">
                <span v-if="!$v.freedomWords.required">You posts is required</span>
                <span v-if="!$v.freedomWords.minLength">You posts must have at least {{ $v.freedomWords.$params.minLength.min }} letters. </span>
            </div>
        </b-form-group> <!-- post text area button -->

        <b-button 
            variant="primary" 
            class="float-right mt-2" 
            id="btnpost" 
            @click="freedomPost"
            v-if="!loading"
        >
            Post
        </b-button > <!-- posts button -->
        <b-button 
            v-else 
            variant="primary" 
            id="btnpost" 
            disabled 
            class="float-right mt-2" 
        >
            <b-spinner small type="grow"></b-spinner>
            Loading...
        </b-button>
    </form>
</template>

<script>

    import { fb } from '@/services'

    import { GET_SINGLE_USER } from '@/graphql/queries' 

    import { GET_SINGLE_USER_SUBSCRIPTION } from '@/graphql/subscriptions'

    import { toastAlertStatus } from '@/utils'

    import { required, minLength, maxLength } from 'vuelidate/lib/validators'

    import { POST_FREEDOM_WALL } from '@/graphql/mutations'

    export default {
        name: 'TextFieldFreedomWall',

        data () {
            return {
                name: '',
                freedomWords: '',
                loading: false,
                firebase_id: fb.auth().currentUser.uid
            }
        },

        validations: {
            freedomWords: {
                required,
                minLength: minLength(20),
            }
        },

        methods: {
            freedomPost() {
                this.$v.$touch()
                if (!this.$v.$invalid) {

                    this.loading = true

                    const { name, freedomWords } = this.$data

                    this.$apollo.mutate({
                        mutation: POST_FREEDOM_WALL,
                        variables: {
                            name: name, 
                            posts: freedomWords
                        }
                    }).then(() => {
                        toastAlertStatus('success', `Thank you for your post ${this.name}`)
                        this.loading = false
                        // this.name = ''
                        this.freedomWords = ''
                        this.$v.$reset()
                    }).catch(error => toastAlertStatus('error', error))
                }
            }
        },

        apollo: {
            users: {
                query: GET_SINGLE_USER,
                variables () {
                    return {
                        firebase_id: this.firebase_id
                    }
                },
                subscribeToMore: {
                    document: GET_SINGLE_USER_SUBSCRIPTION,
                    variables() {
                        return {
                            firebase_id: this.firebase_id
                        }
                    },
                    updateQuery(previousResult, { subscriptionData }) {
                        if (previousResult) {
                            return {
                                users: [
                                    ...subscriptionData.data.users
                                ]
                            }
                        }
                    }
                }
            }
        }
    }
</script>