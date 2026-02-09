<template>
    <div class="layout-container">
      <MobileMenu />
      <AppHeader />
      <slot />
      <AppFooter />
    </div>
  </template>

<style scoped>
.layout-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
}
</style>