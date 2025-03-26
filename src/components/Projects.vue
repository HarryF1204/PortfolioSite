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
                <a :href="card.link" class="card-link">View Project</a>
            </template>
        </Card>
    </template>
</template>

<style scoped>
.card-height {
    min-height: 12.5rem;
}
</style>
