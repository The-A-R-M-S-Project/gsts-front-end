<template>
  <div class="text-center">
    <v-dialog v-model="dialog" width="500">
      <template v-slot:activator="{ on, attrs }">
        <v-btn v-bind="attrs" v-on="on" :loading="submitLoading" color="primary"
          >Set viva score</v-btn
        >
      </template>

      <v-card>
        <v-card-title class="text-center headline purple white--text"
          >Set viva score
          <v-spacer></v-spacer>
          <v-btn
            @click="viewDetails()"
            dark
            large
            icon
            :disabled="user.role === 'secretary'"
            :loading="detailLoading"
          >
            <v-icon large dark> mdi-open-in-new </v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text class="py-3 px-6">
          <p class="body-1">
            Set viva score for {{ selectedStudent.student.firstName }}
            {{ selectedStudent.student.lastName }}
          </p>
          <p>
            <v-icon color="primary">mdi-information-outline</v-icon>
            By setting a viva examination score for
            {{ selectedStudent.student.firstName }}
            {{ selectedStudent.student.lastName }}, you acknowledge that this
            student has completed their viva examination.
          </p>
          <v-form ref="vivaScore">
            <v-text-field
              v-model="score"
              label="Set score"
              :rules="scoreRules"
              type="number"
            ></v-text-field>
          </v-form>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error" text @click="dialog = false">Cancel</v-btn>
          <v-btn color="success" text @click="setVivaScore">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "SetVivaDate",
  data() {
    return {
      dialog: false,

      score: null,
      scoreRules: [
        (score) => !!score || "A score is required",
        (score) => (score < 100 && score >= 0) || "Invalid score",
      ],
    };
  },
  computed: {
    ...mapGetters([
      "detailLoading",
      "selectedStudent",
      "submitLoading",
      "user",
    ]),
  },
  methods: {
    viewDetails() {
      this.$router.push(`/student-progress/${this.selectedStudent._id}`);
    },
    async setVivaScore() {
      if (this.$refs.vivaScore.validate()) {
        await this.$store.dispatch("setVivaScore", {
          reportID: this.selectedStudent._id,
          studentName: this.selectedStudent.student.firstName,
          vivaScore: { vivaScore: this.score },
        });
        await this.$store.dispatch("fetchReports");
        this.$store.dispatch("changeStudentsTableKey");
        this.dialog = false;
      }
    },
  },
};
</script>