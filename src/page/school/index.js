import { loadMarkdown } from '@services/markdown';

export default [
    {
        path: '/school/knotsapp',
        name: 'KnotsApp',
        component: () => loadMarkdown('school/knotsapp')
    }
]