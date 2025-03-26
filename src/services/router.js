import { createRouter, createWebHashHistory } from 'vue-router'
import Index from '../page/index.vue';

import marketplaceRoutes from '../page/marketplace/index';
import personalRoutes from '../page/personal/index';
import toolRoutes from '../page/personal/index';
import schoolRoutes from '../page/school/index';

const routes = [
    ...marketplaceRoutes,
    ...personalRoutes,
    ...toolRoutes,
    ...schoolRoutes,
    {
        path: '/',
        name: 'Index',
        component: Index
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router