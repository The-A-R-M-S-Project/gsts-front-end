<template>
    <div>
        <div class="navbar">
            <Navigation/>
        </div>
        <v-layout row wrap pt-4>
            <v-flex md3 pt-5>
                <SideNav @clickedLink="setProgram" @clickedDepartment="setDepartment"></SideNav>
            </v-flex>
            <v-flex md9 pt-5 style="height: 90vh;" class="scroll-y">
                <v-container>
                    <h1 class="text-xs-center">{{ department+' Engineering'}}</h1>
                    <StudentsTable :program="program"></StudentsTable>
                </v-container>
            </v-flex>
        </v-layout>
    </div>
</template>
<style>
.navbar{
    position: fixed; 
    z-index: 1; 
    width: 100%;
}
</style>
<script>
import StudentsTable from "@/components/StudentsTable.vue"
import SideNav from "@/components/departmentsSideNav.vue"
import Navigation from "@/components/Navbar.vue"
    export default {
        components: {
            StudentsTable,
            SideNav,
            Navigation
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
