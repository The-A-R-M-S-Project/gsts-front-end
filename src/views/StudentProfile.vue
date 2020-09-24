<template>
  <div class="mx-auto">
    <Navigation class="d-none d-sm-block" />
    <MobileDrawer />
    <StudentProfileDetails />
    <EditProfileItem />
    <Footer />
  </div>
</template>
<script>
import Navigation from "@/components/StudentsNav.vue";
import MobileDrawer from "@/components/MobileDrawer.vue";
import StudentProfileDetails from "@/components/StudentProfileDetails.vue";
import EditProfileItem from "@/components/EditProfileItem.vue";
import Footer from "@/components/Footer.vue";

export default {
  name: "student-submission",
  components: {
    Navigation,
    MobileDrawer,
    StudentProfileDetails,
    EditProfileItem,
    Footer,
  },
};
</script>