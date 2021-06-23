<template>
    <v-dialog 
        v-model="rejectionReasonDialog"
        width="500"
    >
        <template v-slot:activator="{ on, attrs }">
        <v-btn
            v-bind="attrs"
            v-on="on"
            icon 
            color="error"
        >
            <v-icon color="error">mdi-open-in-new</v-icon>
        </v-btn>
        </template>
        <v-card>
        <v-card-title class="text-center headline error white--text">Rejection reason</v-card-title>
        <v-card-text class="py-3 px-6">
            <p class="body-1">
            {{ rejectionReason }}
            </p>
        </v-card-text>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="rejectionReasonDialog = false">
            Close
            </v-btn>
        </v-card-actions>
        </v-card>
    </v-dialog>    
</template>

<script>
export default {
    name: "ExaminerRejectionReason",
    props: {
        rejectionReason: String,
    },
    data() {
        return {
            rejectionReasonDialog: false
        }
    }
}
</script>