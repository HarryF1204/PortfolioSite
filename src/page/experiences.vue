<template>
    <div class="project-view">
        <a class="back-button" :href="'/PortfolioSite/#/'">&larr; Back</a>
        <section id="exp-edu" class="article">
            <!-- Experience Section -->
            <div class="section-header" @click="toggleExperience">
                <h2>Experience</h2>
                <span class="toggle-btn">{{ isExperienceExpanded ? '−' : '+' }}</span>
            </div>
            <transition name="collapse">
                <div v-show="isExperienceExpanded">
                    <div v-for="(item, idx) in experiences" :key="`exp-${idx}`" class="entry">
                        <div class="header">
                            <h3>{{ item.name }}</h3>
                            <span class="date">{{ item.date }}</span>
                        </div>
                        <p class="desc">{{ item.description }}</p>
                        <a v-if="item.link" :href="item.link" target="_blank" rel="noopener" class="link">
                            Learn More →
                        </a>
                    </div>
                </div>
            </transition>

            <!-- Education Section -->
            <div class="section-header" @click="toggleEducation">
                <h2>Education & Certifications</h2>
                <span class="toggle-btn">{{ isEducationExpanded ? '−' : '+' }}</span>
            </div>
            <transition name="collapse">
                <div v-show="isEducationExpanded">
                    <div v-for="(item, idx) in education" :key="`edu-${idx}`" class="entry">
                        <div class="header">
                            <h3>{{ item.name }}</h3>
                            <span class="date">{{ item.date }}</span>
                        </div>
                        <p class="desc">{{ item.description }}</p>
                        <a v-if="item.link" :href="item.link" target="_blank" rel="noopener" class="link">
                            Learn More →
                        </a>
                    </div>
                </div>
            </transition>
        </section>
    </div>
</template>

<script setup>
import { defineProps, ref } from 'vue'

const isExperienceExpanded = ref(true);
const isEducationExpanded = ref(true);

const toggleExperience = () => isExperienceExpanded.value = !isExperienceExpanded.value;
const toggleEducation = () => isEducationExpanded.value = !isEducationExpanded.value;

const props = defineProps({
    experiences: {
        type: Array,
        default: () => [
            {
                name: 'Lead Developer at Eternal Creations',
                date: 'Sep 2024 – Present',
                description: 'Lead developer working on Minecraft Marketplace content.',
                link: 'https://eternalcreations.games'
            },
            {
                name: 'Developer at Rareloot',
                date: 'Aug 2023 – May 2024',
                description: 'Worked on Minecraft Marketplace content.',
                link: 'https://www.rareloot.at'
            },
            {
                name: 'Developer at Lore Studios',
                date: 'Sep 2022 – Jan 2023',
                description: 'Worked on Minecraft Marketplace content.',
                link: 'https://www.pikistudios.com'
            },
            {
                name: 'Developer at Radium Studios',
                date: 'Nov 2022 – Sep 2023',
                description: 'Worked on Minecraft Marketplace content that was never released due to a lack of funding.'
            },
            {
                name: 'Developer at Eternal Creations',
                date: 'Nov 2022 – Sep 2024',
                description: 'Worked on Minecraft Marketplace content until I was promoted in 2024.',
                link: 'https://eternalcreations.games'
            }
        ]
    },
    education: {
        type: Array,
        default: () => [
            {
                name: 'BSc Computer Science With CyberSecurity',
                date: '2024 – Present',
                description: 'Currently in my 4th year of studying computer science and cyber security.'
            },
            {
                name: 'HND Computing Science and Cyber Security',
                date: 'Aug 2023 – May 2024',
                description: 'Completed a HND in computing science and cyber security.'
            },
            {
                name: 'Netacad CCNAv7',
                date: 'May 2022 – Mar 2023',
                description: 'Achieved a certification in networking.',
                link: 'https://www.netacad.com'
            }
        ]
    }
})
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

.back-button {
    position: relative;
    padding: 0.5rem 1rem;
    border: none;
    background: none;
    font-size: 1rem;
    color: #666;
    cursor: pointer;
    text-decoration: none;
    transition: color 0.2s;
}

.back-button:hover {
    color: #000;
}

#exp-edu {
    max-width: 800px;
    margin: 2rem auto;
    font-family: 'Inter', sans-serif;
    line-height: 1.8;
}

h2 {
    color: #2c3e50;
    font-size: 2rem;
    margin-top: 20px;
    border-bottom: none;
}

h3 {
    color: #2c3e50;
    font-size: 1.5rem;
    margin: 0;
}

.entry {
    border-bottom: 1px solid #eee;
    padding: 1.5rem 0;
}

.desc {
    color: #333;
    line-height: 1.6;
    margin: 0.5rem 0;
    font-size: 0.95rem;
}

.link {
    color: #3498db;
    text-decoration: none;
    font-weight: 500;
}

.link:hover {
    text-decoration: underline;
}

.section-header {
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.toggle-btn {
    font-size: 1.5rem;
    color: #666;
    padding: 0 0.5rem;
}

.collapse-enter-active,
.collapse-leave-active {
    transition: all 0.3s ease-out;
    overflow: hidden;
}

.collapse-enter-from,
.collapse-leave-to {
    opacity: 0;
    max-height: 0;
}

.collapse-enter-to,
.collapse-leave-from {
    opacity: 1;
    max-height: 1000px;
}

@media (max-width: 768px) {
    .project-view {
        padding: 1.5rem;
        margin: 1rem;
        border-radius: 6px;
    }

    h2 {
        font-size: 1.75rem;
    }

    h3 {
        font-size: 1.25rem;
    }

    .desc {
        font-size: 0.95rem;
    }
}

@media (max-width: 480px) {
    .project-view {
        padding: 1rem;
        margin: 0.5rem;
    }

    h2 {
        font-size: 1.5rem;
    }

    h3 {
        font-size: 1.15rem;
    }

    .desc {
        font-size: 0.9rem;
    }
}
</style>