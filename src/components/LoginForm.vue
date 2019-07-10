<template>
    <v-form ref="form" v-model="form">
      <v-container>
           <v-text-field
                v-model="email"
                :rules="[rules.email]"
                label="College Email"
                prepend-inner-icon="person"
                type="email"
           >
           </v-text-field>
            <v-text-field
                v-model="password"
                :rules="[rules.password, rules.length(8)]"
                counter="8"
                label="password"
                prepend-inner-icon="lock"
                type="password"
            >
            </v-text-field>
            <div class="text-xs-center">
                <v-btn round large class="text-sm-center">Login</v-btn>
            </div>
      </v-container>
    </v-form>
</template>
<script>
export default{
    name: "LoginForm",
    data: () => ({
      email: undefined,
      form: false,
      password: undefined,
      rules: {
        email: v => (v || '').match(/@cedat.mak.ac.ug/) || 'Please enter a valid college email',
        length: len => v => (v || '').length >= len || `Invalid character length, required ${len}`,
        password: v => (v || '').match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*(_|[^\w])).+$/) ||
          'Must contain an uppercase letter, a numeric & special characters',
        required: v => !!v || 'This field is required'
      }
    })
}
</script>