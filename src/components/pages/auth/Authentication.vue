<template>
    <b-row>
        <b-button block variant="primary" class="mx-3" @click="dialog = !dialog">
            <b-icon icon="lock"></b-icon> Sign Up / Sign In
        </b-button>
        
        <auth-dialog 
            :visible="dialog" @close="dialog = false"
        />

    </b-row>
</template>

<script>
    export default {
        name: 'authentication',

        components: {
            AuthDialog: () => import('./AuthDialog')
        },

        data () {
            return {
                dialog: false
            }
        }
    }
</script>