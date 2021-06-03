<template>
    <v-card width="150" :color="color" class="mx-auto">
        <v-card-text class="white--text text-center heading font-weight-bold">
            {{statOne}} <v-icon large color="white">mdi-slash-forward</v-icon> {{statTwo}}
        </v-card-text>
    </v-card>    
</template>

<script>
export default {
    name: "StatCard",
    props: {
        statOne: Number,
        statTwo: Number,
        color: String,
        department: String
    }
}
</script>