// Credits to Divyansh Singh
// Twitter: @_brc_dd

import fs from 'node:fs/promises';
import matter from 'gray-matter';
import removeMd from 'remove-markdown';

const articles = await fs.readdir('./articles');

const data = await Promise.all(
    articles.map(async (article) => {
        const file = matter.read(`./articles/${article}`, {
            excerpt: true,
            excerpt_separator: `

`,
        });
        const { data, excerpt, path } = file;
        const contents = removeMd(excerpt)
            .trim()
            .split(/\r\n|\n|\r/);
        return {
            ...data,
            title: contents[0].replace(/\s{2,}/g, '').trim(),
            path: path.replace('/docs/', '').replace(/\.md$/, '.html'),
            excerpt: contents
                .slice(1)
                .join('')
                .replace(/\s{2,}/g, '')
                .trim(),
        };
    })
);
await fs.writeFile('./src/data.json', JSON.stringify(data), 'utf-8');