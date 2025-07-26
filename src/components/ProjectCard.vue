<script setup>
import { computed } from 'vue'
import data from '@/data/projects.js'
import Card from '@/components/Card.vue'
import Tag from '@/components/Tag.vue'

const props = defineProps({
    type: {
        type: String,
        required: true
    },
    limit: {
        type: Number,
        default: Infinity
    }
})

const emit = defineEmits(['total-items']);

const filteredProjects = computed(() => {
    if (!data[props.type]) {
        console.warn(`No projects found for type: ${props.type}`);
        return [];
    }
    const allProjects = data[props.type];
    emit('total-items', allProjects.length);
    return allProjects.slice(0, props.limit);
});

const handleImageError = (event) => {
    // Fallback to a solid color background if image fails to load
    event.target.style.display = 'none';
    event.target.parentElement.style.background = 'linear-gradient(135deg, #ff3344 0%, #ff3377 100%)';
    event.target.parentElement.innerHTML += '<div style="color: white; font-weight: bold; text-align: center; line-height: 180px;">No Image</div>';
};
</script>

<template>

    <template v-for="(card, index) in filteredProjects" :key="index">
        <Card class="card-height">
            <template v-slot:type>
                <span v-if="card.type">{{ card.type }}</span>
            </template>

            <template v-slot:image>
                <img :src="card.image || './images/default-project.jpg'" :alt="card.name" @error="handleImageError" />
            </template>

            <template v-slot:title>
                <h2>{{ card.name }}</h2>
            </template>

            <template v-slot:description>
                <p>{{ card.description }}</p>
            </template>

            <template v-slot:tags>
                <Tag v-for="tag in card.tags" :key="tag">{{ tag }}</Tag>
            </template>

            <template v-slot:links>
                <a v-for="link in card.links" :key="link.path" :href="link.path" class="card-link">
                    {{ link.label }}
                </a>
            </template>
        </Card>
    </template>

</template>

<style scoped>
.cards-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
}

@media (max-width: 1200px) {
    .cards-grid {
        grid-template-columns: repeat(2, 1fr);
    }
}

@media (max-width: 768px) {
    .cards-grid {
        grid-template-columns: 1fr;
    }
}

.card-height {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
}

.card-link {
    display: inline-block;
    margin: 0;
    text-decoration: none;
    color: #f1f1f1;
}

.card-link:hover {
    text-decoration: underline;
}

@media (max-width: 480px) {
    .cards-grid {
        gap: 0.5rem;
    }

    .card-link {
        font-size: 0.9rem;
    }

    .card-height {
        min-height: auto;
        width: 100%;
    }
}
</style>
