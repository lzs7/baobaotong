<template>
  <div></div>
</template>
<script>
export default {
  data() {
    return {};
  },
  created() {
    let cookie1 = this.common.getCookie();
    if (cookie1 == "") {
      //  window.location.replace("http://www.dwhlzchb.com")
      this.$router.push({ path: "/" });
    } else {
      let cookie1 = this.common.getCookie();
      let baoId = cookie1.replace(/\"/g, "").split("#")[1];

      if (baoId != 2) {
        this.$router.push({ path: "/Commission_T" });
      } else {
        this.$router.push({ path: "/Commission_Hall" });
      }
    }
  }
};
</script>