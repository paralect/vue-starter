<template>
  <a-layout-footer class="footer">
    Ship, {{ year }} © All rights reserved
  </a-layout-footer>
</template>

<script>
  export default {
    data() {
      return {
        year: new Date().getFullYear(),
      };
    },
  };
</script>

<style lang="postcss" scoped>
  .footer {
    text-align: center;
    padding: 10px 0;
  }
</style>
