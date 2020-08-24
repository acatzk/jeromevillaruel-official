<template>
    <b-modal title="BootstrapVue" v-model="show">
        <p class="my-4">Hello from modal!</p>
    </b-modal>
</template>

<script>
    export default {
        name: 'auth-dialog',

        props: ['visible'],

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