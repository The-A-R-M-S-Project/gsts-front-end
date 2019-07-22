<template>
  <div class="pt-4">
    <v-card class="mt-3 mx-auto" max-width="550">
      <v-sheet
        class="v-sheet--offset mx-auto"
        color="purple"
        elevation="12"
        max-width="calc(100% - 32px)"
      >
        <v-sparkline :labels="labels" :value="value" color="white" line-width="2" padding="16"></v-sparkline>
      </v-sheet>

      <v-card-text class="pt-0">
        <div class="title font-weight-light mb-2">User Registrations</div>
        <div class="subheading font-weight-light grey--text">Last Campaign Performance</div>
        <v-divider class="my-2"></v-divider>
        <v-icon class="mr-2" small>mdi-clock</v-icon>
        <span class="caption grey--text font-weight-light">last registration 26 minutes ago</span>
      </v-card-text>
    </v-card>
  </div>
</template>
<script>
export default {
  data: () => ({
    labels: ["2018", "2017", "2016", "2015", "2014", "2013"],
    value: [200, 675, 410, 390, 310, 460]
  })
};
</script>
<style>
.v-sheet--offset {
  top: -24px;
  position: relative;
}
</style>