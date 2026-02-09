module.exports = {
    theme: {
        extend: {
            colors: {
                'gray-dark': '#121212',
                'glitch-green': '#00ff00',
                'glitch-rose': '#f0f',
                'glitch-blue': '#0ff',
                'neon-blue-xs': '#08cff6',
                'neon-blue-s': '#194262',
                'neon-blue-m': '#0e2535',
                'neon-blue-l': '#05131e',
                'neon-blue-xl': '#020204',
                'dark-background': '#010C15',
                'menu-text': '#85a5c4',
                'blue-background': '#011627',
                'hello-name': '#E5E9F0',
                'purple-text': '#81a0fd',
                'hello-gray': '#84a6c8',
                'codeline-link': '#E99287',
                'codeline-tag': '#4D5BCE',
                'codeline-name': '#43D9AD',
                'mobile-menu-blue': '#011627',
                'placeholder-gray': '#465E77',
                'greenfy': '#43D9AD',
                'bluefy-dark': '#011627',
                'purplefy': '#799ffb',
                // Accent colors for visual enhancement
                'accent-cyan': '#43D9AD',
                'accent-orange': '#FEA55F',
                'accent-purple': '#4D5BCE',
                'accent-pink': '#E99287',
                'accent-blue': '#3A86FF',
            },
            boxShadow: {
                'glow-cyan': '0 0 20px rgba(67, 217, 173, 0.4)',
                'glow-orange': '0 0 20px rgba(254, 165, 95, 0.4)',
                'glow-purple': '0 0 20px rgba(77, 91, 206, 0.4)',
                'glow-blue': '0 0 20px rgba(58, 134, 255, 0.4)',
                'glow-cyan-lg': '0 0 40px rgba(67, 217, 173, 0.6)',
                'glow-purple-lg': '0 0 40px rgba(77, 91, 206, 0.6)',
            },
            animation: {
                'fade-in': 'fadeIn 0.5s ease-out forwards',
                'slide-up': 'slideUp 0.5s ease-out forwards',
                'glow-pulse': 'glowPulse 2s ease-in-out infinite',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                slideUp: {
                    '0%': { opacity: '0', transform: 'translateY(20px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                glowPulse: {
                    '0%, 100%': { boxShadow: '0 0 20px rgba(67, 217, 173, 0.3)' },
                    '50%': { boxShadow: '0 0 30px rgba(67, 217, 173, 0.6)' },
                },
            },
        },
        fontFamily: {
            fira_light: "Fira Code Light",
            fira_regular: "Fira Code Regular",
            fira_retina: "Fira Code Retina",
            fira_medium: "Fira Code Medium",
            fira_semibold: "Fira Code SemiBold",
            fira_bold: "Fira Code Bold",
            fira_variable: "Fira Code Variable",
        }
    }
}