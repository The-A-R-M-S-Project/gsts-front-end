<template>
  <div class="text-center">
    <v-dialog v-model="dialog" width="500">
      <template v-slot:activator="{ on, attrs }">
        <v-btn v-bind="attrs" v-on="on" :loading="submitLoading" color="primary">Set viva score</v-btn>
      </template>

      <v-card>
        <v-card-title class="text-center headline purple white--text">Set viva score</v-card-title>
        <v-card-text class="py-3 px-6">
          <p class="body-1">Set viva score for {{student.name}}</p>
          <v-form ref="vivaScore">
            <v-text-field v-model="score" label="Set score" :rules="scoreRules" type="number"></v-text-field>
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
    student() {
      return this.$store.getters.student;
    },
    submitLoading() {
      return this.$store.getters.submitLoading;
    },
  },
  methods: {
    setVivaScore() {
      if (this.$refs.vivaScore.validate()) {
        this.$store
          .dispatch("setVivaScore", {
            reportID: this.student.report._id,
            studentName: this.student.name,
            vivaScore: { vivaScore: this.score },
          })
          .then(() => {
            this.$store.dispatch("fetchReports").then(() => {
              this.$store.dispatch("setStudentsTableKey");
            });
          });
        this.dialog = false;
      }
    },
  },
};
</script>