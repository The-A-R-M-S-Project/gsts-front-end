<template>
    <v-date-picker v-model="picker" :landscape="landscape" color="teal" header-color="purple"></v-date-picker>
</template>
<script>
export default {
    props: {
        landscape: Boolean
    },
    data () {
    return {
    picker: new Date().toISOString().substr(0, 10),
    }
    }
}
</script>

