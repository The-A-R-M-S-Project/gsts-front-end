<template>
  <div class="text-center">
    <v-dialog v-model="dialog" width="500">
      <template v-slot:activator="{ on, attrs }">
        <v-btn v-bind="attrs" v-on="on" color="primary">Assign examiner</v-btn>
      </template>

      <v-card>
        <v-card-title class="text-center headline purple white--text">Assign an examiner</v-card-title>
        <v-card-text class="py-3 px-6">
          <p class="body-1">Assign an examiner to {{student.name}}</p>
          <v-autocomplete
            v-model="examiner"
            :items="examiners"
            item-text="lastName"
            hide-details
            label="Select an examiner"
            single-line
            return-object
            color="purple"
          ></v-autocomplete>
          <v-expand-transition>
            <v-list v-if="examiner" class="purple lighten-5">
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>Name</v-list-item-title>
                  <v-list-item-subtitle>{{ field.firstName }} {{ field.lastName }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>Email</v-list-item-title>
                  <v-list-item-subtitle>{{ field.email }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>Phone</v-list-item-title>
                  <v-list-item-subtitle>{{ field.phoneNumber }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>Students</v-list-item-title>
                  <v-list-item-subtitle>{{ field.students.length }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-expand-transition>
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
  name: "AssignExaminer",
  data() {
    return {
      dialog: false,
      examiner: null,
    };
  },
  created() {
    this.$store.dispatch("fetchExaminers");
  },
  mounted() {
    console.log("Examiners: ", this.examiners);
  },
  computed: {
    student() {
      return this.$store.getters.student;
    },
    field() {
      if (!this.examiner) return {};
      return this.examiner;
    },
    examiners() {
      return this.$store.getters.examiners;
    },
  },
};
</script>