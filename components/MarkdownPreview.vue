<template>
  <div class="markdown-preview h-full w-full overflow-y-auto custom-scrollbar p-6">
    <div class="prose prose-invert max-w-none" v-html="renderedMarkdown"></div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import MarkdownIt from 'markdown-it'

const props = defineProps({
  content: { type: String, required: true }
})

const md = new MarkdownIt({
    html: true,
    linkify: true,
    typographer: true
})

const renderedMarkdown = computed(() => {
    return md.render(props.content || '')
})
</script>

<style>
/* Custom Scrollbar for this container */
.custom-scrollbar::-webkit-scrollbar {
  width: 10px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: #011627;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #607b96;
  border-radius: 5px;
  border: 2px solid #011627;
}

/* Enhancements for "Rich Preview" */
.markdown-preview {
    background: linear-gradient(to bottom right, rgba(1, 22, 39, 0.9), rgba(1, 22, 39, 0.4));
    backdrop-filter: blur(10px);
}

/* Typography Overrides to match User's Request */
.prose h1 {
  @apply text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 pb-2 border-b border-white/10;
}
.prose h2, .prose h3 {
  @apply text-blue-300;
}
.prose blockquote {
  @apply border-l-4 border-blue-500 bg-blue-500/10 p-4 not-italic text-gray-300;
}
.prose code {
  @apply bg-gray-800 text-pink-400 px-1 py-0.5 rounded font-normal;
}
.prose code::before, .prose code::after {
    content: "" !important;
}
.prose a {
    @apply text-blue-400 no-underline hover:underline;
}
.prose strong {
    @apply text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 font-bold;
}
</style>
