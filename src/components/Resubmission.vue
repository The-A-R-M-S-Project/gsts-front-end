<template>
  <section class="text-center">
    <v-row align="center" justify="center" no-gutters>
      <v-col
        v-if="
          studentReport.status === 'submitted' ||
          studentReport.status === 'clearedByExaminers'
        "
        cols="12"
        class="px-sm-12 mx-sm-12"
      >
        <div class="text-center">
          <h3 class="text-center text-underline">Resubmission</h3>
          <hr class="mx-auto divider" />
        </div>
        <div class="text-center">
          <v-alert
            v-if="displayResubmissionMessage"
            color="success"
            class="white--text text-capitalize"
          >
            {{ requestResubmissionMessage }}
          </v-alert>
        </div>
        <v-row no-gutters align="center" justify="center">
          <v-col>
            <p>
              <v-icon color="primary">mdi-information</v-icon>
              If the student had just submitted, by requesting a resubmission of
              this report, the student's progress will be reverted back to
              <i>"Not submitted"</i>. <br />
            </p>
            <p>
              <v-icon color="primary">mdi-information</v-icon>
              If the student's report had been assessed by all the examiners, by
              requesting a resubmission of this report, the student's progress
              will be reverted back to
              <i>"Not submitted"</i> and after the student resubmits, examiners
              will have to be reassigned to this report. <br />
            </p>
          </v-col>
        </v-row>
        <v-row align="center" justify="center" no-gutters class="pb-6">
          <v-col cols="12" sm="8">
            <div class="text-center">
              <v-form ref="resubmissionForm">
                <v-textarea
                  outlined
                  v-model="resubmissionReason"
                  label="Include reason for resubmission"
                  :rules="commentRules"
                ></v-textarea>
              </v-form>
            </div>
          </v-col>
          <v-col cols="12" sm="4">
            <div class="text-center">
              <v-btn
                color="primary"
                dark
                @click="requestResubmission"
                :loading="submitLoading"
              >
                Request resubmission
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12" class="px-sm-12 mx-sm-12">
        <div class="text-center">
          <h3 class="text-center text-underline">Comments</h3>
          <hr class="mx-auto divider" />
        </div>
        <v-row no-gutters align="center" justify="center">
          <v-col>
            <p>
              <v-icon color="primary">mdi-information</v-icon>
              These comments will be seen by the student.
            </p>
          </v-col>
        </v-row>
        <v-row
          v-for="comment in reportComments"
          :key="comment._id"
          align="center"
          justify="center"
          no-gutters
        >
          <v-col>
            <v-row no-gutters align="center" justify="space-between">
              <p
                v-if="
                  comment.text === 'No comments have been made on this report'
                "
                class="grey--text"
              >
                {{ comment.text }}
              </p>
              <p v-else>
                <span>
                  <v-icon color="teal"> mdi-circle </v-icon>
                </span>
                {{ comment.text }}
                (
                <span class="body-2 grey--text">
                  {{ formatDate(comment.createdAt) }}
                </span>
                )
              </p>
            </v-row>
          </v-col>
        </v-row>
        <v-row align="center" justify="center" no-gutters class="pb-6">
          <v-col cols="12" sm="9">
            <div class="text-center">
              <v-form ref="createCommentForm">
                <v-textarea
                  outlined
                  v-model="comment"
                  label="Create a comment"
                  :rules="commentRules"
                ></v-textarea>
              </v-form>
            </div>
          </v-col>
          <v-col cols="12" sm="3">
            <div class="text-center">
              <v-btn
                color="teal"
                dark
                @click="createComment()"
                :loading="submitLoading"
              >
                add comment
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </section>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "resubmission",
  data() {
    return {
      comment: "",
      resubmissionReason: "",
      displayResubmissionMessage: false,
      commentRules: [(comment) => !!comment || "Please write a comment!"],
    };
  },
  computed: {
    ...mapGetters([
      "reportComments",
      "studentReport",
      "submitLoading",
      "requestResubmissionMessage",
    ]),
  },
  methods: {
    formatDate(timestamp) {
      let monthDay = new Date(timestamp);
      return `${monthDay.toLocaleTimeString(
        {},
        {
          hour12: true,
          hour: "numeric",
          minute: "numeric",
        }
      )}, ${new String(monthDay).substring(4, 15).replace(/ /g, "-")}`;
    },
    async requestResubmission() {
      if (this.$refs.resubmissionForm.validate()) {
        await this.$store.dispatch("requestResubmission", {
          report: this.studentReport._id,
          reason: { reason: this.resubmissionReason },
        });
        this.$router.go();
      }
    },
    async createComment() {
      if (this.$refs.createCommentForm.validate()) {
        await this.$store.dispatch("createComment", {
          report: this.studentReport._id,
          comment: { text: this.comment },
        });
        if (this.requestResubmissionMessage) {
          this.displayResubmissionMessage = true;
        }
        this.$router.go();
      }
    },
  },
};
</script>

<style>
.divider {
  width: 8rem;
  border: 2px solid black;
  margin-bottom: 1rem;
}
</style>