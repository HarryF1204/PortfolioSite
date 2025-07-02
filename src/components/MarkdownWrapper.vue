<template>
    <div class="project-view">
        <a class="back-button" :href="'/PortfolioSite/#/'">&larr; Back</a>
        <div class="article">
            <router-view />
        </div>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
useRouter();
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
    line-height: 1.8;
    font-family: 'Inter', sans-serif;
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

/* Updated text styling */
.article :deep(h1),
.article :deep(h2),
.article :deep(h3) {
    color: #2c3e50;
    margin-top: 20px;
}

.article :deep(h1) {
    font-size: 2.5rem;
}

.article :deep(h2) {
    font-size: 2rem;
}

.article :deep(h3) {
    font-size: 1.5rem;
}

.article :deep(p) {
    color: #333;
    line-height: 1.6;
    margin-bottom: 1rem;
    font-family: Arial, sans-serif;
}

.article :deep(blockquote) {
    font-style: italic;
    color: #555;
    border-left: 4px solid #3498db;
    padding-left: 1rem;
    margin: 1.5rem 0;
}

.article :deep(ul) {
    list-style-type: disc;
    margin-left: 20px;
    color: #333;
}

.article :deep(li) {
    margin-bottom: 0.5rem;
    line-height: 1.6;
}

.article :deep(a) {
    color: #3498db;
    text-decoration: none;
    font-weight: 500;
}

.article :deep(a:hover) {
    text-decoration: underline;
}

.article :deep(img) {
    display: block;
    max-width: 100%;
    height: auto;
    margin: 1.5rem auto;
    border-radius: 5px;
}

.article :deep(hr) {
    border: 0;
    border-top: 2px solid #eee;
    margin: 2rem 0;
}

.article :deep(.testimonial) {
    font-style: italic;
    margin: 10px 0;
}

.article :deep(.testimonial-author) {
    font-weight: bold;
    display: block;
    margin-top: 5px;
}

/* Enhanced markdown styles */
.article :deep(pre) {
    background-color: #f4f4f4;
    padding: 1rem;
    border-radius: 5px;
    overflow-x: auto;
    font-family: 'Courier New', monospace;
    font-size: 0.95rem;
    margin: 1.5rem 0;
}

.article :deep(code) {
    background-color: #f4f4f4;
    padding: 0.2rem 0.4rem;
    border-radius: 3px;
    font-family: 'Courier New', monospace;
    font-size: 0.9rem;
    color: #d6336c;
}

.article :deep(table) {
    width: 100%;
    border-collapse: collapse;
    margin: 1.5rem 0;
}

.article :deep(th),
.article :deep(td) {
    border: 1px solid #ddd;
    padding: 0.75rem;
    text-align: left;
}

.article :deep(th) {
    background-color: #f8f8f8;
    font-weight: bold;
}

@media (max-width: 768px) {
    .article :deep(h1) {
        font-size: 2rem;
    }

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

    .article :deep(pre) {
        font-size: 0.85rem;
    }

    .article :deep(code) {
        font-size: 0.85rem;
    }

    .article :deep(th),
    .article :deep(td) {
        padding: 0.5rem;
    }
}

@media (max-width: 480px) {
    .project-view {
        padding: 1rem;
        margin: 0.5rem;
    }

    .article :deep(h1) {
        font-size: 1.75rem;
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

    .article :deep(pre) {
        font-size: 0.8rem;
    }

    .article :deep(code) {
        font-size: 0.8rem;
    }

    .article :deep(th),
    .article :deep(td) {
        padding: 0.4rem;
    }
}
</style>
