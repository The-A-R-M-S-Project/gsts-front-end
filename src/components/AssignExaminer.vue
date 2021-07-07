<template>
  <div class="text-center">
    <v-dialog v-model="dialog" width="500">
      <template v-slot:activator="{ on, attrs }">
        <v-btn v-bind="attrs" v-on="on" :loading="submitLoading" color="primary"
          >Assign examiner</v-btn
        >
      </template>

      <v-card>
        <v-card-title class="text-center headline purple white--text"
          >Assign an examiner</v-card-title
        >
        <v-card-text class="py-3 px-6">
          <p class="body-1">
            Assign an examiner to {{ selectedStudent.student.lastName }}
            {{ selectedStudent.student.firstName }}'s report
          </p>
          <p>
            <v-icon color="primary">mdi-information-outline</v-icon>
            If an examiner to be assigned 
            <span class="text-decoration-underline">is not registered</span>
            in the system, you can register them using the button below.
          </p>

          <div class="text-center my-4">
            <RegisterExaminer />
          </div>

          <p>
            <v-icon color="primary">mdi-information-outline</v-icon>
            If an examiner who has
            <span class="text-decoration-underline">already been assigned</span>
            to this report has
            <span class="text-decoration-underline">not</span> yet accepted to
            assess it, you may reassign them to this report under a different
            <i>examiner type.</i>
          </p>

          <v-form ref="selectExaminerForm">
            <v-autocomplete
              v-model="examiner"
              :items="examiners"
              item-text="lastName"
              hide-details
              label="Select an examiner"
              single-line
              :rules="examinerRules"
              return-object
              color="purple"
            ></v-autocomplete>
            <v-select
              v-model="examinerType"
              :items="examinerTypes"
              item-text="name"
              label="Select examiner type"
              :rules="examinerRules"
              color="purple"
              class="mt-6"
            ></v-select>
          </v-form>

          <v-expand-transition>
            <v-list v-if="examiner" class="purple lighten-5">
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>Name</v-list-item-title>
                  <v-list-item-subtitle
                    >{{ field.firstName }}
                    {{ field.lastName }}</v-list-item-subtitle
                  >
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
                  <v-list-item-subtitle>{{
                    field.phoneNumber
                  }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <!-- <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>Assigned Students</v-list-item-title>
                  <v-list-item-subtitle>{{
                    field.students.length
                  }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item> -->
            </v-list>
          </v-expand-transition>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="dialog = false">Cancel</v-btn>
          <v-btn color="success" text :loading="submitLoading" @click="assignExaminer">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import RegisterExaminer from "@/components/RegisterExaminer.vue"

export default {
  name: "AssignExaminer",
  data() {
    return {
      dialog: false,
      examiner: null,
      examinerType: null,
      examinerTypes: [
        { name: "Internal", value: "internal" },
        { name: "External", value: "external" },
      ],
      examinerRules: [(examiner) => !!examiner || "This field is required!"],
    };
  },
  async created() {
    await this.$store.dispatch("fetchExaminers");
  },
  computed: {
    ...mapGetters(["selectedStudent", "examiners", "submitLoading"]),

    field() {
      if (!this.examiner) return {};
      return this.examiner;
    },
  },
  methods: {
    async assignExaminer() {
      if (this.$refs.selectExaminerForm.validate()) {
        let assignedExaminer = `${this.examiner.firstName} ${this.examiner.lastName}`;
        await this.$store.dispatch("assignExaminer", {
          examinerID: this.examiner._id,
          examinerType: this.examinerType,
          studentReportID: this.selectedStudent._id,
          examinerName: assignedExaminer,
          studentName: `${this.selectedStudent.student.firstName} ${this.selectedStudent.student.lastName}`,
        });
        await this.$store.dispatch("fetchReports");
        this.$store.dispatch("changeStudentsTableKey");
        this.dialog = false;
      }
    },
  },
  components: {
    RegisterExaminer
  }
};
</script>