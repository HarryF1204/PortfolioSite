<template>
    <!-- <div class="category-header" @click="$emit('toggle', type)">
        <h3>{{ title }}</h3>
        <button class="toggle-btn no-select" aria-label="Toggle category">
            <span class="arrow" :class="{ 'arrow-collapsed': !isExpanded }">▼</span>
        </button>
    </div> -->
    <h2>{{ title }}</h2>
    <div class="project-grid" :class="{ 'expanded': isExpanded }">
        <Projects :type="type" :limit="visibleItems" @total-items="updateTotalItems" />
        <ShowMoreCard v-if="hasMoreToShow" @loadMore="loadMore" />
    </div>
</template>

<script setup>
import Projects from './Projects.vue';
import ShowMoreCard from './ShowMoreCard.vue';
import { ref, computed, onMounted } from 'vue';

const props = defineProps({
    title: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    isExpanded: {
        type: Boolean,
        required: true
    }
});

defineEmits(['toggle']);

const INITIAL_ITEMS = ref(5);
const LOAD_MORE_COUNT = ref(6);
const visibleItems = ref(INITIAL_ITEMS.value);
const totalItems = ref(0);

const updateTotalItems = (count) => {
    totalItems.value = count;
};

const hasMoreToShow = computed(() => {
    return visibleItems.value < totalItems.value;
});

const detectMobile = () => window.innerWidth <= 480;

const updateLoadMoreCount = () => {
    if (detectMobile()) {
        LOAD_MORE_COUNT.value = 3;
    } else {
        LOAD_MORE_COUNT.value = 6;
    }
};

onMounted(() => {
    if (detectMobile()) {
        INITIAL_ITEMS.value = 3;
        visibleItems.value = 3;
    }
    updateLoadMoreCount();
    window.addEventListener('resize', updateLoadMoreCount);
});

const loadMore = () => {
    visibleItems.value = Math.min(visibleItems.value + LOAD_MORE_COUNT.value, totalItems.value);
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
    overflow: hidden;
    pointer-events: none;
    position: relative;
    visibility: hidden;
}

.project-grid.expanded {
    max-height: none;
    opacity: 1;
    pointer-events: auto;
    visibility: visible;
}

@media (max-width: 768px) {
    .category-header {
        padding: 0.75rem;
        margin-bottom: 0.75rem;
    }

    .category-header h3 {
        font-size: 1.1rem;
    }

    .project-grid {
        gap: 1rem;
        margin-top: 1rem;
        margin-bottom: 1rem;
    }
}

@media (max-width: 480px) {
    .project-grid {
        grid-template-columns: 1fr;
        gap: 0.5rem;
        margin-top: 0.5rem;
        margin-bottom: 0.5rem;
    }

    .category-header {
        padding: 0.5rem;
        margin-bottom: 0.5rem;
    }

    .toggle-btn {
        font-size: 1rem;
    }
}
</style>
