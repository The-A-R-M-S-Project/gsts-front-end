<template>
    <div>
        <DeanNav />
        <v-container fluid class="pt-1">
            <v-row class="mx-1">
                <ExaminersTable />
            </v-row>
        </v-container>
    </div>
</template>
<script>
import DeanNav from "@/components/DeanNav.vue";
import ExaminersTable from "@/components/ExaminersTable.vue";
export default {
    components: {
        DeanNav,
        ExaminersTable,
    },
};
</script>
