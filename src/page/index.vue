<template>
    <main class="content-wrapper">
        <header class="hero-section">
            <div class="hero-container">
                <div class="hero-content">
                    <h1 class="hero-name">Harry<span>F1204</span></h1>
                    <p class="hero-subtitle">Software Developer & Cyber Security Student</p>

                    <div class="hero-description">
                        <p>Passionate developer specializing in Minecraft Bedrock development with experience pushing
                            technical boundaries while maintaining high quality standards.</p>
                        <button class="read-more-btn" @click="toggleBio">
                            {{ showFullBio ? 'Read Less' : 'Read More' }}
                        </button>
                    </div>

                    <div v-if="showFullBio" class="hero-bio">
                        <p>I am a passionate Minecraft Bedrock Developer with four years of experience and am currently
                            employed as the lead developer at Eternal Creations. Being proficient in every stable aspect
                            of
                            bedrock modding, I specialize in pushing the limits of what's possible while maintaining
                            high
                            quality standards in my projects.</p>

                        <p>To hone my skills, I have worked with multiple Bedrock Marketplace studios, regularly
                            assisting
                            developers on the Bedrock Addons discord with their issues.</p>

                        <p>My notable projects like Theia Dimension and More Enchantments showcase my ability to produce
                            high-quality, immersive content.</p>

                        <p>My technical innovations include mapping out bedrock material configurations through
                            black-box
                            testing and in-depth research which allowed me to produce free to use material documentation
                            available on my GitHub. This project allowed me to create visual feats like portal-view
                            rendering
                            and a custom entity-based skybox.</p>
                    </div>

                    <div class="skill-tags">
                        <div class="tag-pill" v-for="skill in skills" :key="skill">{{ skill }}</div>
                    </div>
                </div>
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
                    :type="category.type" :isExpanded="expandedCategory === category.type" @toggle="toggleCategory" />
            </div>
        </section>
    </main>
</template>

<script setup>
import { ref, computed } from 'vue';
import Tag from '@components/Tag.vue'
import ProjectCategory from '@components/ProjectCategory.vue';
import CollapsibleText from '@components/CollapsibleText.vue';

const showFullBio = ref(false);
const toggleBio = () => {
    showFullBio.value = !showFullBio.value;
};

const skills = [
    'Full Stack',
    'Web App Development',
    'Bedrock Development',
    'TS',
    'JS',
    'Python'
];

const categories = [
    { title: 'Featured', type: 'featured' },
    { title: 'Experiences', type: 'experiences' },
    { title: 'Marketplace Projects', type: 'marketplace' },
    { title: 'Personal Projects', type: 'personal' }
];

const activeCategory = ref('all');
const expandedCategory = ref('featured');

const setActiveCategory = (category) => {
    activeCategory.value = category;
    expandedCategory.value = category === 'all' ? null : category;
};

const toggleCategory = (categoryType) => {
    expandedCategory.value = expandedCategory.value === categoryType ? null : categoryType;
};

const filteredCategories = computed(() => {
    if (activeCategory.value === 'all') {
        return categories;
    }
    return categories.filter(category => category.type === activeCategory.value);
});
</script>

<style scoped>
.hero-section {
    background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
    border-radius: 16px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
    padding: 3.5rem 2rem;
    margin-bottom: 2rem;
    overflow: hidden;
    position: relative;
}

.hero-container {
    max-width: 900px;
    margin: 0 auto;
    text-align: center;
}

.hero-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
}

.hero-name {
    font-size: 3.5rem;
    font-weight: 800;
    margin: 0;
    background: linear-gradient(90deg, #2d3748 0%, #4a5568 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    letter-spacing: -0.5px;
    transition: transform 0.3s ease;
}

.hero-name span {
    color: #4299e1;
    -webkit-text-fill-color: #4299e1;
}

.hero-name:hover {
    transform: translateY(-2px);
}

.hero-subtitle {
    font-size: 1.4rem;
    color: #4a5568;
    font-weight: 500;
    margin: 0.5rem 0 1rem;
}

.hero-description {
    max-width: 650px;
    margin: 0 auto 1rem;
    color: #4a5568;
    line-height: 1.6;
}

.hero-bio {
    max-width: 700px;
    margin: 0 auto;
    text-align: left;
    color: #4a5568;
    line-height: 1.7;
    animation: fadeIn 0.5s ease;
}

.hero-bio p {
    margin-bottom: 1rem;
}

.read-more-btn {
    background: transparent;
    color: #4299e1;
    border: none;
    font-weight: 600;
    cursor: pointer;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    transition: all 0.2s ease;
}

.read-more-btn:hover {
    background: rgba(66, 153, 225, 0.1);
}

.skill-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
    justify-content: center;
    margin: 1.5rem 0;
}

.tag-pill {
    background: white;
    color: #4a5568;
    padding: 0.5rem 1rem;
    border-radius: 50px;
    font-size: 0.9rem;
    font-weight: 500;
    border: 1px solid #e2e8f0;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.04);
    transition: all 0.2s ease;
}

.tag-pill:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.08);
    background: #f8fafc;
}

@keyframes fadeIn {
    from {
        opacity: 0;
    }

    to {
        opacity: 1;
    }
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

@media (max-width: 768px) {
    .hero-section {
        padding: 2rem 1rem;
        border-radius: 12px;
    }

    .hero-name {
        font-size: 2.5rem;
    }

    .hero-subtitle {
        font-size: 1.1rem;
    }

    .skill-tags {
        gap: 0.5rem;
    }

    .tag-pill {
        padding: 0.4rem 0.8rem;
        font-size: 0.8rem;
    }

    .content-wrapper {
        margin: 1rem auto;
        padding: 0 1rem;
    }

    #projects {
        padding: 1rem;
    }

    .project-controls {
        flex-direction: column;
        gap: 1rem;
        align-items: flex-start;
        padding: 0.5rem 0;
    }

    .category-filters {
        flex-wrap: wrap;
        gap: 0.5rem;
    }

    .filter-btn {
        padding: 0.25rem 0.75rem;
        font-size: 0.9rem;
    }
}

@media (max-width: 480px) {
    .hero-section {
        padding: 1.5rem 1rem;
    }

    .hero-name {
        font-size: 2rem;
    }

    .hero-subtitle {
        font-size: 1rem;
    }
}
</style>