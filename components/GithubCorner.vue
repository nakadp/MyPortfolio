<template>
    <a :href="url" class="github-corner-circle" target="_blank" aria-label="View source on Github">
        <!-- GitHub Logo SVG -->
        <svg viewBox="0 0 24 24" width="17" height="17" fill="currentColor" class="github-icon">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
        </svg>
        <!-- Glow ring -->
        <span class="glow-ring"></span>
    </a>
</template>

<script>
export default {
    name: 'GithubCorner',
    props: {
        url: {
            type: String,
            default: ''
        }
    }
}
</script>

<style>
/* ----------------------------------------------
 * GitHub Corner - Circular Floating Button
 * ---------------------------------------------- */

.github-corner-circle {
  /* Fixed position relative to viewport */
  position: fixed;
  /* Moved down 800px from previous position */
  bottom: -640px; /* 20px - 800px */
  right: 10px;  /* page margin 30px - radius 22px + offset */
  width: 31px;
  height: 31px;
  border-radius: 50%;
  background: linear-gradient(135deg, #1C2B3A 0%, #0D1B2A 100%);
  border: 1px solid rgba(67, 217, 173, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
  transition: all 0.3s ease-out;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.github-corner-circle:hover {
  transform: scale(1.1) rotate(10deg);
  border-color: rgba(67, 217, 173, 0.6);
  box-shadow: 
    0 6px 20px rgba(0, 0, 0, 0.4),
    0 0 20px rgba(67, 217, 173, 0.3);
}

.github-icon {
  color: #43D9AD;
  transition: all 0.3s ease-out;
}

.github-corner-circle:hover .github-icon {
  color: #5FFFCA;
  transform: scale(1.1);
}

/* Pulsing glow ring */
.github-corner-circle .glow-ring {
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: 2px solid rgba(67, 217, 173, 0.4);
  opacity: 0;
  pointer-events: none;
}

.github-corner-circle:hover .glow-ring {
  opacity: 1;
  animation: circle-pulse 1.2s ease-out infinite;
}

@keyframes circle-pulse {
  0% {
    transform: scale(1);
    opacity: 0.6;
  }
  100% {
    transform: scale(1.6);
    opacity: 0;
  }
}

@media (max-width: 500px) {
  .github-corner-circle {
    width: 36px;
    height: 36px;
    top: 6px;
    right: 6px;
  }
  
  .github-icon {
    width: 18px;
    height: 18px;
  }
}

/* Reduce motion support */
@media (prefers-reduced-motion: reduce) {
  .github-corner-circle:hover .glow-ring {
    animation: none;
  }
  .github-corner-circle:hover {
    transform: scale(1.05);
  }
}
</style>