<template>
    <Card class="show-more-card" @click="$emit('loadMore')">
        <template v-slot:content>
            <div class="show-more-content">
                <div class="center-content">
                    <span class="plus">+</span>
                    <p>Show More</p>
                </div>
            </div>
        </template>
    </Card>
</template>

<script setup>
import Card from '@/components/Card.vue';
</script>

<style scoped>
.show-more-content {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    min-height: 12.5rem;
}

.center-content {
    text-align: center;
}

.plus {
    font-size: 2.5rem;
    margin-bottom: 0.5rem;
    color: #666;
    display: block;
}

@media (max-width: 480px) {
    .show-more-content {
        min-height: 5rem;
    }

    :deep(.content-container) {
        max-height: none !important;
        overflow: hidden !important;
    }
}
</style>
