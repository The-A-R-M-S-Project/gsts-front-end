<template>
  <div class="pt-5" style="height: 80vh !important;">
    <div class="display-1 text-center font-weight-medium mb-4">Report submission</div>
    <v-card :max-width="$vuetify.breakpoint.xs?'95vw':'70vw'" class="mx-auto pa-5">
      <p>
        <span class="body-1 font-weight-light">Upload status:</span>
        <span class="subheading">&nbsp; No attempt</span>
      </p>
      <p>
        <span class="body-1 font-weight-light">Due Date:</span>
        <span class="subheading">&nbsp; Thursday, 12th June 2020, 10:00 PM</span>
      </p>
      <p class="mb-10">
        <span class="body-1 font-weight-light">Last modified:</span>
        <span class="subheading">&nbsp; -</span>
      </p>
      <v-file-input
        label="File input"
        placeholder="Click here to upload your report"
        outlined
        counter
        :show-size="1000"
        truncate-length="100"
        prepend-icon="mdi-file-document"
      ></v-file-input>
      <v-row justify="end" class="px-3 pt-2">
        <v-btn dark color="teal">submit</v-btn>
      </v-row>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "report-submission",
};
</script>