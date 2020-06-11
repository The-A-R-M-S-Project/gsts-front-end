<template>
    <div id="page-not-found">
        <span
            class="grey--text display-1 emptyPane text-center custom-font-family"
        >
            <v-icon x-large color="purple">mdi-dots-horizontal</v-icon>&nbsp;
            This page is still under construction!
            <br />
            <span class="title custom-font-family">
                Return to previous page
                <span
                    class="yellow--text text--darken-3"
                    style="cursor: pointer"
                    @click="returnToApp"
                >
                    here</span
                >
            </span>
        </span>
    </div>
</template>

<script>
export default {
    name: "PageNotFound",
    methods: {
        returnToApp() {
            this.$router.go(-1);
        },
    },
};
</script>

<style>
.emptyPane {
    display: inline-block;
    margin-top: 40vh;
}
#page-not-found {
    text-align: center;
}
</style>
