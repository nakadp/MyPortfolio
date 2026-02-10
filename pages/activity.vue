<template>
    <main v-if="!loading" id="activity" class="page">
        <div id="mobile-page-title">
            <h2>_activity</h2>
        </div>

        <div id="gists-content" class="flex w-full h-full">
            <div id="gists" class="flex flex-col lg:px-6 lg:py-4 w-full h-full overflow-hidden">
                <!-- title -->
                <h3 class="text-white lg:text-menu-text mb-4 text-sm">// Code snippet showcase:</h3>

                <div class="flex flex-col overflow-y-auto hide-scrollbar h-full">
                    <!-- snippets -->
                    <GistSnippet data-aos="fade-down" v-for="(gist, key) in config.gists" :key="key" :id="gist" />
                </div>
            </div>

            <!-- scroll bar -->
            <div id="scroll-bar" class="h-full border-left hidden lg:flex justify-center py-1">
                <div id="scroll"></div>
            </div>
        </div>
    </main>
</template>

<style scoped>
#activity {
    height: 100%;
    width: 100%;
    overflow: hidden;
}

#gists-content {
    height: 100%;
    overflow: hidden;
}

#scroll-bar {
    width: 20px;
}

#scroll {
    width: 14px;
    height: 7px;
    background-color: #607B96;
}

/* Hide native scrollbar but keep scroll functionality */
.hide-scrollbar {
    -ms-overflow-style: none !important;
    /* IE and Edge */
    scrollbar-width: none !important;
    /* Firefox */
}

.hide-scrollbar::-webkit-scrollbar {
    display: none !important;
    width: 0 !important;
    height: 0 !important;
}

@media (max-width: 1024px) {
    #gists-content {
        padding: 0px 25px;
    }
}
</style>

<script>
import DevConfig from '~/developer.json';

export default {
    data() {
        return {
            loading: true,
        }
    },
    setup() {
        return {
            config: DevConfig
        }
    },
    mounted() {
        this.loading = false
    }
}
</script>
