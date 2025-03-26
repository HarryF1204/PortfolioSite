<template>
    <div class="project-view">
        <button class="back-button" @click="this.$router.push('/')">← Back</button>
        <div class="article">
            <router-view />
        </div>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
const router = useRouter();
</script>

<style scoped>
.project-view {
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    max-width: 1200px;
    margin: 2rem auto;
    padding: 3rem;
}

.article {
    max-width: 800px;
    margin: 2rem auto;
    position: relative;
}

.back-button {
    position: relative;
    padding: 0.5rem 1rem;
    border: none;
    background: none;
    font-size: 1rem;
    color: #666;
    cursor: pointer;
    transition: color 0.2s;
}

.back-button:hover {
    color: #000;
}

/* Add text styling from mockup */
.article :deep(h2) {
    color: #333;
    margin: 2rem 0 1rem;
}

.article :deep(h3) {
    color: #444;
    margin: 1.5rem 0 1rem;
}

.article :deep(p) {
    color: #666;
    line-height: 1.8;
    margin-bottom: 1rem;
}

.article :deep(ul) {
    list-style-position: inside;
    margin: 1rem 0;
    color: #666;
}

.article :deep(li) {
    margin-bottom: 0.5rem;
    line-height: 1.6;
}

@media (max-width: 768px) {
    .article :deep(h2) {
        font-size: 1.75rem;
    }

    .project-view {
        padding: 1.5rem;
        margin: 1rem;
        border-radius: 6px;
    }

    .article {
        margin: 1rem auto;
    }

    .back-button {
        font-size: 0.9rem;
        padding: 0.4rem 0.8rem;
    }

    .article :deep(h3) {
        font-size: 1.25rem;
    }

    .article :deep(p) {
        font-size: 0.95rem;
    }
}

@media (max-width: 480px) {
    .project-view {
        padding: 1rem;
        margin: 0.5rem;
    }

    .article :deep(h2) {
        font-size: 1.5rem;
    }

    .article :deep(h3) {
        font-size: 1.15rem;
    }

    .article :deep(p) {
        font-size: 0.9rem;
    }
}
</style>
