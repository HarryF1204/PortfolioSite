<template>
    <div class="mc">
        <header class="topbar">
            <router-link class="mc-btn back" to="/" aria-label="Back to projects">&lt;</router-link>
            <h1>Experience</h1>
        </header>

        <div class="layout">
            <aside class="sidebar">
                <div class="xp">
                    <span class="xp-level">{{ yearsExperience }}</span>
                    <div class="xp-bar" aria-hidden="true">
                        <span v-for="n in 12" :key="n" :class="{ filled: n <= monthsIntoYear }"></span>
                    </div>
                    <p>
                        {{ yearsExperience }} years of Bedrock development, since {{ formatDate(earliestStart) }}.
                    </p>
                </div>

                <nav class="tabs" aria-label="Sections">
                    <button v-for="section in sections" :key="section.id" class="mc-btn"
                        @click="scrollTo(section.id)">
                        {{ section.title }}
                    </button>
                </nav>

                <router-link class="mc-btn green" to="/">View My Work</router-link>
            </aside>

            <main>
                <section id="work">
                    <h2>Work</h2>
                    <article v-for="job in work" :key="job.company" class="panel">
                        <span class="slot" aria-hidden="true">{{ job.company[0] }}</span>
                        <div class="panel-body">
                            <div class="panel-head">
                                <h3>
                                    <a v-if="job.link" :href="job.link" target="_blank" rel="noopener">
                                        {{ job.company }}
                                    </a>
                                    <template v-else>{{ job.company }}</template>
                                </h3>
                                <span class="dates">{{ formatRange(job.start, job.end) }}</span>
                            </div>
                            <div v-for="role in job.roles" :key="role.title + role.start" class="role">
                                <p class="role-title">
                                    {{ role.title }}
                                    <span v-if="job.roles.length > 1" class="dates">
                                        {{ formatRange(role.start, role.end) }}
                                    </span>
                                </p>
                                <p>{{ role.description }}</p>
                            </div>
                        </div>
                    </article>
                </section>

                <section id="education">
                    <h2>Education</h2>
                    <article v-for="item in education" :key="item.name" class="panel">
                        <span class="slot" aria-hidden="true">{{ item.name[0] }}</span>
                        <div class="panel-body">
                            <div class="panel-head">
                                <h3>{{ item.name }}</h3>
                                <span class="dates">{{ formatRange(item.start, item.end) }}</span>
                            </div>
                            <p class="role">
                                <template v-if="item.institution">{{ item.institution }}, </template>
                                {{ item.classification || item.status }}
                            </p>
                        </div>
                    </article>
                </section>

                <section id="certifications">
                    <h2>Certifications</h2>
                    <article v-for="item in certifications" :key="item.name" class="panel">
                        <span class="slot" aria-hidden="true">{{ item.name[0] }}</span>
                        <div class="panel-body">
                            <div class="panel-head">
                                <h3>
                                    <a v-if="item.link" :href="item.link" target="_blank" rel="noopener">
                                        {{ item.name }}
                                    </a>
                                    <template v-else>{{ item.name }}</template>
                                </h3>
                                <span class="dates">{{ formatRange(item.start, item.end) }}</span>
                            </div>
                            <p class="role">{{ item.issuer }}</p>
                        </div>
                    </article>
                </section>
            </main>
        </div>
    </div>
</template>

<script setup>
import {
    work, education, certifications, earliestStart, yearsExperience, monthsIntoYear, formatDate, formatRange
} from '@services/experience.js';

const sections = [
    { id: 'work', title: 'Work' },
    { id: 'education', title: 'Education' },
    { id: 'certifications', title: 'Certifications' }
];

const scrollTo = (id) => {
    const section = document.getElementById(id);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
};
</script>

<!-- Colours and bevels follow the Bedrock menu screens -->
<style scoped>
.mc {
    --outline: #1e1e1f;
    --screen: #313233;
    --panel: #48494a;
    --panel-light: #6d6d6e;
    --panel-dark: #3a3b3c;
    --light: #d0d1d4;
    --green: #3c8527;
    --xp: #80ff20;

    min-height: 100vh;
    background: var(--screen);
    color: white;
    font-family: 'Noto Sans', sans-serif;
    line-height: 1.5;
}

.mc *,
.mc *::before,
.mc *::after {
    box-sizing: border-box;
}

h1,
h2,
h3,
p {
    margin: 0;
}

h1,
h2,
h3,
.mc-btn,
.slot,
.xp-level {
    font-family: 'Jersey 10', sans-serif;
    font-weight: 400;
}

:focus-visible {
    outline: 3px solid white;
    outline-offset: 2px;
}

/* Top bar */

.topbar {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 4rem;
    padding: 0.5rem 4.5rem;
    background: #e6e8eb;
    border-bottom: 4px solid #b1b2b5;
    color: var(--outline);
}

h1 {
    font-size: 2.25rem;
    line-height: 1;
}

