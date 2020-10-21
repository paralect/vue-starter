<template>
  <a-layout class="page">
    <slot />
  </a-layout>
</template>

<style lang="postcss" scoped>
  .page {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
