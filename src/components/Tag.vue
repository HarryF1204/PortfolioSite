<template>
    <span class="tag">
        <slot></slot>
    </span>
</template>

<script setup>
</script>

<style scoped>
.tag {
    display: inline-block;
    max-width: 100%;
    box-sizing: border-box;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin: 0.1rem;
    background-color: #f0f0f0;
    color: #333;
    padding: 0.2rem 0.8rem;
    border-radius: 15px;
    font-size: 0.8rem;
}
</style>