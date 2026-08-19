<script setup>
import { computed, ref, watch } from 'vue'
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

// Index of the card whose trailer is currently playing (only one at a time)
const playingIndex = ref(null);

watch(filteredProjects, () => {
    playingIndex.value = null;
});

const embedUrl = (videoId) =>
    `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`;

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
                <div class="preview-media">
                    <iframe v-if="card.video && playingIndex === index" class="preview-video"
                        :src="embedUrl(card.video)" :title="`${card.name} trailer`" frameborder="0"
                        allow="autoplay; accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowfullscreen></iframe>
                    <template v-else>
                        <img :src="card.image || './images/default-project.jpg'" :alt="card.name"
                            @error="handleImageError" />
                        <button v-if="card.video" type="button" class="play-button"
                            :aria-label="`Play ${card.name} trailer`" @click="playingIndex = index">
                            <svg viewBox="0 0 24 24" aria-hidden="true">
                                <path d="M8 5.5v13l11-6.5z" />
                            </svg>
                        </button>
                    </template>
                </div>
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
.preview-media {
    /* Fills the Card's fixed-ratio preview box and anchors the play overlay */
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
}

.preview-media img,
.preview-video {
    width: 100%;
    height: 100%;
    display: block;
    object-fit: cover;
    border: 0;
}

.play-button {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 4rem;
    height: 4rem;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    border: 1px solid rgba(255, 255, 255, 0.7);
    border-radius: 50%;
    background-color: rgba(255, 255, 255, 0.3);
    backdrop-filter: blur(2px);
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.25);
    cursor: pointer;
    transition: background-color 0.2s ease, transform 0.2s ease;
}

.play-button svg {
    width: 55%;
    height: 55%;
    fill: rgba(255, 255, 255, 0.95);
    filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.35));
    margin-left: 4%;
}

.play-button:hover,
.play-button:focus-visible {
    background-color: rgba(255, 255, 255, 0.5);
    transform: translate(-50%, -50%) scale(1.08);
}

@media (max-width: 480px) {
    .play-button {
        width: 3rem;
        height: 3rem;
    }
}

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
