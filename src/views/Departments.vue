<template>
    <div>
        <!-- <Navigation/> -->
        <v-layout row wrap>
            <v-flex md3 pt-4>
                <SideNav @clickedLink="setProgram" @clickedDepartment="setDepartment"></SideNav>
            </v-flex>
            <v-flex md9 style="height: 95vh;" class="scroll-y">
                <v-container>
                    <h1 class="text-xs-center">{{ department+' Engineering'}}</h1>
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
                program: null,
                department: 'Electrical and Computer'
            }
        },
        methods: {
            setProgram(programName){
                this.program = programName
            },
            setDepartment(departmentName){
                this.department = departmentName
            }
        }
        
    }
</script>
