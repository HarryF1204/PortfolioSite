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
</script>

<template>

    <template v-for="(card, index) in filteredProjects" :key="index">
        <Card class="card-height">
            <template v-slot:title>
                <h2>{{ card.name }}</h2>
            </template>

            <template v-slot:tags>
                <Tag v-for="tag in card.tags" :key="tag">{{ tag }}</Tag>
            </template>

            <template v-slot:content>
                <p>{{ card.description }}</p>
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
    display: flex;
    flex-direction: column;
}

.card-link {
    display: inline-block;
    margin: 0;
    text-decoration: none;
    color: #007bff;
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
    }
}
</style>
