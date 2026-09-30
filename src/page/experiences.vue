<template>
    <div class="page">
        <router-link class="back-button" to="/">&larr; Back</router-link>

        <header class="intro">
            <p class="eyebrow">Experience &amp; Education</p>
            <h1>{{ yearsExperience }} years developing for Minecraft Bedrock</h1>
            <p class="summary">
                Currently <strong>{{ currentRole.title }}</strong> at <strong>{{ currentRole.company }}</strong>.
                <strong>{{ highestQualification.name }}</strong>, {{ highestQualification.classification }}
                ({{ highestQualification.end }}).
            </p>
        </header>

        <section class="stats" aria-label="At a glance">
            <div class="stat">
                <span class="stat-label">Current role</span>
                <span class="stat-value">{{ currentRole.title }}</span>
                <span class="stat-sub">{{ currentRole.company }}</span>
            </div>
            <div class="stat">
                <span class="stat-label">Highest qualification</span>
                <span class="stat-value">{{ highestQualification.classification }}</span>
                <span class="stat-sub">{{ highestQualification.award }} {{ highestQualification.subject }}</span>
            </div>
            <div class="stat">
                <span class="stat-label">Industry experience</span>
                <span class="stat-value">{{ yearsExperience }}+ years</span>
                <span class="stat-sub">since {{ formatDate(earliestStart) }}</span>
            </div>
            <div class="stat">
                <span class="stat-label">Marketplace releases</span>
                <span class="stat-value">{{ releasedCount }}</span>
                <span class="stat-sub">add-ons, maps &amp; packs</span>
            </div>
        </section>

        <div class="columns">
            <section class="work" aria-labelledby="work-heading">
                <h2 id="work-heading">Work</h2>
                <ol class="timeline">
                    <li v-for="job in work" :key="job.company" class="company" :class="{ current: job.isCurrent }">
                        <span class="marker" aria-hidden="true"></span>
                        <div class="company-head">
                            <h3>
                                <a v-if="job.link" :href="job.link" target="_blank" rel="noopener">
                                    {{ job.company }} <span class="ext" aria-hidden="true">↗</span>
                                </a>
                                <template v-else>{{ job.company }}</template>
                            </h3>
                            <span class="dates">{{ formatRange(job.start, job.end) }} · {{ duration(job.start,
                                job.end) }}</span>
                        </div>

                        <ol class="roles">
                            <li v-for="role in job.roles" :key="role.title + role.start" class="role"
                                :class="{ current: !role.end }">
                                <div class="role-head">
                                    <h4>{{ role.title }}</h4>
                                    <span v-if="!role.end" class="pill">Current</span>
                                </div>
                                <span v-if="job.roles.length > 1" class="dates">
                                    {{ formatRange(role.start, role.end) }} · {{ duration(role.start, role.end) }}
                                </span>
                                <p>{{ role.description }}</p>
                            </li>
                        </ol>
                    </li>
                </ol>
            </section>

            <aside class="side">
                <section aria-labelledby="edu-heading">
                    <h2 id="edu-heading">Education</h2>
                    <div v-for="(item, idx) in education" :key="item.name" class="edu-entry">
                        <div class="edu-head">
                            <span class="edu-level">{{ item.level }}</span>
                        </div>
                        <article class="edu-card" :class="{ highest: idx === 0 }">
                            <h3>{{ item.name }}</h3>
                            <p class="meta">
                                <template v-if="item.institution">{{ item.institution }} · </template>
                                {{ formatRange(item.start, item.end) }} · {{ item.classification || item.status }}
                            </p>
                        </article>
                    </div>
                </section>

                <section aria-labelledby="cert-heading">
                    <h2 id="cert-heading">Certifications</h2>
                    <div v-for="item in certifications" :key="item.name" class="edu-entry">
                        <div class="edu-head">
                            <span class="edu-level">{{ item.issuer }}</span>
                        </div>
                        <article class="edu-card">
                            <h3>
                                <a v-if="item.link" :href="item.link" target="_blank" rel="noopener">
                                    {{ item.name }} <span class="ext" aria-hidden="true">↗</span>
                                </a>
                                <template v-else>{{ item.name }}</template>
                            </h3>
                            <p class="meta">{{ formatRange(item.start, item.end) }}</p>
                        </article>
                    </div>
                </section>
            </aside>
        </div>

        <footer class="cta">
            <p>Want to see the work itself?</p>
            <router-link class="btn" to="/">View my projects</router-link>
        </footer>
    </div>
