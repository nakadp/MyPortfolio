<template>
  <span
    ref="containerRef"
    class="inline-block whitespace-pre-wrap"
    :class="parentClassName"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <span class="sr-only">{{ displayText }}</span>
    <span aria-hidden="true">
      <span
        v-for="(char, index) in displayText.split('')"
        :key="index"
        :class="isRevealedOrDone(index) ? className : encryptedClassName"
      >{{ char }}</span>
    </span>
  </span>
</template>

<script setup>
import { ref, watch, onMounted, onUnmounted, computed } from 'vue';

const props = defineProps({
  text: {
    type: String,
    default: ''
  },
  speed: {
    type: Number,
    default: 50
  },
  maxIterations: {
    type: Number,
    default: 10
  },
  sequential: {
    type: Boolean,
    default: false
  },
  revealDirection: {
    type: String,
    default: 'start',
    validator: (value) => ['start', 'end', 'center'].includes(value)
  },
  useOriginalCharsOnly: {
    type: Boolean,
    default: false
  },
  characters: {
    type: String,
    default: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+'
  },
  className: {
    type: String,
    default: ''
  },
  parentClassName: {
    type: String,
    default: ''
  },
  encryptedClassName: {
    type: String,
    default: ''
  },
  animateOn: {
    type: String,
    default: 'hover',
    validator: (value) => ['hover', 'view', 'both', 'change'].includes(value)
  }
});

const displayText = ref(props.text);
const isHovering = ref(false);
const isScrambling = ref(false);
const revealedIndices = ref(new Set());
const hasAnimated = ref(false);
const containerRef = ref(null);

let interval = null;
let observer = null;

const isRevealedOrDone = (index) => {
  return revealedIndices.value.has(index) || !isScrambling.value || !isHovering.value;
};

const getNextIndex = (revealedSet) => {
  const textLength = props.text.length;
  switch (props.revealDirection) {
    case 'start':
      return revealedSet.size;
    case 'end':
      return textLength - 1 - revealedSet.size;
    case 'center': {
      const middle = Math.floor(textLength / 2);
      const offset = Math.floor(revealedSet.size / 2);
      const nextIndex = revealedSet.size % 2 === 0 ? middle + offset : middle - offset - 1;
      if (nextIndex >= 0 && nextIndex < textLength && !revealedSet.has(nextIndex)) {
        return nextIndex;
      }
      for (let i = 0; i < textLength; i++) {
        if (!revealedSet.has(i)) return i;
      }
      return 0;
    }
    default:
      return revealedSet.size;
  }
};

const shuffleText = (originalText, currentRevealed) => {
  const availableChars = props.useOriginalCharsOnly
    ? Array.from(new Set(originalText.split(''))).filter(char => char !== ' ')
    : props.characters.split('');

  if (props.useOriginalCharsOnly) {
    const positions = originalText.split('').map((char, i) => ({
      char,
      isSpace: char === ' ',
      index: i,
      isRevealed: currentRevealed.has(i)
    }));

    const nonSpaceChars = positions.filter(p => !p.isSpace && !p.isRevealed).map(p => p.char);

    // Fisher-Yates shuffle
    for (let i = nonSpaceChars.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [nonSpaceChars[i], nonSpaceChars[j]] = [nonSpaceChars[j], nonSpaceChars[i]];
    }

    let charIndex = 0;
    return positions
      .map(p => {
        if (p.isSpace) return ' ';
        if (p.isRevealed) return originalText[p.index];
        return nonSpaceChars[charIndex++];
      })
      .join('');
  } else {
    return originalText
      .split('')
      .map((char, i) => {
        if (char === ' ') return ' ';
        if (currentRevealed.has(i)) return originalText[i];
        return availableChars[Math.floor(Math.random() * availableChars.length)];
      })
      .join('');
  }
};

const startAnimation = () => {
  if (interval) clearInterval(interval);
  
  let currentIteration = 0;
  isScrambling.value = true;
  revealedIndices.value = new Set();

  interval = setInterval(() => {
    if (props.sequential) {
      if (revealedIndices.value.size < props.text.length) {
        const nextIndex = getNextIndex(revealedIndices.value);
        const newRevealed = new Set(revealedIndices.value);
        newRevealed.add(nextIndex);
        revealedIndices.value = newRevealed;
        displayText.value = shuffleText(props.text, newRevealed);
      } else {
        clearInterval(interval);
        interval = null;
        isScrambling.value = false;
      }
    } else {
      displayText.value = shuffleText(props.text, revealedIndices.value);
      currentIteration++;
      if (currentIteration >= props.maxIterations) {
        clearInterval(interval);
        interval = null;
        isScrambling.value = false;
        displayText.value = props.text;
      }
    }
  }, props.speed);
};

const stopAnimation = () => {
  if (interval) {
    clearInterval(interval);
    interval = null;
  }
  displayText.value = props.text;
  revealedIndices.value = new Set();
  isScrambling.value = false;
};

const handleMouseEnter = () => {
  if (props.animateOn === 'hover' || props.animateOn === 'both') {
    isHovering.value = true;
    startAnimation();
  }
};

const handleMouseLeave = () => {
  if (props.animateOn === 'hover' || props.animateOn === 'both') {
    isHovering.value = false;
    stopAnimation();
  }
};

// Watch for text changes to trigger animation (for 'change' mode)
watch(() => props.text, (newText, oldText) => {
  if (props.animateOn === 'change' && newText !== oldText && newText.length > 0) {
    isHovering.value = true;
    startAnimation();
  } else if (props.animateOn !== 'change') {
    // For other modes, just update display text without animation
    displayText.value = newText;
  }
}, { immediate: false });

// Initialize displayText when mounted
onMounted(() => {
  displayText.value = props.text;

  // Setup IntersectionObserver for 'view' or 'both' modes
  if (props.animateOn === 'view' || props.animateOn === 'both') {
    const observerCallback = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !hasAnimated.value) {
          isHovering.value = true;
          hasAnimated.value = true;
          startAnimation();
        }
      });
    };

    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    observer = new IntersectionObserver(observerCallback, observerOptions);
    if (containerRef.value) {
      observer.observe(containerRef.value);
    }
  }
});

onUnmounted(() => {
  if (interval) clearInterval(interval);
  if (observer && containerRef.value) {
    observer.unobserve(containerRef.value);
  }
});
</script>

<style scoped>
/* Default styles for encrypted text effect */
</style>
