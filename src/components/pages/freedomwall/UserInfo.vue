<template>
    <div class="user-info">
        <b-card 
            id="card-about" 
            class="mb-3"
        >
            <b-row class="d-flex align-items-center">
                <b-card-title class="d-flex align-items-center">
                    <b-icon icon="person" font-scale="1"></b-icon>
                    <b class="ml-2" v-for="(user, index) in users" :key="index">{{  capitalize(user.name) }}</b> 👋
                    <br>
                    <span v-for="(user, index) in users" :key="`i${index}`" class="subtitle">{{ user.email  }}</span>
                </b-card-title>
                <b-dropdown 
                    class="ml-auto" 
                    v-for="(user, index) in users" :key="index"
                    :text="`@${user.username}`" 
                    variant="outline-primary"
                >
                    <b-dropdown-item>Profile</b-dropdown-item>
                    <b-dropdown-item @click="onClickLogout">Logout</b-dropdown-item>
                </b-dropdown>
            </b-row>
        </b-card>
    </div>
</template>

<script>

    import { toastAlertStatus } from '@/utils'

    import { fb, auth } from '@/services'

    import { GET_SINGLE_USER } from '@/graphql/queries' 

    export default {
        name: 'user-info',

        data () {
            return {
                firebase_id: fb.auth().currentUser.uid
            }
        },

        methods: {
            onClickLogout () {
                auth.signOut()
                 .then(() => {
                    toastAlertStatus('success', 'Logout Successfully')
                 })
                 .catch(error => {
                     toastAlertStatus('error', error)
                 })
            },
            capitalize(s) {
                if (typeof s !== 'string') return ''
                return s.charAt(0).toUpperCase() + s.slice(1)
            }
        },

        apollo: {
            users: {
                query: GET_SINGLE_USER,
                variables () {
                    return {
                        firebase_id: this.firebase_id
                    }
                }
            }
        }
        
    }
</script>