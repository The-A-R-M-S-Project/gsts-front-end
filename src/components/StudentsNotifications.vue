<template>
  <v-list two-line class="notifications">
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title>
          <div class="title text-center font-weight-bold mb-4">
            Activity Log
          </div>
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>

    <v-divider></v-divider>

    <v-list-item-group active-class="purple--text">
      <template v-for="(item, index) in notifications">
        <v-list-item :key="item.id">
          <template>
            <v-list-item-action>
              <v-icon :color="item.tag">mdi-circle</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title v-text="item.headline"></v-list-item-title>
              <v-list-item-subtitle
                class="text-wrap"
                v-text="item.title"
              ></v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-action
              v-if="item.title !== 'No comments have been made on this report'"
            >
              <v-list-item-action-text
                v-text="item.action"
              ></v-list-item-action-text>
              <v-list-item-action-text
                v-text="item.time"
              ></v-list-item-action-text>
            </v-list-item-action>
          </template>
        </v-list-item>

        <v-divider
          v-if="index + 1 < notifications.length"
          :key="index"
        ></v-divider>
      </template>
    </v-list-item-group>
  </v-list>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "students-notifications",
  data() {
    return {
      notifications: [],
    };
  },
  async mounted() {
    if (this.studentReport.submittedAt) {
      this.notifications.push({
        id: this.studentReport._id,
        action: this.formatDate(this.studentReport.submittedAt).date,
        time: this.formatDate(this.studentReport.submittedAt).time,
        tag: "green",
        headline: "Report submission",
        title: "You've successfully submitted your report!",
      });
    }
    if (this.reportComments.length > 0) {
      let comments = this.reportComments;
      comments.sort((a, b) => {
        return new Date(b.createdAt) - new Date(a.createdAt);
      });
      comments = this.reportComments.map((comment) => {
        return {
          id: comment._id,
          action: this.formatDate(comment.createdAt).date,
          time: this.formatDate(comment.createdAt).time,
          tag: "red",
          headline: "Report comment",
          title: comment.text,
        };
      });
      this.notifications.push(...comments);
    }
  },
  computed: {
    ...mapGetters(["studentReport", "reportComments"]),
  },
  methods: {
    formatDate(timestamp) {
      let monthDay = new Date(timestamp);
      let time = `${monthDay.toLocaleTimeString(
        {},
        {
          hour12: true,
          hour: "numeric",
          minute: "numeric",
        }
      )}`;
      let date = `${new String(monthDay).substring(4, 15).replace(/ /g, "-")}`;
      return { time: time, date: date };
    },
  },
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