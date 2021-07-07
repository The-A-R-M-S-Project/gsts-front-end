import axiosInstance from "../axios_setup"

const state = {
    student: {},
    selectedStudent: {},
    studentDetailsError: null,
    tableLoading: false,
    reports: [],
    reportsError: null,
    examiners: [],
    fetchExaminersError: null,
    submitLoading: false,
    reportComments: [],
    examinerReportStatuses: [],
    createCommentError: null,
    requestResubmissionMessage: '',
    requestResubmissionError: null,
    displayStudentTableFeedback: false,
    assignExaminerError: null,
    vivaPanelMessage: null,
    vivaPanelSectionKey: 0,
    studentsTableMessage: '',
    registerExaminerMessage: {},
    vivaDateError: null,
    studentsTableKey: 0,
    examinerAssessments: [],
    vivaScoreError: null,
    displayInTable: true,
    vivaReportError: null,
    progressEvents: {
        notSubmitted: {
            value: 0,
            message: "Not submitted",
            color: "grey",
            step: 1
        },
        resubmit: {
            value: 0,
            message: "Resubmit",
            color: "grey",
            step: 1
        },
        submitted: {
            value: 14,
            message: "Submitted",
            color: "deep-orange darken-3",
            step: 2
        },
        assignedToExaminers: {
            value: 28,
            message: "Assigned to examiners",
            color: "deep-orange darken-1",
            step: 2
        },
        receivedByExaminers: {
            value: 42,
            message: "Received by examiners",
            color: "orange",
            step: 3
        },
        clearedByExaminers: {
            value: 56,
            message: "Cleared by examiners",
            color: "orange lighten-2",
            step: 4
        },
        vivaDateSet: {
            value: 70,
            message: "Viva date set",
            color: "amber",
            step: 5
        },
        vivaComplete: {
            value: 84,
            message: "Viva complete",
            color: "green lighten-2",
            step: 6
        },
        complete: {
            value: 100,
            message: "Completed",
            color: "green",
            step: 7
        }
    }
}
const mutations = {
    fetchStudentDetailsError(state, payload) {
        state.studentDetailsError = payload
    },
    setSelectedStudent(state, payload) {
        state.selectedStudent = payload
    },
    setLoader(state, payload) {
        state.tableLoading = payload
    },
    setReports(state, payload) {
        state.reports = payload
    },
    fetchReportsError(state, payload) {
        state.reportsError = payload
    },
    setExaminerList(state, payload) {
        state.examiners = payload
    },
    fetchExaminerError(state, payload) {
        state.fetchExaminersError = payload
    },
    setSubmitLoader(state, payload) {
        state.submitLoading = payload
    },
    addReportComment(state, payload) {
        if (state.reportComments[0].text === 'No comments have been made on this report') {
            state.reportComments.pop()
        }
        state.reportComments.push(payload)
    },
    setCreateCommentError(state, payload) {
        state.createCommentError = payload
    },
    setReportComments(state, payload) {
        state.reportComments = payload
    },
    setExaminerReportStatuses(state, payload) {
        state.examinerReportStatuses = payload
    },
    requestResubmissionSuccess(state, payload) {
        state.requestResubmissionMessage = payload
    },
    setRequestResubmissionError(state, payload) {
        state.requestResubmissionError = payload
    },
    setRequestExaminersMessage(state, payload) {
        let str = payload.status
        let success = `${
            str[0].toUpperCase()
        }${
            str.slice(1)
        }`;
        state.studentsTableMessage = `${success}. ${payload.message}`;
        state.displayInTable = false;
    },
    assignExaminerSuccess(state, payload) {
        let str = payload.res
        let success = `${
            str[0].toUpperCase()
        }${
            str.slice(1)
        }`;
        state.studentsTableMessage = `${success}. You've assigned ${payload.examiner} to ${payload.student}'s report`;
        state.displayInTable = false;
    },
    removeExaminerSuccess(state, payload) {
        let str = payload.res
        let success = `${
            str[0].toUpperCase()
        }${
            str.slice(1)
        }`;
        state.studentsTableMessage = `${success}. You've disinvited ${payload.examiner} from assessing ${payload.student}'s report`;
        state.displayInTable = false;
    },
    setExaminerAssessments(state, payload) {
        state.examinerAssessments = payload
    },
    changeVivaPanel(state, payload) {
        delete state.selectedStudent.viva;
        state.selectedStudent = Object.assign(state.selectedStudent, { viva: payload });
    },
    setDisplayStudentTableFeedback(state, payload) {
        state.displayStudentTableFeedback = payload
    },
    setAssignExaminerError(state, payload) {
        state.studentsTableMessage = `Error! ${payload}`;
        state.displayInTable = false;
    },
    setRegisterExaminerMessage(state, payload) {
        state.registerExaminerMessage = payload;
    },
    setVivaPanelMessage(state, payload) {
        state.vivaPanelMessage = payload
    },
    setVivaDateSuccess(state, payload) {
        let str = payload.res
        let success = `${
            str[0].toUpperCase()
        }${
            str.slice(1)
        }`;
        state.studentsTableMessage = `${success}. You've set a viva date for ${payload.name}`;
        state.displayInTable = true;
    },
    changeVivaPanelSectionKey(state) {
        state.vivaPanelSectionKey++;
    },
    setVivaDateError(state, payload) {
        state.vivaDateError = payload
    },
    changeStudentsTableKey(state) {
        state.studentsTableKey ++
    },
    setVivaScoreSuccess(state, payload) {
        let str = payload.res
        let success = `${
            str[0].toUpperCase()
        }${
            str.slice(1)
        }`;
        state.studentsTableMessage = `${success}. You've set a viva score for ${payload.name}`;
        state.displayInTable = true;
    },
    setVivaReportSuccess(state, payload) {
        let str = payload.res
        let success = `${
            str[0].toUpperCase()
        }${
            str.slice(1)
        }`;
        state.studentsTableMessage = `${success}. You've uploaded a viva assessment report for ${payload.name}`;
        state.displayInTable = true;
    },
    setVivaScoreError(state, payload) {
        state.vivaScoreError = payload;
    },
    setVivaReportError(state, payload) {
        state.vivaReportError = payload;
    }
}
const actions = {
    async fetchReports({commit}) {
        commit("setLoader", true)
        let accessToken = localStorage.getItem("jwt");
        axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
        try {
            let response = await axiosInstance.get('/report')
            commit("setReports", response.data)
            commit("setLoader", false)
        } catch (error) {
            commit("setLoader", false)
            commit("fetchReportsError", error.response.data.message)
        }
    },
    async fetchSecretaryReports({commit}) {
        commit("setLoader", true)
        let accessToken = localStorage.getItem("jwt");
        axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
        try {
            let response = await axiosInstance.get('/viva/staff/getSetVivaDateStudents')
            commit("setReports", response.data.vivas)
            commit("setLoader", false)
        } catch (error) {
            commit("setLoader", false)
            commit("fetchReportsError", error.response.data.message)
        }
    },
    async uploadVivaCommitteeReport({
        commit
    }, data) {
        commit("setSubmitLoader", true);
        let accessToken = localStorage.getItem("jwt");
        axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
        try {
            let response = await axiosInstance.patch(`/report/staff/uploadVivaCommitteeReport/${data.studentReportID
                }`, data.report);
            commit("setVivaReportSuccess", {
                res: response.data.status,
                name: data.studentName
            });
            commit("setDisplayStudentTableFeedback", true);
            commit("setSubmitLoader", false);
        } catch (error) {
            commit("setSubmitLoader", false);
            commit("setVivaReportError", error.response.data.message);
        }
    },
    async fetchExaminerAssessment({
        commit
    }, reportID) {
        let accessToken = localStorage.getItem("jwt");
        axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
        try {
            let response = await axiosInstance.get(`/report/staff/examiner/status/${reportID}`);
            commit("setExaminerReportStatuses", response.data.examinerReports);
            let clearedReportAssessments = response.data.examinerReports.filter(report => {
                return report.status === "clearedByExaminer"
            })
            commit("setExaminerAssessments", clearedReportAssessments)
        } catch (error) {
            commit("fetchExaminerError", error.response.data.message)
        }
    },
    async requestResubmission({
        commit
    }, data) {
        let accessToken = localStorage.getItem("jwt");
        axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
        commit("setSubmitLoader", true);
        try {
            let response = await axiosInstance.patch(`/report/staff/requestResubmit/${data.report}`, data.reason);
            commit("requestResubmissionSuccess", response.data.status);
            commit("setSubmitLoader", false);
        } catch (error) {
            commit("setSubmitLoader", false);
            commit("setRequestResubmissionError", error.response.data.message);
        }
    },
    async createComment({
        commit
    }, data) {
        let accessToken = localStorage.getItem("jwt");
        axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
        commit("setSubmitLoader", true)
        try {
            let response = await axiosInstance.post(`/comment/report/${
                data.report
            }`, data.comment)
            commit("addReportComment", response.data.comment)
            commit("setSubmitLoader", false)
        } catch (error) {
            commit("setSubmitLoader", false)
            commit("setCreateCommentError", error.response.data.message)
        }
    },
    async fetchReportComments({
        commit
    }, data) {
        let accessToken = localStorage.getItem("jwt");
        axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
        try {
            let response = await axiosInstance.get(`/comment/report/${data}`);
            commit("setReportComments", response.data.comments);
        } catch (error) {
            commit("setReportComments", [{text: error.response.data.message}]);
        }
    },
    async fetchExaminers({commit}) {
        let accessToken = localStorage.getItem("jwt");
        axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
        try {
            let response = await axiosInstance.get("/staff/")
            commit("setExaminerList", response.data)
        } catch (error) {
            commit("fetchExaminerError", error.response.data.message)
        }
    },
    async assignExaminer({
        commit
    }, data) {
        commit("setSubmitLoader", true)
        let accessToken = localStorage.getItem("jwt");
        axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
        try {
            let response = await axiosInstance.patch(`/report/staff/examiner/assign/${data.studentReportID}`, {
                examiner: data.examinerID,
                examinerType: data.examinerType
            });
            commit("assignExaminerSuccess", {
                res: response.data.status,
                examiner: data.examinerName,
                student: data.studentName
            });
            commit("setDisplayStudentTableFeedback", true);
            commit("setSubmitLoader", false);
        } catch (error) {
            commit("setSubmitLoader", false);
            commit("setDisplayStudentTableFeedback", true);
            commit("setAssignExaminerError", error.response.data.message);
        }
    },
    async requestForExaminers({ commit }, data) {
        commit("setSubmitLoader", true)
        let accessToken = localStorage.getItem("jwt");
        axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
        try {
            let response = await axiosInstance.patch("/staff/principal/requestReportExaminers", data);
            commit("setRequestExaminersMessage", {
                status: "success",
                message: response.data.message
            });
            commit("setDisplayStudentTableFeedback", true);
            commit("setSubmitLoader", false);
        } catch (error) {
            commit("setSubmitLoader", false);
            commit("setDisplayStudentTableFeedback", true);
            commit("setRequestExaminersMessage", {
                status: "error",
                message: error.response.data.message
            });
        }
    },
    async registerExaminer({ commit }, data) {
        commit("setSubmitLoader", true)
        try {
            let response = await axiosInstance.post("/staff/signup", data);
            commit("setRegisterExaminerMessage", {
                status: response.data.status,
                message: "Examiner successfully registered!"
            });
            commit("setSubmitLoader", false);
        } catch (error) {
            commit("setSubmitLoader", false);
            commit("setRegisterExaminerMessage", {
                status: "error",
                message: error.response.data.message
            });
        }
    },
    async removeExaminer({ commit }, data) {
        commit("setSubmitLoader", true)
        let accessToken = localStorage.getItem("jwt");
        axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
        try {
            let response = await axiosInstance.delete(`/report/staff/examiner/remove/${data.reportID}/${data.examinerID}`);
            commit("removeExaminerSuccess", {
                res: response.data.status,
                examiner: data.examinerName,
                student: data.studentName
            });
            commit("setDisplayStudentTableFeedback", true);
            commit("setSubmitLoader", false);
        } catch (error) {
            commit("setSubmitLoader", false);
            commit("setDisplayStudentTableFeedback", true);
            commit("setAssignExaminerError", error.response.data.message);
        }
    },
    async addVivaCommitteeMember({
        commit
    }, data) {
        commit("setSubmitLoader", true)
        let accessToken = localStorage.getItem("jwt");
        axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
        try {
            let response = await axiosInstance.patch(`/viva/staff/addVivaCommitteeMember/${data.reportID}`, data.member);
            commit("changeVivaPanel", response.data.viva);
            commit("setVivaPanelMessage", { status: "success", message: "Viva panel member successfully added!" });
            commit("setSubmitLoader", false);
        } catch (error) {
            commit("setSubmitLoader", false);
            commit("setVivaPanelMessage", { status: "error", message: error.response.data.message });
        }
    },
    async removeVivaCommitteeMember({ commit }, data) {
        commit("setSubmitLoader", true);
        let accessToken = localStorage.getItem("jwt");
        axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
        try {
            let response = await axiosInstance.patch(`/viva/staff/removeVivaCommitteeMember/${data.reportID}`, data.payload);
            commit("changeVivaPanel", response.data.viva);
            commit("setVivaPanelMessage", { status: "success", message: "Viva panel member successfully removed!" });
            commit("setSubmitLoader", false);
        } catch (error) {
            commit("setSubmitLoader", false);
            console.log(error.response.data.message);
            commit("setVivaPanelMessage", { status: "error", message: error.response.data.message });
        }
    },
    async setVivaDate({
        commit
    }, data) {
        commit("setSubmitLoader", true)
        let accessToken = localStorage.getItem("jwt");
        axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
        try {
            let response = await axiosInstance.patch(`/viva/staff/vivadate/${
                data.reportID
            }`, data.vivaDate)
            commit("setVivaDateSuccess", {
                res: response.data.status,
                name: data.studentName
            })
            commit("setDisplayStudentTableFeedback", true)
            commit("setSubmitLoader", false)
        } catch (error) {
            commit("setSubmitLoader", false)
            commit("setVivaDateError", error.response.data.message)
        }
    },
    async setVivaScore({
        commit
    }, data) {
        commit("setSubmitLoader", true)
        let accessToken = localStorage.getItem("jwt");
        axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
        try {
            let response = await axiosInstance.patch(`/viva/staff/vivascore/${
                data.reportID
            }`, data.vivaScore)
            commit("setVivaScoreSuccess", {
                res: response.data.status,
                name: data.studentName
            })
            commit("setDisplayStudentTableFeedback", true)
            commit("setSubmitLoader", false)
        } catch (error) {
            commit("setSubmitLoader", false)
            commit("setVivaScoreError", error.response.data.message)
        }
    },
    setSelectedStudent({
        commit
    }, data) {
        commit("setSelectedStudent", data)
    },
    setDisplayStudentTableFeedback({
        commit
    }, data) {
        commit("setDisplayStudentTableFeedback", data)
    },
    changeStudentsTableKey({commit}) {
        commit("changeStudentsTableKey")
    },
    filterBySchool({
        commit
    }, data) {
        let students = data.reports.filter(report => {
            return(report.student["department"].school == data.id);
        })
        commit("setReports", students)
    },
    filterByDepartment({
        commit
    }, data) {
        let students = data.reports.filter(report => {
            return(report.student["department"]._id == data.id);
        })
        commit("setReports", students)
    }
}
const getters = {
    submitLoading: (state) => state.submitLoading,
    tableLoading: (state) => state.tableLoading,
    progressEvents: (state) => state.progressEvents,
    selectedStudent: (state) => state.selectedStudent,
    reports: (state) => state.reports,
    displayInTable: (state) => state.displayInTable,
    vivaReportError: (state) => state.vivaReportError,
    vivaPanelMessage: (state) => state.vivaPanelMessage,
    vivaPanelSectionKey: (state) => state.vivaPanelSectionKey,
    examiners: (state) => {
        return state.examiners.filter(staff => {
            return staff.role === "examiner"
        })
    },
    registerExaminerMessage: (state) => state.registerExaminerMessage,
    examinerReportStatuses: (state) => state.examinerReportStatuses,
    reportComments: (state) => state.reportComments,
    assignExaminerMessage: (state) => state.assignExaminerMessage,
    requestResubmissionError: (state) => state.requestResubmissionError,
    examinerAssessments: (state) => state.examinerAssessments,
    assignedExaminer: (state) => state.assignedExaminer,
    requestResubmissionMessage: (state) => state.requestResubmissionMessage,
    displayStudentTableFeedback: (state) => state.displayStudentTableFeedback,
    studentsTableMessage: (state) => state.studentsTableMessage,
    studentsTableKey: (state) => state.studentsTableKey
}

export default {state, mutations, actions, getters}
