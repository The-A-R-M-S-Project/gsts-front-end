import request from "@/services/base-request.js"

export default {
    getDepartments() {
        let uri = 'https://arms-graduate-student-tracker.herokuapp.com/api/department'
        return request.get({uri: uri}).then(response => {
            console.log('The response is ', response)
            return response
        })
    },
    getDeptProgramme() {
        let uri = 'https://arms-graduate-student-tracker.herokuapp.com/api/program'
        return request.get({uri: uri}).then(response =>{
            console.log('The response is', response)
            return response
        })
    }
}
