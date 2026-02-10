<template>
  <div class="code-block h-full w-full overflow-hidden bg-[#011627] text-sm font-fira_code" v-html="highlightedCode"></div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'

const props = defineProps({
  code: { type: String, required: true },
  lang: { type: String, default: 'json' }
})

const highlightedCode = ref(`<pre class="p-4"><code>${props.code}</code></pre>`)
let highlighter = null

const initHighlighter = async () => {
    try {
        // Dynamic import to prevent bundle errors if shiki fails to resolve statically
        const { getHighlighter } = await import('shiki')
        
        highlighter = await getHighlighter({
            themes: ['material-theme-palenight'],
            langs: ['json', 'markdown', 'html', 'javascript', 'vue']
        })
        updateHighlight()
    } catch (e) {
        console.error("Shiki init failed", e)
        // Fallback to simple escape
        highlightedCode.value = `<pre class="p-4"><code>${props.code}</code></pre>`
    }
}

const updateHighlight = () => {
  if (!highlighter) return
  try {
      highlightedCode.value = highlighter.codeToHtml(props.code, { lang: props.lang, theme: 'material-theme-palenight' })
  } catch (e) {
      console.error("Highlighting failed", e)
      highlightedCode.value = `<pre class="p-4"><code>${props.code}</code></pre>`
  }
}

watch(() => props.code, updateHighlight)
onMounted(initHighlighter)
</script>

<style>
/* Override Shiki's default background to match container or keep it transparent */
.shiki {
    background-color: transparent !important;
    padding: 1rem;
    margin: 0;
    height: 100%;
    overflow: auto;
    font-family: 'Fira Code', monospace;
}
</style>
