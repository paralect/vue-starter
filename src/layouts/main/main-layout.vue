<template>
  <a-layout class="page">
    <ship-header />

    <a-layout-content class="content">
      <slot />
    </a-layout-content>

    <ship-footer />
  </a-layout>
</template>

<script>
  import ShipHeader from './components/header';
  import ShipFooter from './components/footer';

  export default {
    components: {
      ShipHeader,
      ShipFooter,
    },
  };
</script>

<style lang="postcss" scoped>
  .page {
    min-height: 100vh;
    display: flex;
    flex-direction: column;

    & .content {
      width: 100%;
      padding: 24px;
    }
  }
</style>
