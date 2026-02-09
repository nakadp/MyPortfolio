<template>
  <div 
    ref="glowRef"
    class="cursor-glow"
    :style="{ 
      left: `${position.x}px`, 
      top: `${position.y}px`,
      opacity: isVisible ? 1 : 0 
    }"
  />
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const glowRef = ref(null)
const position = ref({ x: 0, y: 0 })
const isVisible = ref(false)

const handleMouseMove = (e) => {
  position.value = {
    x: e.clientX,
    y: e.clientY
  }
  isVisible.value = true
}

const handleMouseLeave = () => {
  isVisible.value = false
}

onMounted(() => {
  document.addEventListener('mousemove', handleMouseMove)
  document.addEventListener('mouseleave', handleMouseLeave)
})

onUnmounted(() => {
  document.removeEventListener('mousemove', handleMouseMove)
  document.removeEventListener('mouseleave', handleMouseLeave)
})
</script>

<style scoped>
.cursor-glow {
  position: fixed;
  width: 600px;
  height: 600px;
  pointer-events: none;
  z-index: 0;
  background: radial-gradient(
    circle,
    rgba(67, 217, 173, 0.06) 0%,
    rgba(67, 217, 173, 0.02) 30%,
    transparent 70%
  );
  transform: translate(-50%, -50%);
  transition: opacity 0.3s ease-out;
  will-change: left, top;
}

@media (prefers-reduced-motion: reduce) {
  .cursor-glow {
    display: none;
  }
}
</style>
