<template>
    <div class="video-container">
        <div v-if="!videoId" class="error">
            No YouTube video ID found.
        </div>
        <iframe v-else :src="embedUrl" frameborder="0"
            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen></iframe>
    </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
    videoId: {
        type: String,
        required: true,
        validator: (value) => {
            // Basic YouTube video ID validation (11 characters, alphanumeric and some special chars)
            return /^[\w-]{11}$/.test(value);
        }
    }
});

const embedUrl = computed(() => `https://www.youtube.com/embed/${props.videoId}`);
</script>

<style scoped>
.video-container {
    position: relative;
    padding-bottom: 56.25%;
    height: 0;
    margin: 1.5rem 0;
}

.video-container iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 8px;
}

.error {
    color: red;
    text-align: center;
    padding: 2rem;
}
</style>
