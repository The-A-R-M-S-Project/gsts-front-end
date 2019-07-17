<template>
    <div>
        <!-- <Navigation/> -->
        <v-layout row wrap>
            <v-flex md3 pt-4>
                <SideNav/>
            </v-flex>
            <v-flex md9 style="height: 95vh;" class="scroll-y">
                <v-container>
                    <StudentsTable/>
                </v-container>
            </v-flex>
        </v-layout>
    </div>
</template>
<style>

</style>
<script>
import StudentsTable from "@/components/StudentsTable.vue"
import SideNav from "@/components/departmentsSideNav.vue"
    export default {
        components: {
            StudentsTable,
            SideNav
        },
        
    }
</script>
