<template>
    <nav class="nav">
        <div class="logo">Portfolio</div>
        <button class="btn" @click="scrollToContacts">Contact Me</button>
    </nav>

    <section class="hero">
        <div class="hero-content">
            <h1>Hi, I'm <span style="color: var(--accent-color)">Harry</span></h1>
            <p>{string} Something pretencious about development.</p>
            <button class="btn" @click="scrollToProjects">View My Work</button>
            <button class="exp-btn" @click="goToExperience">Check Out My Experience</button>
        </div>
    </section>

    <main class="content-wrapper">
        <section id="projects">
            <div class="project-controls">
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
                    :type="category.type" :isExpanded="expandedCategories.includes(category.type)"
                    @toggle="toggleCategory" />
            </div>
        </section>
    </main>

    <div id="contacts">
        <GetInTouch></GetInTouch>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import ProjectCategory from '@components/ProjectCategory.vue';
import GetInTouch from '@components/GetInTouch.vue';
import experiences from './experiences.vue';

const router = useRouter();

const categories = [
    { title: 'Minecraft Bedrock Projects', type: 'minecraft' },
    { title: 'Personal Projects', type: 'personal' }
];

const activeCategory = ref('all');
const expandedCategories = ref(categories.map(category => category.type));

const setActiveCategory = (category) => {
    activeCategory.value = category;
    expandedCategories.value = category === 'all' ? categories.map(category => category.type) : [category];
};

const toggleCategory = (categoryType) => {
    if (expandedCategories.value.includes(categoryType)) {
        expandedCategories.value = expandedCategories.value.filter(type => type !== categoryType);
    } else {
        expandedCategories.value.push(categoryType);
    }
};

const filteredCategories = computed(() => {
    if (activeCategory.value === 'all') {
        return categories;
    }
    return categories.filter(category => category.type === activeCategory.value);
});

const scrollToContacts = () => {
    const contactsSection = document.getElementById('contacts');
    if (contactsSection) {
        contactsSection.scrollIntoView({ behavior: 'smooth' });
    }
}

const scrollToProjects = () => {
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
        projectsSection.scrollIntoView({ behavior: 'smooth' });
    }
};

const goToExperience = () => {
    router.push('/experience');
};
</script>


<style scoped>
* {
    --accent-color: #FF3366;
    --bg-color: #f8f9fa;
    --text-color: #2c3e50;
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Inter', sans-serif;
}

body {
    background-color: var(--bg-color);
    color: var(--text-color);
    line-height: 1.6;
}

.nav {
    padding: 1.5rem 10%;
    background: white;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.btn {
    padding: 0.8rem 2rem;
    background: var(--accent-color);
    color: white;
    border: none;
    border-radius: 5px;
    font-size: 1rem;
    cursor: pointer;
    transition: transform 0.3s ease;
}

.exp-btn {
    padding: 0.68rem 2rem;
    margin-left: 0.5rem;
    background: transparent;
    color: var(--accent-color);
    border: 2px dotted var(--accent-color);
    border-radius: 5px;
    font-size: 1rem;
    cursor: pointer;
    transition: transform 0.3s ease;
}

.exp-btn:hover {
    transform: translateY(-3px);
}

.btn:hover {
    transform: translateY(-3px);
}

.logo {
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--accent-color);
}

.hero {
    min-height: 90vh;
    display: flex;
    align-items: center;
    padding: 0 10%;
    background: linear-gradient(45deg, rgba(255, 51, 102, 0.1) 0%, rgba(255, 51, 102, 0) 100%);
}

.hero-content h1 {
    font-size: 4rem;
    margin-bottom: 1rem;
}

.hero-content p {
    font-size: 1.2rem;
    margin-bottom: 2rem;
}

.btn {
    padding: 0.8rem 2rem;
    background: var(--accent-color);
    color: white;
    border: none;
    border-radius: 5px;
    font-size: 1rem;
    cursor: pointer;
    transition: transform 0.3s ease;
}

.btn:hover {
    transform: translateY(-3px);
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
    max-width: 90%;
    margin: 2rem auto;
    padding: 0 2rem;
    background-color: #f4f4f4;
}

#projects {
    padding: 2rem 0.5rem;
}

.category-filters {
    display: flex;
    gap: 1rem;
}

.filter-btn {
    padding: 0.5rem 1rem;
    border-radius: 20px;
    border: 1px solid #ddd;
    background: white;
    cursor: pointer;
    transition: all 0.2s ease;
}

.filter-btn.active {
    background: var(--accent-color);
    border: 1px solid var(--accent-color);
    color: #ddd;
}

.filter-btn:hover {
    background: var(--accent-color);
    border: 1px solid var(--accent-color);
    color: white;
    transition: background 0.3s, color 0.3s;
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