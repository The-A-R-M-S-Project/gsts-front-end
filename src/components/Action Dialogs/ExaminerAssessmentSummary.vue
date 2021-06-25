<template>
    <div v-if="examiner.reportAssessment.scannedAsssesmentform" class="text-center py-6">
        <p v-if="examiner.examinerScore">
            <span class="body-1 font-weight-light">Final score:</span>
            <span class="headline font-weight-bold"
            >&nbsp;{{ examiner.examinerScore }} %</span
            >
        </p>
        <p>
            <span class="body-1 font-weight-light">Assessment:</span>
            <span class="subheading"
            >&nbsp;
            <a
                :href="examiner.reportAssessment.scannedAsssesmentform"
                target="_blank"
            >
                Scanned assessment form
            </a>
            </span>
        </p>
    </div>
    <div v-else class="text-center py-6">
        <p v-if="examiner.examinerScore">
            <span class="body-1 font-weight-light">Final score:</span>
            <span class="headline font-weight-bold"
            >&nbsp;{{ examiner.examinerScore }} %</span
            >
        </p>
        <p>
            <span class="body-1 font-weight-light">Background:</span>
            <span
            >&nbsp;{{
                examiner.reportAssessment.assessment.background
            }}</span
            >
        </p>
        <p>
            <span class="body-1 font-weight-light"
            >Problem statement:</span
            >
            <span
            >&nbsp;{{
                examiner.reportAssessment.assessment.problemStatement
            }}</span
            >
        </p>
        <p>
            <span class="body-1 font-weight-light"
            >Research methods:</span
            >
            <span
            >&nbsp;{{
                examiner.reportAssessment.assessment.researchMethods
            }}</span
            >
        </p>
        <p>
            <span class="body-1 font-weight-light">Results:</span>
            <span
            >&nbsp;{{
                examiner.reportAssessment.assessment.results
            }}</span
            >
        </p>
        <p>
            <span class="body-1 font-weight-light">Discussions:</span>
            <span
            >&nbsp;{{
                examiner.reportAssessment.assessment.discussions
            }}</span
            >
        </p>
        <p>
            <span class="body-1 font-weight-light">Conclusions:</span>
            <span
            >&nbsp;{{
                examiner.reportAssessment.assessment.conclusions
            }}</span
            >
        </p>
        <p>
            <span class="body-1 font-weight-light">Recommendations:</span>
            <span
            >&nbsp;{{
                examiner.reportAssessment.assessment.recommendations
            }}</span
            >
        </p>
        <p>
            <span class="body-1 font-weight-light"
            >Originality of contribution:</span
            >
            <span
            >&nbsp;{{
                examiner.reportAssessment.assessment.originality_of_Contribution
            }}</span
            >
        </p>
        <p>
            <span class="body-1 font-weight-light"
            >Literature citation:</span
            >
            <span
            >&nbsp;{{
                examiner.reportAssessment.assessment.literature_Citation
            }}</span
            >
        </p>
        <p>
            <span class="body-1 font-weight-light"
            >Overall presentation:</span
            >
            <span
            >&nbsp;{{
                examiner.reportAssessment.assessment.overall_Presentation
            }}</span
            >
        </p>
        <p>
            <span
            class="body-1 font-weight-light text-decoration-underline"
            >Corrections</span
            >
        </p>
        <p
            v-html="
            correctHTMLString(
                examiner.reportAssessment.assessment.corrections
            )
            "
        ></p>
    </div>    
</template>

<script>
export default {
    name: "ExaminerAssessmentSummary",
    props: {
        examiner: Object
    },
    methods: {
        correctHTMLString(HTMLString) {
            return HTMLString.replace(/&lt;/g, "<");
        }
    }
}
</script>