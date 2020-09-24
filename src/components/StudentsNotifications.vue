<template>
  <v-list two-line class="notifications">
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title>
          <div class="title text-center font-weight-bold mb-4">Activity Log</div>
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>

    <v-divider></v-divider>

    <v-list-item-group active-class="purple--text">
      <template v-for="(item, index) in items">
        <v-list-item :key="item.id">
          <template>
            <v-list-item-action>
              <v-icon :color="item.tag">mdi-circle</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title v-text="item.headline"></v-list-item-title>
              <v-list-item-subtitle class="text-wrap" v-text="item.title"></v-list-item-subtitle>
              <v-list-item-subtitle v-text="item.subtitle"></v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-action>
              <v-list-item-action-text v-text="item.action"></v-list-item-action-text>
              <v-list-item-action-text v-text="item.time"></v-list-item-action-text>
            </v-list-item-action>
          </template>
        </v-list-item>

        <v-divider v-if="index + 1 < items.length" :key="index"></v-divider>
      </template>
    </v-list-item-group>
  </v-list>
</template>

<script>
export default {
  name: "students-notifications",
  data: () => ({
    items: [
      {
        id: "n8kjdfs",
        action: "Jul 21",
        time: "1:59pm",
        tag: "blue",
        headline: "Viva",
        title: "You scored 78% in your viva examination.",
        subtitle: "Congratulations!!!",
      },
      {
        id: "n892jdi",
        action: "Jul 21",
        time: "1:59pm",
        tag: "blue",
        headline: "Viva",
        title: "You viva examination has been slated for 2nd November, 2020",
        subtitle: "Location: Cedat conference hall",
      },
      {
        id: "nskjfdv",
        action: "Jul 21",
        time: "1:59pm",
        tag: "blue",
        headline: "Viva",
        title: "A date for your viva exam is yet to be set",
        subtitle: "",
      },
      {
        id: "nkjnas2",
        action: "Jul 21",
        time: "1:59pm",
        tag: "blue",
        headline: "Report",
        title: "You scored 71%.",
        subtitle: "Your report has been marked and graded.",
      },
      {
        id: "n82fj09",
        action: "Jul 21",
        time: "1:59pm",
        tag: "green",
        headline: "Report Submission",
        title: "You resubmitted your report",
        subtitle: "",
      },
      {
        id: "nofo238",
        action: "Jul 21",
        time: "10:03am",
        tag: "red",
        headline: "Report",
        title: "Your report was rejected!",
        subtitle: "Comment: You did not format it according to standard.",
      },
      {
        id: "n0f9302",
        action: "Jul 20",
        time: "7:12pm",
        tag: "green",
        headline: "Report submission",
        title: "You submitted your report",
        subtitle: "",
      },
    ],
  }),
};
</script>
<style>
.notifications {
  width: auto !important;
  height: 100%;
  border-left: 1px solid rgba(0, 0, 0, 0.12) !important;
  border-top: 1px solid rgba(0, 0, 0, 0.12) !important;
  border-radius: 0 !important;
}
</style>