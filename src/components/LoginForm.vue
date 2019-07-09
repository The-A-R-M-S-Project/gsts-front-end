<template>
    <v-form>
      <v-container>
           <v-text-field
                label="College Email"
                prepend-inner-icon="person"
                type="email"
           >
           </v-text-field>
            <v-text-field
                label="password"
                prepend-inner-icon="lock"
                type="password"
            >
            </v-text-field>
            <div class="text-xs-center">
                <v-btn round  class="text-sm-center">Login</v-btn>
            </div>
      </v-container>
    </v-form>
</template>
<script>
export default{
    name: "LoginForm",
}
</script>