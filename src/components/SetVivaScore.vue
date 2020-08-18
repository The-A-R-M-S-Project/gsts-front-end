<template>
  <div class="text-center">
    <v-dialog v-model="dialog" width="500">
      <template v-slot:activator="{ on, attrs }">
        <v-btn v-bind="attrs" v-on="on" color="primary">Set viva score</v-btn>
      </template>

      <v-card>
        <v-card-title class="text-center headline purple white--text">Set viva score</v-card-title>
        <v-card-text class="py-3 px-6">
          <p class="body-1">Sign viva score for {{student.name}}</p>
          <v-form>
            <v-text-field label="Set score" type="number"></v-text-field>
          </v-form>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error" text @click="dialog = false">Cancel</v-btn>
          <v-btn color="success" text @click="dialog = false">Save</v-btn>
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
      picker: new Date().toISOString().substr(0, 10),
    };
  },
  computed: {
    student() {
      return this.$store.getters.student;
    },
    fields() {
      if (!this.examiner) return [];

      return Object.keys(this.examiner).map((key) => {
        return {
          key,
          value: this.examiner[key] || "n/a",
        };
      });
    },
  },
};
</script>