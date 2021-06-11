<template>
    <v-progress-circular
      size="130"
      :rotate="-90"
      :width="16"
      :value="(statOne*100/statTwo)"
      :color="color"
      class="font-weight-bold headline"
    >
      <span class="mb-4 ml-4">{{statOne}} </span>
      <v-icon large :color="color">mdi-slash-forward</v-icon>
      <span class="mt-4 mr-4">{{statTwo}}</span>
    </v-progress-circular>
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