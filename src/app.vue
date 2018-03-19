<template>
    <div>
        <router-view></router-view>
    </div>
</template>
<script>
    export default {
        data () {
            return {}
        },
        mounted () {
            console.log('app.vue mounted');
        },
        created () {
            console.log('app.vue created');
        },
        beforeDestroy () {

        },
        methods: {

        }
    }
</script>
