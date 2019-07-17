<template>
    <div>
        <!-- <Navigation/> -->
        <v-layout row wrap>
            <v-flex md2 pt-4>
                <SideNav/>
            </v-flex>
            <v-flex md10>
                <v-container>
                    <StudentsTable/>
                </v-container>
            </v-flex>
        </v-layout>
    </div>
</template>

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
