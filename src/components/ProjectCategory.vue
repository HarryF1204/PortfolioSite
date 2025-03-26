<template>
    <div class="category-header" @click="toggleExpanded">
        <h3>{{ title }}</h3>
        <button class="toggle-btn no-select" aria-label="Toggle category">
            <span class="arrow" :class="{ 'arrow-collapsed': !isExpanded }">▼</span>
        </button>
    </div>
    <div class="project-grid" :class="{ 'expanded': isExpanded }">
        <Projects :type="type" :limit="visibleItems" @total-items="updateTotalItems" />
        <ShowMoreCard v-if="hasMoreToShow" @loadMore="loadMore" />
    </div>
</template>

<script setup>
import Projects from './Projects.vue';
import ShowMoreCard from './ShowMoreCard.vue';
import { ref, computed } from 'vue';

defineProps({
    title: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    }
});

const isExpanded = ref(true);
const toggleExpanded = () => isExpanded.value = !isExpanded.value;

const INITIAL_ITEMS = 5;
const LOAD_MORE_COUNT = 6;

const visibleItems = ref(INITIAL_ITEMS);
const totalItems = ref(0);

const updateTotalItems = (count) => {
    totalItems.value = count;
};

const hasMoreToShow = computed(() => {
    return visibleItems.value < totalItems.value;
});

const loadMore = () => {
    visibleItems.value = Math.min(visibleItems.value + LOAD_MORE_COUNT, totalItems.value);
};
</script>

<style scoped>
.category-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    background: white;
    border-radius: 8px;
    margin-bottom: 1rem;
    cursor: pointer;
}

.toggle-btn {
    background: none;
    border: none;
    cursor: pointer;
    font-size: 1.2rem;
}

.arrow {
    transition: transform 0.3s ease;
    display: inline-block;
}

.arrow-collapsed {
    transform: rotate(-90deg);
}

.project-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(18.75rem, 1fr));
    gap: 2rem;
    margin-top: 1.5rem;
    margin-bottom: 1.5rem;
    max-height: 0;
    opacity: 0;
    transition: all 0.3s ease;
    overflow: visible;
}

.project-grid.expanded {
    max-height: none;
    opacity: 1;
}
</style>
