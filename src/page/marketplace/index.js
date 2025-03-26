import MarkdownWrapper from '../../components/MarkdownWrapper.vue'

export default [
    {
        path: '/marketplace',
        component: MarkdownWrapper,
        children: [
            {
                path: 'more_enchantment_addon',
                name: 'More Enchantments Addon',
                component: () => import('./more_enchantment_addon.md')
            },
            {
                path: 'theia_dimension',
                name: 'Theia Dimension',
                component: () => import('./theia_dimension.md')
            }
        ]
    }
]