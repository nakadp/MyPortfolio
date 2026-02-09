<template>
  <div class="breadcrumb-nav">
    <span v-for="(segment, index) in segments" :key="index" class="segment">
      <img v-if="index < segments.length - 1" src="/icons/folder.svg" alt="" class="breadcrumb-icon" />
      <img v-else src="/icons/markdown.svg" alt="" class="breadcrumb-icon" />
      <span class="segment-text">{{ segment }}</span>
      <span v-if="index < segments.length - 1" class="separator">&gt;</span>
    </span>
  </div>
</template>

<script>
export default {
  props: {
    segments: {
      type: Array,
      required: true,
      default: () => []
    }
  }
}
</script>

<style scoped>
.breadcrumb-nav {
  display: flex;
  align-items: center;
  padding: 8px 16px;
  font-family: 'Fira Code', monospace;
  font-size: 13px;
  color: #607B96;
  background-color: rgba(1, 22, 39, 0.5);
  border-bottom: 1px solid #1E2D3D;
}

.segment {
  display: flex;
  align-items: center;
}

.breadcrumb-icon {
  width: 14px;
  height: 14px;
  margin-right: 6px;
  opacity: 0.7;
}

.segment-text {
  color: #607B96;
  transition: color 0.2s ease;
}

.segment-text:hover {
  color: #ffffff;
}

.separator {
  margin: 0 8px;
  color: #3C4D5D;
}
</style>
