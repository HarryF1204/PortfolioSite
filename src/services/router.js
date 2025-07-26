import { createRouter, createWebHashHistory } from 'vue-router'
import Index from '../page/index.vue';

import marketplaceRoutes from '../page/marketplace/index';
import personalRoutes from '../page/personal/index';
import toolRoutes from '../page/personal/index';
import Experience from '../page/experiences.vue';

const routes = [
    ...marketplaceRoutes,
    ...personalRoutes,
    ...toolRoutes,
    {
        path: '/',
        name: 'Index',
        component: Index
    },
    {
        path: '/experience',
        name: 'Experience',
        component: Experience
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router