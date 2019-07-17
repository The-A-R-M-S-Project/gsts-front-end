<template>
    <div>
        <!-- <Navigation/> -->
        <v-layout row wrap>
            <v-flex md2>
                <!-- <Sidenav/> -->
            </v-flex>
            <v-flex md10 pa-2>
                <StudentsTable/>
            </v-flex>
        </v-layout>
    </div>
</template>

<script>
import StudentsTable from "@/components/StudentsTable.vue"
    export default {
        components: {
            StudentsTable
        },
        
    }
</script>
