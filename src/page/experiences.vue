<template>
    <nav class="nav">
        <router-link class="logo" to="/">Portfolio</router-link>
        <button class="btn" @click="scrollToContacts">Contact Me</button>
    </nav>

    <section class="hero">
        <div class="hero-content">
            <h1>My <span style="color: var(--accent-color)">Experience</span></h1>
            <p>
                Making Minecraft Bedrock content professionally since {{ formatDate(earliestStart) }}.
                Currently {{ currentRole.title }} at {{ currentRole.company }}.
            </p>
            <button class="btn" @click="goToProjects">View My Work</button>
        </div>
    </section>

    <main class="content-wrapper">
        <div class="columns">
            <section class="category">
                <h2>Work</h2>
                <hr />
                <article v-for="job in work" :key="job.company" class="entry">
                    <div class="entry-head">
                        <h3>{{ job.company }}</h3>
                        <span class="dates">{{ formatRange(job.start, job.end) }}</span>
                    </div>
                    <div v-for="role in job.roles" :key="role.title + role.start" class="role">
                        <p class="role-title">
                            {{ role.title }}
                            <span v-if="job.roles.length > 1">{{ formatRange(role.start, role.end) }}</span>
                        </p>
                        <p class="description">{{ role.description }}</p>
                    </div>
                    <a v-if="job.link" :href="job.link" target="_blank" rel="noopener" class="entry-link">
                        Website
                    </a>
                </article>
            </section>

            <div>
                <section class="category">
                    <h2>Education</h2>
                    <hr />
                    <article v-for="item in education" :key="item.name" class="entry">
                        <div class="entry-head">
                            <h3>{{ item.name }}</h3>
                            <span class="dates">{{ formatRange(item.start, item.end) }}</span>
                        </div>
                        <p class="description">
                            <template v-if="item.institution">{{ item.institution }}, </template>
                            {{ item.classification || item.status }}
                        </p>
                    </article>
                </section>

                <section class="category">
                    <h2>Certifications</h2>
                    <hr />
                    <article v-for="item in certifications" :key="item.name" class="entry">
                        <div class="entry-head">
                            <h3>{{ item.name }}</h3>
                            <span class="dates">{{ formatRange(item.start, item.end) }}</span>
                        </div>
                        <p class="description">{{ item.issuer }}</p>
                        <a v-if="item.link" :href="item.link" target="_blank" rel="noopener" class="entry-link">
                            Website
                        </a>
                    </article>
                </section>
            </div>
        </div>
    </main>

    <div id="contacts">
        <GetInTouch></GetInTouch>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import GetInTouch from '@components/GetInTouch.vue';
import {
    work, education, certifications, currentRole, earliestStart, formatDate, formatRange
} from '@services/experience.js';

const router = useRouter();

const scrollToContacts = () => {
    const contactsSection = document.getElementById('contacts');
    if (contactsSection) {
        contactsSection.scrollIntoView({ behavior: 'smooth' });
    }
};

const goToProjects = () => {
    router.push('/');
};
</script>

<!-- Nav, hero, buttons and section headings mirror index.vue and ProjectCategory.vue -->
<style scoped>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Inter', sans-serif;
}

.nav {
    padding: 1.5rem 10%;
    background: white;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.logo {
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--accent-color);
    text-decoration: none;
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

.hero {
    display: flex;
    align-items: center;
    padding: 6rem 10%;
    background: linear-gradient(45deg, rgba(255, 51, 102, 0.1) 0%, rgba(255, 51, 102, 0) 100%);
}

.hero-content h1 {
    font-size: 4rem;
    margin-bottom: 1rem;
}

.hero-content p {
    max-width: 40rem;
    font-size: 1.2rem;
    margin-bottom: 2rem;
}

.content-wrapper {
    max-width: 90%;
    margin: 2rem auto;
    padding: 2rem 2.5rem;
    background-color: #f4f4f4;
}

.category {
    margin-bottom: 3rem;
}

.category h2 {
    font-size: 1.5rem;
}

hr {
    margin: 0.5rem 0;
}

/* Work on the left, education and certifications on the right */
.columns {
    display: grid;
    grid-template-columns: minmax(0, 1.6fr) minmax(0, 1fr);
    gap: 4rem;
    align-items: start;
}

.entry {
    padding: 1.5rem 0;
}

.entry+.entry {
    border-top: 1px solid #ddd;
}

.entry-head {
    display: flex;
    flex-wrap: wrap;
    align-items: baseline;
    justify-content: space-between;
    gap: 0 1.5rem;
}

.dates {
    font-size: 0.95rem;
    color: #555;
    white-space: nowrap;
}

.entry h3 {
    font-size: 1.25rem;
    font-weight: bold;
    color: #222;
}
.role {
    margin-top: 0.75rem;
}

.role-title {
    font-size: 0.95rem;
    font-weight: 600;
    color: #222;
}

.role-title span {
    margin-left: 0.5rem;
    font-weight: 400;
    color: #555;
}

.description {
    margin-top: 0.15rem;
    max-width: 40rem;
    font-size: 0.95rem;
    color: #444;
    line-height: 1.4;
}

.entry-link {
    display: inline-block;
    margin-top: 0.75rem;
    font-size: 0.95rem;
    font-weight: 600;
    color: var(--accent-color);
    text-decoration: none;
}

.entry-link:hover {
    text-decoration: underline;
}

@media (max-width: 960px) {
    .columns {
        grid-template-columns: 1fr;
        gap: 0;
    }
}

@media (max-width: 768px) {
    .hero {
        padding: 3rem 10%;
    }

    .hero-content h1 {
        font-size: 2.5rem;
    }

    .hero-content p {
        font-size: 1.1rem;
    }

    .content-wrapper {
        margin: 1rem auto;
        padding: 1rem 2rem;
    }

    .entry {
        padding: 1.25rem 0;
    }
}

@media (max-width: 480px) {
    .nav {
        padding: 1rem 5%;
    }

    .btn {
        padding: 0.7rem 1.25rem;
    }

    .hero {
        padding: 2.5rem 5%;
    }

    .content-wrapper {
        max-width: 100%;
        padding: 1rem;
    }
}
</style>