</template>

<script setup>
import experience from '@/data/experience.js'
import projects from '@/data/projects.js'

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const now = new Date();
const nowKey = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;

// 'YYYY-MM' -> month index, so ranges can be compared and subtracted
const toMonths = (date) => {
    const [year, month = '1'] = (date ?? nowKey).split('-');
    return Number(year) * 12 + Number(month) - 1;
};

const formatDate = (date) => {
    const [year, month] = date.split('-');
    return month ? `${MONTHS[Number(month) - 1]} ${year}` : year;
};

const formatRange = (start, end) => `${formatDate(start)} - ${end ? formatDate(end) : 'Present'}`;

const duration = (start, end) => {
    const total = toMonths(end) - toMonths(start) + 1;
    const years = Math.floor(total / 12);
    const months = total % 12;
    const parts = [];
    if (years) parts.push(`${years} yr${years > 1 ? 's' : ''}`);
    if (months) parts.push(`${months} mo${months > 1 ? 's' : ''}`);
    return parts.join(' ');
};

// Each company spans its earliest role start to its latest role end
const work = experience.work
    .map(job => {
        const starts = job.roles.map(r => r.start).sort();
        const isCurrent = job.roles.some(r => !r.end);
        const end = isCurrent ? null : job.roles.map(r => r.end).sort().at(-1);
        return { ...job, start: starts[0], end, isCurrent };
    })
    .sort((a, b) => toMonths(b.end) - toMonths(a.end) || toMonths(b.start) - toMonths(a.start));

const { education, certifications } = experience;

const currentJob = work.find(job => job.isCurrent) ?? work[0];
const currentRole = { ...currentJob.roles[0], company: currentJob.company };
const highestQualification = education[0];

const earliestStart = work.map(job => job.start).sort()[0];
const yearsExperience = Math.floor((toMonths(null) - toMonths(earliestStart) + 1) / 12);

const releasedCount = projects.minecraft.filter(p => !p.comingSoon).length;
</script>

<style scoped>
.page {
    --muted: #6b7280;
    --line: #e5e7eb;
    --head-height: 2rem;
    --card-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);

    max-width: 1100px;
    margin: 0 auto;
    padding: 2rem 2rem 4rem;
    font-family: 'Inter', sans-serif;
    color: var(--text-color);
    box-sizing: border-box;
}

.page *,
.page *::before,
.page *::after {
    box-sizing: border-box;
}

.back-button {
    display: inline-block;
    padding: 0.5rem 0;
    font-size: 1rem;
    color: #666;
    text-decoration: none;
    transition: color 0.2s;
}

.back-button:hover {
    color: #000;
}

/* Intro */

.intro {
    margin: 1.5rem 0 2rem;
}

.eyebrow {
    margin: 0 0 0.5rem;
    font-size: 0.85rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--accent-color);
}

h1 {
    margin: 0 0 0.75rem;
    font-size: 2.5rem;
    line-height: 1.15;
    color: var(--text-color);
}

.summary {
    max-width: 60ch;
    margin: 0;
    font-size: 1.15rem;
    line-height: 1.6;
    color: #444;
}

/* At a glance */

.stats {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1rem;
    margin-bottom: 3rem;
}

.stat {
    display: flex;
    flex-direction: column;
    gap: 0.15rem;
    padding: 1.25rem;
    background: white;
    border-radius: 1rem;
    box-shadow: var(--card-shadow);
    border-top: 3px solid var(--accent-color);
}

.stat-label {
    font-size: 0.75rem;
    font-weight: 600;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    color: var(--muted);
}

.stat-value {
    font-size: 1.5rem;
    font-weight: 700;
    line-height: 1.25;
    color: var(--text-color);
}

.stat-sub {
    font-size: 0.9rem;
    color: #555;
}

/* Layout */

.columns {
    display: grid;
    grid-template-columns: minmax(0, 1.6fr) minmax(0, 1fr);
    gap: 3rem;
    align-items: start;
}

h2 {
    margin: 0 0 1.25rem;
    font-size: 1.5rem;
    color: var(--text-color);
}

h3,
h4 {
    margin: 0;
    color: var(--text-color);
}

h3 a {
    color: inherit;
    text-decoration: none;
}

