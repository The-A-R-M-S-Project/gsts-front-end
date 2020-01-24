<template>
  <div v-if="show" class="alert">Invalid email and/or password.</div>
</template>

<style>
.alert {
  color: red;
  border: solid red 1px;
  border-radius: 10px;
}
</style>

<script>
export default {
  name: "alert",
  props: {
    show: Boolean
  }
};
</script>