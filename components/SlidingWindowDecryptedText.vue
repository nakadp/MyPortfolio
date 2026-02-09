<template>
  <div class="code-container flex font-fira_retina text-menu-text">
    <div class="line-numbers lg:flex flex-col hidden">
      <!-- Line numbers that update dynamically based on actual rendered lines -->
      <div v-for="n in currentLineCount" :key="n" class="line-number-row">
        <span class="line-num">{{ n }}</span>
      </div>
    </div>

    <!-- text with sliding window decryption effect -->
    <div ref="textContainer" class="text-container">
      <span ref="textContent" aria-hidden="true">
        <template v-for="(segment, index) in renderedSegments" :key="index">
          <br v-if="segment.type === 'br'" />
          <span 
            v-else 
            :class="getCharClass(segment.originalIndex)"
          >{{ segment.char }}</span>
        </template>
      </span>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, onUnmounted, computed, nextTick } from 'vue';

const props = defineProps({
  text: {
    type: String,
    default: ''
  },
  windowSize: {
    type: Number,
    default: 20
  },
  speed: {
    type: Number,
    default: 30
  },
  characters: {
    type: String,
    default: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*'
  },
  encryptedClassName: {
    type: String,
    default: 'text-secondary'
  },
  revealedClassName: {
    type: String,
    default: ''
  }
});

const textContainer = ref(null);
const textContent = ref(null);
const currentLineCount = ref(1);

// Wrap text with comment symbols: /** at start, <br>**/ at end (with line break before closing)
const wrappedText = computed(() => {
  if (!props.text) return '/**<br>**/';
  return `/**${props.text}<br>**/`;
});

// Parse HTML and extract plain text chars with their positions
const parseHtml = (html) => {
  const segments = [];
  let plainIndex = 0;
  
  // Split by <br> or <br/> tags
  const parts = html.split(/(<br\s*\/?>)/gi);
  
  for (const part of parts) {
    if (/<br\s*\/?>/i.test(part)) {
      segments.push({ type: 'br', originalIndex: -1, charIndex: plainIndex });
    } else {
      // Regular text
      for (const char of part) {
        segments.push({ 
          type: 'char', 
          char: char, 
          originalIndex: plainIndex 
        });
        plainIndex++;
      }
    }
  }
  
  return { segments, plainTextLength: plainIndex };
};

// Animation state
const revealedCount = ref(0);
const isAnimating = ref(false);
const scrambledChars = ref({});
let animationInterval = null;
let scrambleInterval = null;

// Parsed content
const parsedContent = computed(() => parseHtml(wrappedText.value));

// Generate random char
const getRandomChar = () => {
  return props.characters[Math.floor(Math.random() * props.characters.length)];
};

// Get rendered segments with scrambled chars for window
const renderedSegments = computed(() => {
  return parsedContent.value.segments.map(segment => {
    if (segment.type === 'br') {
      // Only show br if we've reached past its position in the animation
      if (segment.charIndex <= revealedCount.value + props.windowSize) {
        return segment;
      }
      return { ...segment, hidden: true };
    }
    
    const idx = segment.originalIndex;
    
    // Not yet in view
    if (idx >= revealedCount.value + props.windowSize) {
      return { ...segment, char: '' };
    }
    
    // Already revealed
    if (idx < revealedCount.value) {
      return segment;
    }
    
    // In active window - show scrambled
    if (segment.char === ' ') {
      return segment; // Keep spaces as-is
    }
    
    return { 
      ...segment, 
      char: scrambledChars.value[idx] || getRandomChar() 
    };
  }).filter(s => !s.hidden);
});

// Get class for character
const getCharClass = (originalIndex) => {
  if (originalIndex < 0) return '';
  if (originalIndex < revealedCount.value) {
    return props.revealedClassName;
  }
  if (originalIndex < revealedCount.value + props.windowSize) {
    return props.encryptedClassName;
  }
  return '';
};

// Measure actual rendered line count based on container height
const updateLineCount = () => {
  nextTick(() => {
    if (textContent.value) {
      const style = window.getComputedStyle(textContent.value);
      const lineHeight = parseFloat(style.lineHeight) || 20;
      const height = textContent.value.offsetHeight;
      const lines = Math.max(1, Math.ceil(height / lineHeight));
      currentLineCount.value = lines;
    }
  });
};

// Start the animation
const startAnimation = () => {
  stopAnimation();
  
  revealedCount.value = 0;
  currentLineCount.value = 1;
  isAnimating.value = true;
  scrambledChars.value = {};
  
  const totalChars = parsedContent.value.plainTextLength;
  
  if (totalChars === 0) {
    isAnimating.value = false;
    return;
  }
  
  // Scramble chars in window rapidly
  scrambleInterval = setInterval(() => {
    const newScrambled = {};
    for (let i = revealedCount.value; i < Math.min(revealedCount.value + props.windowSize, totalChars); i++) {
      const segment = parsedContent.value.segments.find(s => s.originalIndex === i);
      if (segment && segment.char !== ' ') {
        newScrambled[i] = getRandomChar();
      }
    }
    scrambledChars.value = { ...scrambledChars.value, ...newScrambled };
  }, 30);
  
  // Reveal chars progressively
  animationInterval = setInterval(() => {
    if (revealedCount.value >= totalChars) {
      stopAnimation();
      updateLineCount(); // Final line count update
      return;
    }
    revealedCount.value++;
    
    // Update line count periodically (every 5 characters to reduce DOM reads)
    if (revealedCount.value % 5 === 0) {
      updateLineCount();
    }
  }, props.speed);
};

// Stop the animation
const stopAnimation = () => {
  if (animationInterval) {
    clearInterval(animationInterval);
    animationInterval = null;
  }
  if (scrambleInterval) {
    clearInterval(scrambleInterval);
    scrambleInterval = null;
  }
  isAnimating.value = false;
};

// Complete reveal instantly
const completeReveal = () => {
  stopAnimation();
  revealedCount.value = parsedContent.value.plainTextLength;
  updateLineCount();
};

// Watch for text changes
watch(() => props.text, (newText, oldText) => {
  if (newText !== oldText && newText.length > 0) {
    nextTick(() => {
      startAnimation();
    });
  }
}, { immediate: false });

// Initialize
onMounted(() => {
  // Start initial animation
  if (props.text.length > 0) {
    startAnimation();
  }
});

onUnmounted(() => {
  stopAnimation();
});

// Expose methods for parent component
defineExpose({
  startAnimation,
  stopAnimation,
  completeReveal
});
</script>

<style scoped>
.code-container {
  display: flex;
  align-items: flex-start;
}

.line-numbers {
  text-align: right;
  min-width: 2.5rem;
  padding-right: 0.75rem;
  flex-shrink: 0;
}

.line-number-row {
  display: flex;
  justify-content: flex-end;
  line-height: inherit;
}

.line-num {
  min-width: 1.5rem;
  text-align: right;
}

.text-container {
  width: 100%;
  padding-left: 10px;
  word-wrap: break-word;
}

.text-secondary {
  color: #607B96;
}
</style>
