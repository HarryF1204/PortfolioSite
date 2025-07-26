<template>
    <button class="show-more-button" @click="$emit('loadMore')">
        <span class="plus">+</span>
        <span class="text">Show More</span>
    </button>
</template>

<script setup>
</script>

<style scoped>
.show-more-button {
    width: 100%;
    padding: 1rem;
    background: none;
    border: 2px dashed #666;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s ease;
}

.show-more-button:hover {
    background: rgba(102, 102, 102, 0.1);
}

.plus {
    font-size: 2.5rem;
    color: #666;
    display: block;
    margin-bottom: 0.5rem;
}

.text {
    color: #666;
}

@media (max-width: 480px) {
    .show-more-button {
        padding: 0.5rem;
    }
}
</style>
