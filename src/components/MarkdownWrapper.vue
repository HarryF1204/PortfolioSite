<template>
    <div class="markdown-body" v-html="renderedContent"></div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { parseMarkdown } from '@services/markdown';

const props = defineProps({
    content: String
});

const renderedContent = ref('');

onMounted(() => {
    renderedContent.value = parseMarkdown(props.content);
});
</script>
