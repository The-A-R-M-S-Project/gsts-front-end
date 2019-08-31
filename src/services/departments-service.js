import request from "@/services/base-request.js"

export default {
    getEngDepartments() {
        let uri = 'https://arms-graduate-student-tracker.herokuapp.com/api/school/5c88fa8cf4afda39709c2955/department'
        return request.get({uri: uri}).then(response => {
            return response
        })
    },

    getDeptProgramme() {
        let uri = 'https://arms-graduate-student-tracker.herokuapp.com/api/program'
        return request.get({uri: uri}).then(response =>{
            return response
        })
    }
}
