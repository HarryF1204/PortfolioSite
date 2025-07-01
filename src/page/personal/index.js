import MarkdownWrapper from '@/components/MarkdownWrapper.vue'

export default [
    {
        path: '/personal',
        component: MarkdownWrapper,
        children: [
            {
                path: 'bedrock_micro_addons',
                name: 'Bedrock Micro Addons',
                component: () => import('./bedrock_micro_addons.md')
            },
            {
                path: 'knotsapp',
                name: 'Knotsapp',
                component: () => import('./knotsapp.md')
            }
        ]
    }
]