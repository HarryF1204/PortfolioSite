<template>
    <div class="card-wrapper">
        <div class="card-content">
            <div class="title-section">
                <slot name="title"></slot>
            </div>
            <div class="tags-container">
                <slot name="tags"></slot>
            </div>
            <div class="content-container">
                <slot name="content"></slot>
            </div>
            <div class="links-container">
                <slot name="links"></slot>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Card'
}
</script>

<style scoped>
.card-content {
    display: grid;
    grid-template-rows: auto auto 1fr auto;
    height: 100%;
    padding: 1.5rem;
    box-sizing: border-box;
    gap: 0.75rem;
}

.title-section {
    min-height: 2.5rem;
}

.title-section h2 {
    margin: 0;
}

.tags-container,
.content-container,
.links-container {
    width: 100%;
}

.card-wrapper {
    width: 100%;
    min-width: auto;
    max-width: none;
    padding: 0;
    border: 1px solid #ddd;
    border-radius: 5px;
    background-color: white;
    margin-top: 5px;
    margin-bottom: 5px;
    transition: margin 0.3s ease, box-shadow 0.3s ease;
}

.card-wrapper:hover {
    margin-top: 0;
    margin-bottom: 10px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.tags-container {
    min-height: 2rem;
    flex-shrink: 0;
}

.content-container {
    height: 100%;
    overflow-y: auto;
    margin: 0;
}

.links-container {
    min-height: 1.5rem;
    margin: 0;
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
}

.content-container p {
    margin: 0;
}

@media (max-width: 768px) {
    .card-content {
        padding: 1.25rem;
        gap: 0.5rem;
    }

    .title-section h2 {
        font-size: 1.25rem;
    }

    .content-container {
        font-size: 0.95rem;
    }

    .tags-container {
        min-height: 1.75rem;
    }
}

@media (max-width: 480px) {
    .card-content {
        padding: 0.75rem;
        gap: 0.25rem;
    }

    .title-section {
        min-height: 1.75rem;
    }

    .tags-container {
        min-height: 1.5rem;
    }

    .content-container {
        max-height: 6.5rem;
        overflow-y: auto;
    }

    .card-wrapper {
        margin-top: 3px;
        margin-bottom: 3px;
    }

    .card-wrapper:hover {
        margin-top: 0;
        margin-bottom: 6px;
    }

    .links-container {
        gap: 0.75rem;
    }
}
</style>
