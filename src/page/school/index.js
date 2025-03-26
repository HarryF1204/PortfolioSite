import MarkdownWrapper from '../../components/MarkdownWrapper.vue'

export default [
    {
        path: '/school',
        component: MarkdownWrapper,
        children: [
            {
                path: 'knotsapp',
                name: 'KnotsApp',
                component: () => import('./knotsapp.md')
            }
        ]
    }
]