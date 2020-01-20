<template>
    <div>
        <div class="navbar">
            <Navigation/>
        </div>
        <v-layout row pt-4>
            <v-flex pt-5 style="height: 95vh;" class="scroll-y">
                <v-container fluid>
                    <h1 class="text-xs-center">Table Of Examiners</h1>
                    <ExaminersTable :program="program"></ExaminersTable>
                </v-container>
            </v-flex>
        </v-layout>
    </div>
</template>
<style>

</style>
<script>
import Navigation from "@/components/Navbar.vue"
import ExaminersTable from "@/components/ExaminersTable.vue"
    export default {
        components: {
            Navigation,
            ExaminersTable
        },
    }
</script>
