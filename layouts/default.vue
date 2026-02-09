<template>
    <div class="layout-container">
      <!-- Cursor Glow Effect -->
      <CursorGlow />
      
      <MobileMenu />
      <AppHeader />
      
      <!-- Page Transition -->
      <Transition name="page-fade" mode="out-in">
        <slot />
      </Transition>
      
      <AppFooter />
    </div>
  </template>

<style scoped>
.layout-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  position: relative;
}

/* Page Transition Animations */
.page-fade-enter-active,
.page-fade-leave-active {
  transition: opacity 0.25s ease-out, transform 0.25s ease-out;
}

.page-fade-enter-from {
  opacity: 0;
  transform: translateX(12px);
}

.page-fade-leave-to {
  opacity: 0;
  transform: translateX(-12px);
}
</style>