.back {
    position: absolute;
    left: 0.75rem;
    top: 50%;
    width: 2.75rem;
    margin-top: -1.5rem;
    padding-inline: 0;
    text-align: center;
}

/* Buttons */

.mc-btn {
    display: block;
    padding: 0.5rem 1rem 0.75rem;
    border: 2px solid var(--outline);
    background: var(--light);
    box-shadow: inset 0 -4px 0 #58585a, inset 0 2px 0 #ecedee;
    color: var(--outline);
    font-size: 1.5rem;
    line-height: 1.5rem;
    text-align: left;
    text-decoration: none;
    cursor: pointer;
}

.mc-btn:hover {
    background: #b1b2b5;
}

.mc-btn:active {
    padding: 0.625rem 1rem;
    box-shadow: inset 0 -2px 0 #58585a;
}

.mc-btn.green {
    background: var(--green);
    box-shadow: inset 0 -4px 0 #1d4d13, inset 0 2px 0 #639d52;
    color: white;
    text-align: center;
}

.mc-btn.green:hover {
    background: #2a641c;
}

.mc-btn.green:active {
    box-shadow: inset 0 -2px 0 #1d4d13;
}

/* Layout */

.layout {
    display: grid;
    grid-template-columns: 17rem minmax(0, 1fr);
    gap: 2rem;
    max-width: 1100px;
    margin: 0 auto;
    padding: 2rem 1.5rem 4rem;
    align-items: start;
}

.sidebar {
    position: sticky;
    top: 1.5rem;
    display: grid;
    gap: 1.5rem;
}

.tabs {
    display: grid;
    gap: 0.5rem;
}

/* Experience bar: the level is full years, each segment a month towards the next */

.xp {
    text-align: center;
}

.xp-level {
    display: block;
    font-size: 2.75rem;
    line-height: 1;
    color: var(--xp);
    text-shadow: 2px 2px 0 var(--outline), -2px 2px 0 var(--outline), 2px -2px 0 var(--outline), -2px -2px 0 var(--outline);
}

.xp-bar {
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    margin: 0.5rem 0 0.75rem;
    border: 2px solid var(--outline);
    background: var(--outline);
    gap: 2px;
}

.xp-bar span {
    height: 0.6rem;
    background: #1f3a0c;
}

.xp-bar .filled {
    background: var(--xp);
    box-shadow: inset 0 -3px 0 #4fae0d;
}

.xp p {
    font-size: 0.9rem;
    color: var(--light);
}

/* Sections */

section {
    scroll-margin-top: 1.5rem;
}

section+section {
    margin-top: 2.5rem;
}

h2 {
    margin-bottom: 0.75rem;
    font-size: 2.1rem;
    line-height: 1;
}

.panel {
    display: flex;
    gap: 1rem;
    padding: 1rem;
    border: 2px solid var(--outline);
    background: var(--panel);
    box-shadow: inset 0 2px 0 var(--panel-light), inset 0 -4px 0 var(--panel-dark);
}

.panel+.panel {
    margin-top: 0.5rem;
}

/* Inventory slot holding the entry's initial */
.slot {
    flex: none;
    width: 3rem;
    height: 3rem;
    border: 3px solid;
    border-color: #373737 white white #373737;
    background: #8b8b8b;
    font-size: 1.75rem;
    line-height: calc(3rem - 8px);
    text-align: center;
    text-shadow: 2px 2px 0 #3f3f3f;
}

.panel-body {
    flex: 1;
    min-width: 0;
    padding-bottom: 0.25rem;
}

.panel-head {
    display: flex;
    flex-wrap: wrap;
    align-items: baseline;
    justify-content: space-between;
    gap: 0 1rem;
}

h3 {
    font-size: 1.75rem;
    line-height: 1.1;
}

h3 a {
    color: inherit;
    text-underline-offset: 0.2em;
}

h3 a:hover {
    color: var(--xp);
}

.dates {
    font-size: 0.9rem;
    color: var(--light);
    white-space: nowrap;
}

.role {
    max-width: 60ch;
    margin-top: 0.6rem;
    color: var(--light);
}

.role-title {
    font-weight: 700;
    color: white;
}

.role-title .dates {
    margin-left: 0.5rem;
    font-weight: 400;
}

@media (max-width: 800px) {
    .layout {
        grid-template-columns: 1fr;
        padding: 1.5rem 1rem 3rem;
    }

    .sidebar {
        position: static;
    }

    .tabs {
        grid-template-columns: repeat(3, auto);
    }

    .tabs .mc-btn {
        padding-inline: 0.5rem;
        font-size: 1.3rem;
        text-align: center;
    }

    .slot {
        width: 2.5rem;
        height: 2.5rem;
        font-size: 1.4rem;
        line-height: calc(2.5rem - 8px);
    }

    .panel {
        gap: 0.75rem;
        padding: 0.75rem;
    }
}
</style>
