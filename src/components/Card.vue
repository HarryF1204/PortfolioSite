<template>
    <div class="card">
        <div class="type">
            <slot name="type" />
        </div>
        <div class="preview">
            <slot name="image" />
        </div>
        <div class="card-content">
            <section class="title-section">
                <div class="title">
                    <slot name="title" />
                </div>
            </section>
            <section class="description-section">
                <div class="description">
                    <slot name="description" />
                </div>
            </section>
            <section class="tags-section">
                <div class="tags">
                    <slot name="tags" />
                </div>
                <div class="toggle-tags" v-if="false" onclick="console.log('toggling tags')">+ Show More</div>
            </section>
            <section class="actions-section">
                <div class="actions">
                    <slot name="links" />
                </div>
            </section>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Card'
}
</script>

<style scoped>
.card {
    position: relative;
    display: flex;
    flex-direction: column;
    border-radius: 1rem;
    overflow: hidden;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    background-color: white;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
    width: 100%;
    height: 26rem;
}

.card:hover {
    transform: translateY(-4px);
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.15);
}

.type {
    position: absolute;
    top: 0.5rem;
    left: 0.5rem;
    background-color: rgba(0, 0, 0, 0.75);
    color: white;
    font-size: 0.75rem;
    font-weight: bold;
    padding: 0.25rem 0.5rem;
    border-radius: 0.25rem;
    z-index: 1;
    opacity: 0;
    transition: opacity 0.2s ease;
}

.card:hover .type {
    opacity: 1;
}

.preview {
    position: relative;
    width: 100%;
    padding-top: 56.25%;
    background-color: #eee;
    overflow: hidden;
}

.preview :deep(>*) {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.card-content {
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    flex: 1;
    padding-top: 0
}

.title-section {
    height: 2rem;
    margin-bottom: 1.5rem;
}

.description-section {
    height: 4.2rem;
    margin-bottom: 1rem;
}

.tags-section {
    height: 2.5rem;
    overflow: hidden;
}

.actions-section {
    margin-top: auto;
    height: 2.5rem;
}

.title {
    font-size: 1.25rem;
    font-weight: bold;
    color: #222;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;
    margin-bottom: 0.25rem;
}

.description {
    font-size: 0.95rem;
    color: #444;
    line-height: 1.4;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

.tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-top: 0.5rem;
}

.tags :deep(>*) {
    background-color: #f0f0f0;
    padding: 0.25rem 0.5rem;
    font-size: 0.75rem;
    border-radius: 0.25rem;
    color: #555;
}

.toggle-tags {
    font-size: 0.8rem;
    color: #007acc;
    cursor: pointer;
    margin-top: 0.25rem;
    align-self: flex-start;
}

.actions {
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
    margin-top: 0.75rem;
}

.actions :deep(>*) {
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
    font-size: 0.85rem;
    background-color: var(--accent-color);
    color: white;
    text-decoration: none;
    transition: background-color 0.2s ease;
}

.actions :deep(>*) :hover {
    background-color: #005fa3;
}
</style>
