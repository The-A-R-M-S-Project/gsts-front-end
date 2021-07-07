<template>
    <div>
    <v-dialog v-model="dialog" width="500">
      <template v-slot:activator="{ on, attrs }">
        <v-btn v-bind="attrs" v-on="on" color="primary">
            <v-icon>mdi-plus-circle</v-icon> &nbsp;
            Register examiner
        </v-btn>
      </template>

      <v-card>
        <v-card-title class="text-center headline purple white--text"
          >Register an examiner</v-card-title
        >
        <v-card-text class="py-3 px-6">
          <v-alert 
            v-if="displayMessage" 
            :type="registerExaminerMessage.status" 
            class="text-center"
          >
            {{ registerExaminerMessage.message }}
          </v-alert>
          <v-form ref="registerExaminerForm">
            <v-row align="center" justify="center">
              <v-col cols="12" sm="6">
                <v-text-field
                  prepend-icon="mdi-account"
                  v-model="firstName"
                  label="First name"
                  :rules="nameRules"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  prepend-icon="mdi-account"
                  v-model="lastName"
                  label="Last name"
                  :rules="nameRules"
                ></v-text-field>
              </v-col>
              <!-- <v-col cols="12">
                <v-text-field
                  prepend-icon="mdi-home"
                  v-model="affiliation"
                  label="Affiliation"
                  :rules="nameRules"
                ></v-text-field>
              </v-col> -->
              <v-col cols="12">
                <v-text-field
                  prepend-icon="mdi-email"
                  v-model="email"
                  label="Email"
                  :rules="emailRules"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  prepend-icon="mdi-phone"
                  v-model="phoneNumber"
                  label="Phone number"
                  :rules="phoneNumberRules(10)"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-form>
          <div class="text-center">
            <v-btn color="primary" :loading="submitLoading" @click="registerExaminer">Save</v-btn>
          </div>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="dialog = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>    
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "RegisterExaminer",
  data(){
    return {
      dialog: false,
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      affiliation: "",
      displayMessage: false,
      nameRules: [field => !!field || "This field is required"],
      emailRules: [
        (email) => !!email || "E-mail is required",
        email => /.+@.+\..+/.test(email) || 'Please enter a valid email'
      ],
      phoneNumberRules: (len) => [
        (phoneNumberField) =>
          (phoneNumberField || "").length === 10 ||
          `Phone number must be ${len} digits`,
        (number) => !!number || "Phone number is required",
        (number) =>
          /(?=^07)(?=\d{10})/.test(number) || "The phone number is not valid",
      ],
    }
  },
  computed: {
    ...mapGetters(['submitLoading', 'registerExaminerMessage'])
  },
  methods: {
    async registerExaminer(){
      if(this.$refs.registerExaminerForm.validate()){
        let randomPassword = this.randomString(8, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');
        await this.$store.dispatch("registerExaminer", {
          role: "examiner",
          firstName: this.firstName,
          lastName: this.lastName,
          email: this.email,
          // affiliation: this.affiliation,
          password: randomPassword,
          passwordConfirm: randomPassword,
          phoneNumber: this.phoneNumber
        });
        this.displayMessage = true;
        setTimeout(() => {
          this.displayMessage = false;
        }, 5000);
        await this.$store.dispatch("fetchExaminers");
      }
    },
    randomString(length, chars) {
      var result = '';
      for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
      return result;
    }
  }
}
</script>