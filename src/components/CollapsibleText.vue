<template>
    <div class="bio-wrapper" :class="{ expanded }">
        <p class="bio">
            <span class="text-content" v-html="expanded ? fullText : truncatedText">
            </span>
            <span style="display: none" ref="contentRef">
                <slot />
            </span>
            <button v-if="!expanded && showButton" class="bio-toggle" @click="expanded = true">read more</button>
            <button v-else-if="expanded" class="bio-toggle show-less" @click="expanded = false">show less</button>
        </p>
    </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';

const props = defineProps({
    wordsToShow: {
        type: Number,
        default: 7
    }
});

const expanded = ref(false);
const fullText = ref('');

const contentRef = ref(null);
const showButton = computed(() => {
    const words = fullText.value.split(' ');
    return words.length > props.wordsToShow;
});

onMounted(() => {
    fullText.value = contentRef.value?.innerHTML?.trim() ?? '';
});

const truncatedText = computed(() => {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = fullText.value;
    const words = tempDiv.textContent.split(' ');
    if (words.length <= props.wordsToShow) return fullText.value;

    const truncated = words.slice(0, props.wordsToShow).join(' ') + '...';
    tempDiv.textContent = truncated;
    return tempDiv.textContent;
}); 
</script>

<style scoped>
.bio-wrapper {
    position: relative;
    max-height: none;
}

.bio-wrapper:not(.expanded) {
    max-height: 3.2rem;
}

.bio {
    margin: 1rem 0;
    line-height: 1.6;
    text-align: left;
    position: relative;
}

.text-content {
    display: inline;
}

/* Remove the truncated class styles as they're no longer needed */

.bio-toggle {
    background: none;
    border: none;
    cursor: pointer;
    padding: 0 4px;
    color: #666;
    position: relative;
    top: -1px;
    font-size: 0.9em;
    text-decoration: underline;
}

.bio-toggle.show-less {
    color: #666;
    font-size: 0.9em;
    display: block;
    margin-top: 0.5rem;
}
</style>
