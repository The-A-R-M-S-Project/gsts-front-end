<template>
    <div>
<<<<<<< HEAD
<<<<<<< HEAD
        <!-- <Navigation/> -->
        <v-layout row wrap>
            <v-flex md3 pt-4>
                <SideNav @clickedLink="setProgram"></SideNav>
            </v-flex>
            <v-flex md9 style="height: 95vh;" class="scroll-y">
                <v-container>
                    <StudentsTable :program="program"></StudentsTable>
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
        data(){
            return{
                program: null
            }
        },
        methods: {
            setProgram(programName){
                this.program = programName
            }
        }
        
=======
        departments view
=======
        <!-- <Navigation/> -->
        <v-layout row wrap>
            <v-flex md2>
                <!-- <Sidenav/> -->
            </v-flex>
            <v-flex md10>
                <StudentsTable/>
            </v-flex>
        </v-layout>
>>>>>>> [Wycliff] creates Students' Table component
    </div>
</template>

<script>
import StudentsTable from "@/components/StudentsTable.vue"
    export default {

>>>>>>> [Rodrick] creates departments view
    }
</script>
