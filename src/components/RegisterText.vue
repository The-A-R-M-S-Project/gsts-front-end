<template>
    <v-container fill-height pa-0 overlayed>
        <v-row>
            <v-col class="px-8 py-7 text-center">
                <h1 class="display-2 font-weight-light mb-6 text-center">
                    Graduate Student Tracking System
                </h1>
                <p class="text-center">
                    A system for tracking master's students reports
                </p>
                <p class="text-center">
                    Are you a student? Register Here!
                </p>
                <v-btn
                    rounded
                    large
                    depressed
                    to="/register"
                    class="grey login__register-btn"
                >
                    <v-icon>mdi-account-plus</v-icon>
                    <span>&nbsp;Register</span>
                </v-btn>
            </v-col>
        </v-row>
    </v-container>
</template>
