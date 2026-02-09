import { ref, onMounted, onUnmounted } from 'vue'

/**
 * Magnetic button effect - elements slightly attract toward the cursor
 * Following interaction-design skill guidelines
 */
export function useMagnetic(elementRef, options = {}) {
    const { strength = 0.2, maxDistance = 100 } = options

    const offset = ref({ x: 0, y: 0 })
    const isHovering = ref(false)

    const handleMouseMove = (e) => {
        if (!elementRef.value) return

        const rect = elementRef.value.getBoundingClientRect()
        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2

        const dx = e.clientX - centerX
        const dy = e.clientY - centerY
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < maxDistance) {
            isHovering.value = true
            offset.value = {
                x: dx * strength,
                y: dy * strength
            }
        } else {
            isHovering.value = false
            offset.value = { x: 0, y: 0 }
        }
    }

    const handleMouseLeave = () => {
        isHovering.value = false
        offset.value = { x: 0, y: 0 }
    }

    onMounted(() => {
        document.addEventListener('mousemove', handleMouseMove)
        if (elementRef.value) {
            elementRef.value.addEventListener('mouseleave', handleMouseLeave)
        }
    })

    onUnmounted(() => {
        document.removeEventListener('mousemove', handleMouseMove)
        if (elementRef.value) {
            elementRef.value.removeEventListener('mouseleave', handleMouseLeave)
        }
    })

    return {
        offset,
        isHovering,
        style: () => ({
            transform: `translate(${offset.value.x}px, ${offset.value.y}px)`,
            transition: isHovering.value ? 'transform 0.15s ease-out' : 'transform 0.3s ease-out'
        })
    }
}
