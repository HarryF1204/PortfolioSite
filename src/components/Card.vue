<template>
    <div class="card-wrapper">
        <div class="card-content">
            <slot name="title"></slot>
            <div class="tags-container">
                <slot name="tags"></slot>
            </div>
            <slot name="content"></slot>
            <slot name="links"></slot>
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
    width: 100%;
    box-sizing: border-box;
    max-width: 37.5rem;
    margin: 0 auto;
    padding: 1.5rem;
}

.card-wrapper {
    width: 21rem;
    min-width: auto;
    max-width: none;
    padding: 0;
    border: 1px solid #ddd;
    border-radius: 5px;
    background-color: white;
    overflow: hidden;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card-wrapper:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.tags-container {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin: 0.5rem 0;
    width: 100%;
    box-sizing: border-box;
}
</style>
