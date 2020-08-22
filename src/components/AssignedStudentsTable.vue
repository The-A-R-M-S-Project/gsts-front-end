<template>
  <v-card color="blue">
    <v-card-title>
      <span class="mx-auto font-weight-bold headline white--text">Assigned Students</span>
    </v-card-title>
    <v-card-subtitle class="py-1">
      <v-row>
        <v-col>
          <v-text-field
            v-model="search"
            append-icon="search"
            label="Search"
            color="blue-grey lighten-4"
          ></v-text-field>
        </v-col>
      </v-row>
    </v-card-subtitle>
    <v-data-table
      :headers="headers"
      :items="assignedStudents"
      :search="search"
      :expanded="expanded"
      @click:row="itemClicked"
      show-expand
      item-key="student._id"
    >
      <template v-slot:no-results>
        <v-alert
          :value="true"
          color="error"
          icon="warning"
        >Your search for "{{ search }}" found no results.</v-alert>
      </template>
      <template v-slot:item.status="{ item }">{{ progressEvents[`${item.status}`].message }}</template>
      <template v-slot:item.vivaDate="{ item }">{{ formatDate(item.vivaDate) }}</template>
      <template v-slot:expanded-item="{ headers, item }">
        <td :colspan="headers.length">
          <v-row align="center" justify="center" class="px-0">
            <v-col
              cols="12"
              :sm="item.status === 'submitted' || item.status === 'withExaminer'?9:12"
              :md="item.status === 'submitted' || item.status === 'withExaminer'?10:12"
            >
              <v-progress-linear
                :value="progressEvents[`${item.status}`].value"
                :color="progressEvents[`${item.status}`].color"
                height="25"
              >
                <strong>{{progressEvents[`${item.status}`].value}}% ({{progressEvents[`${item.status}`].message}})</strong>
              </v-progress-linear>
            </v-col>
            <v-col cols="12" sm="3" md="2">
              <div class="text-center">
                <div class="text-center" v-if="item.status === 'submitted'">
                  <v-dialog v-model="dialog" width="500">
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn v-bind="attrs" v-on="on" color="primary">Agree</v-btn>
                    </template>

                    <v-card>
                      <v-card-title
                        class="text-center headline purple white--text"
                      >Acknowledge Receipt</v-card-title>
                      <v-card-text class="py-3 px-6">
                        <p class="body-1">
                          By clicking the "Agree" button, you are acknowledging receipt of
                          <strong>{{ student.student.name }}</strong>'s report.
                        </p>
                      </v-card-text>
                      <v-divider></v-divider>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="error" text @click="dialog = false">Cancel</v-btn>
                        <v-btn color="success" text @click="dialog = false">Agree</v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                </div>
                <div class="text-center" v-else-if="item.status === 'withExaminer'">
                  <v-dialog v-model="dialog" width="500">
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn small v-bind="attrs" v-on="on" color="primary">Set score</v-btn>
                    </template>

                    <v-card>
                      <v-card-title class="text-center headline purple white--text">Set a score</v-card-title>
                      <v-card-text class="py-3 px-6">
                        <p class="body-1">
                          Set a score for
                          <strong>{{ student.student.name }}</strong>'s report.
                        </p>
                        <v-form ref="reportScore">
                          <v-text-field
                            min="0"
                            max="100"
                            :rules="scoreRules"
                            label="Set score"
                            type="number"
                          ></v-text-field>
                        </v-form>
                      </v-card-text>
                      <v-divider></v-divider>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="error" text @click="dialog = false">Cancel</v-btn>
                        <v-btn color="success" text @click="setReportScore">Save</v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                </div>
              </div>
            </v-col>
          </v-row>
        </td>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import AssignedStudentData from "@/services/assigned-students-service.js";
export default {
  data() {
    return {
      search: "",
      assignedStudents: AssignedStudentData,
      expanded: [],
      dialog: false,
      scoreRules: [
        (score) => !!score || "A score is required",
        (score) => (score < 100 && score >= 0) || "Invalid score",
      ],
      headers: [
        {
          text: "STUDENT NAME",
          align: "left",
          sortable: false,
          value: "student.name",
        },
        {
          text: "PROGRAM",
          value: "program",
        },
        { text: "STATUS", value: "status" },
        { text: "VIVA DATE", value: "vivaDate" },
        { value: "data-table-expand" },
      ],
      progressEvents: {
        notSubmitted: {
          value: 0,
          message: "Not submitted",
          color: "grey",
        },
        submitted: {
          value: 17,
          message: "Submitted",
          color: "deep-orange darken-2",
        },
        withExaminer: {
          value: 39,
          message: "With examiner",
          color: "orange",
        },
        clearedByExaminer: {
          value: 56,
          message: "Cleared by examiner",
          color: "amber",
        },
        vivaDateSet: {
          value: 73,
          message: "Viva date set",
          color: "yellow darken-1",
        },
        vivaComplete: {
          value: 100,
          message: "Viva complete",
          color: "green lighten-2",
        },
      },
    };
  },
  computed: {
    student() {
      return this.$store.getters.student;
    },
  },
  methods: {
    itemClicked(value) {
      const index = this.expanded.indexOf(value);
      if (index === -1) {
        this.expanded.push(value);
      } else {
        this.expanded.splice(index, 1);
      }
      this.$store.dispatch("setStudentDetails", value);
    },
    viewDetails(student) {
      this.$store.dispatch("setStudentDetails", student).then(() => {
        this.$router.push("/student-progress");
      });
    },
    formatDate(date) {
      if (date !== "Not set") {
        let newFormat = new Date(date);
        let newDate = `${newFormat}`.substring(4, 15);
        return newDate.replace(/ /g, " - ");
      } else return date;
    },
    setReportScore() {
      if (this.$refs.reportScore.validate()) {
        this.dialog = false;
      }
    },
  },
};
</script>
