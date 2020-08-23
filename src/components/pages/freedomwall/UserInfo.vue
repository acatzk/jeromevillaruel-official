<template>
    <div class="user-info">
        <b-card 
            id="card-about" 
            class="mb-3"
        >
            <b-row class="d-flex align-items-center">
                <b-card-title class="d-flex align-items-center">
                    <b-icon icon="person" font-scale="1"></b-icon>
                    <b class="ml-2">Joshua Galit</b> 👋
                </b-card-title>
                <b-dropdown class="ml-auto" text="@joshua" variant="outline-primary">
                    <b-dropdown-item>Profile</b-dropdown-item>
                    <b-dropdown-item>Logout</b-dropdown-item>
                </b-dropdown>
            </b-row>
        </b-card>
    </div>
</template>

<script>

    import { currentuser } from '@/services'

    export default {
        name: 'user-info',

        data () {
            return {
                currentuser: currentuser
            }
        }
        
    }
</script>