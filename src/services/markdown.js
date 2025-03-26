import { marked } from 'marked';
import { h } from 'vue';
import MarkdownWrapper from '@components/MarkdownWrapper.vue';

const markdownModules = import.meta.glob('../page/**/*.md', { query: '?raw', import: 'default' });

export async function loadMarkdown(path) {
    const fullPath = `../page/${path}.md`;
    const importFn = markdownModules[fullPath];

    if (!importFn) {
        throw new Error(`Markdown file ${path} not found`);
    }

    const content = await importFn();
    return {
        setup() {
            return () => h(MarkdownWrapper, { content });
        }
    };
}

export function parseMarkdown(content) {
    return marked.parse(content || '');
}