h3 a:hover {
    color: var(--accent-color);
}

.ext {
    font-size: 0.8em;
    line-height: 1;
    color: var(--muted);
}

.dates {
    font-size: 0.875rem;
    color: var(--muted);
    font-variant-numeric: tabular-nums;
}

.pill {
    display: inline-block;
    padding: 0.1rem 0.6rem;
    border-radius: 999px;
    font-size: 0.7rem;
    font-weight: 700;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    background: rgba(255, 51, 102, 0.12);
    color: #c81e4a;
}

/* Work timeline */

.timeline {
    list-style: none;
    margin: 0;
    padding: 0;
}

.company {
    position: relative;
    padding: 0 0 2rem 2rem;
}

/* Vertical rail connecting each company */
.company::before {
    content: '';
    position: absolute;
    left: 6px;
    top: 0.6rem;
    bottom: -0.6rem;
    width: 2px;
    background: var(--line);
}

.company:last-child::before {
    display: none;
}

.marker {
    position: absolute;
    left: 0;
    top: 0.35rem;
    width: 14px;
    height: 14px;
    border-radius: 50%;
    background: white;
    border: 2px solid #c4c9d0;
}

.company.current .marker {
    background: var(--accent-color);
    border-color: var(--accent-color);
    box-shadow: 0 0 0 4px rgba(255, 51, 102, 0.18);
}

.company-head {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    gap: 0.25rem 1rem;
    min-height: var(--head-height);
    margin-bottom: 0.75rem;
}

.company-head h3 {
    font-size: 1.25rem;
    line-height: var(--head-height);
}

.roles {
    list-style: none;
    margin: 0;
    padding: 0;
}

.role {
    padding: 1rem 1.25rem;
    background: white;
    border-radius: 0.75rem;
    box-shadow: var(--card-shadow);
    border-left: 3px solid var(--line);
}

.role.current {
    border-left-color: var(--accent-color);
}

.role+.role {
    margin-top: 0.75rem;
}

.role-head {
    display: flex;
    align-items: center;
    gap: 0.6rem;
}

/* Shared with .edu-card h3 so card titles line up across columns */
.role-head h4,
.edu-card h3 {
    font-size: 1.05rem;
    line-height: 1.35;
}

.role p {
    margin: 0.4rem 0 0;
    font-size: 0.95rem;
    line-height: 1.55;
    color: #444;
}

/* Education & certifications */

.side section+section {
    margin-top: 2.5rem;
}

.edu-card {
    padding: 1rem 1.25rem;
    background: white;
    border-radius: 0.75rem;
    box-shadow: var(--card-shadow);
    border-left: 3px solid var(--line);
}

/* Same height as .company-head so the first cards in each column line up */
.edu-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.5rem;
    min-height: var(--head-height);
    margin-bottom: 0.75rem;
}

.edu-entry+.edu-entry {
    margin-top: 1.25rem;
}

.edu-card.highest {
    border-left-color: var(--accent-color);
}

.edu-level {
    font-size: 0.8rem;
    font-weight: 600;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    color: var(--muted);
}

.meta {
    margin: 0.35rem 0 0;
    font-size: 0.875rem;
    color: var(--muted);
}

/* CTA */

.cta {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    margin-top: 3rem;
    padding-top: 2rem;
    border-top: 1px solid var(--line);
}

.cta p {
    margin: 0;
    font-size: 1.05rem;
    color: #444;
}

.btn {
    padding: 0.8rem 2rem;
    background: var(--accent-color);
    color: white;
    border-radius: 5px;
    font-size: 1rem;
    text-decoration: none;
    transition: transform 0.3s ease;
}

.btn:hover {
    transform: translateY(-3px);
}

@media (max-width: 960px) {
    .stats {
        grid-template-columns: repeat(2, 1fr);
    }

    .columns {
        grid-template-columns: 1fr;
    }
}

@media (max-width: 480px) {
    .page {
        padding: 1rem 1rem 3rem;
    }

    h1 {
        font-size: 1.85rem;
    }

    .summary {
        font-size: 1rem;
    }

    .stats {
        gap: 0.75rem;
    }

    .stat {
        padding: 1rem;
    }

    .stat-value {
        font-size: 1.2rem;
    }

    .company {
        padding-left: 1.5rem;
    }

    .role,
    .edu-card {
        padding: 0.85rem 1rem;
    }
}
</style>
