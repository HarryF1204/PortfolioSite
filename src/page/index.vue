<template>
    <main class="content-wrapper">
        <header class="hero-card">
            <div class="hero-content">
                <h1>Portfolio</h1>
                <p class="subtitle">Software Developer & Cyber Security Student</p>
                <div class="tags">
                    <Tag>Full Stack</Tag>
                    <Tag>Web Development</Tag>
                    <Tag>Problem Solving</Tag>
                </div>
                <CollapsibleText>
                    Temp text
                </CollapsibleText>
            </div>
        </header>

        <section id="projects">
            <div class="project-controls">
                <h2>Projects</h2>
                <div class="category-filters no-select">
                    <button v-for="category in ['all', ...categories.map(c => c.type)]" :key="category"
                        class="filter-btn" :class="{ active: activeCategory === category }"
                        @click="setActiveCategory(category)">
                        {{ category.charAt(0).toUpperCase() + category.slice(1) }}
                    </button>
                </div>
            </div>

            <div class="project-category">
                <ProjectCategory v-for="category in filteredCategories" :key="category.type" :title="category.title"
                    :type="category.type" />
            </div>
        </section>
    </main>
</template>

<script setup>
import { ref, computed } from 'vue';
import Tag from '@components/Tag.vue'
import ProjectCategory from '@components/ProjectCategory.vue';
import CollapsibleText from '@components/CollapsibleText.vue';

const categories = [
    { title: 'Experiences', type: 'experiences' },
    { title: 'Marketplace Projects', type: 'marketplace' },
    { title: 'Personal Projects', type: 'personal' },
    { title: 'Tools', type: 'tools' }
];

const activeCategory = ref('all');

const setActiveCategory = (category) => {
    activeCategory.value = category;
};

const filteredCategories = computed(() => {
    if (activeCategory.value === 'all') {
        return categories;
    }
    return categories.filter(category => category.type === activeCategory.value);
});
</script>

<style scoped>
.tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin: 0.5rem 0;
}

.hero-card {
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    padding: 3rem;
    text-align: center;
    margin-bottom: 0;
}

.hero-content {
    max-width: 800px;
    margin: 0 auto;
}

.hero-content h1 {
    font-size: 2.5rem;
    margin-bottom: 1rem;
    color: #333;
}

.subtitle {
    font-size: 1.2rem;
    color: #666;
    margin-bottom: 1.5rem;
}

.content-wrapper {
    max-width: 1200px;
    margin: 2rem auto;
    padding: 0 2rem;
    background-color: #f4f4f4;
}

#projects {
    padding: 2rem 2rem;
}

.category-filters {
    display: flex;
    gap: 1rem;
}

.filter-btn {
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 20px;
    background: white;
    cursor: pointer;
    transition: all 0.2s ease;
}

.filter-btn.active {
    background: #333;
    color: white;
}

.project-category {
    margin-bottom: 2rem;
}

.project-controls {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
    position: sticky;
    top: 0;
    background: #f4f4f4;
    padding: 1rem 0;
    z-index: 10;
}
</style>