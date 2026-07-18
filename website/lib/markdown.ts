import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const contentDirectory = path.join(process.cwd(), 'content');

export interface MarkdownPost {
  slug: string;
  title: string;
  content: string;
  originalFileName: string;
}

export function getAllPosts(): MarkdownPost[] {
  if (!fs.existsSync(contentDirectory)) return [];

  const fileNames = fs.readdirSync(contentDirectory);
  const allPostsData = fileNames
    .filter(fileName => fileName.endsWith('.md') && !fileName.startsWith('@') && !fileName.startsWith('!'))
    .map(fileName => {
      // Remove ".md" from file name to get id
      // Also remove prefix numbers like "14. "
      let rawName = fileName.replace(/\.md$/, '');
      const prefixMatch = rawName.match(/^\d+[a-zA-Z]*\.\s*(.*)/);
      if (prefixMatch) {
        rawName = prefixMatch[1];
      }
      
      const slug = rawName
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');

      // Read markdown file as string
      const fullPath = path.join(contentDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');

      // Use gray-matter to parse the post metadata section
      // Even if there is no frontmatter, it parses the content correctly
      const matterResult = matter(fileContents);
      
      // If no title in frontmatter, extract the first line as title
      let title = matterResult.data.title;
      let content = matterResult.content;
      
      if (!title) {
        const lines = content.split('\n');
        title = lines[0]?.trim() || rawName;
        // Optionally remove the first line if it is just a title
        // if (lines[0] === title) {
        //   content = lines.slice(1).join('\n');
        // }
      }

      return {
        slug,
        title,
        content,
        originalFileName: fileName,
        ...matterResult.data,
      };
    });

  return allPostsData;
}

export function getPostBySlug(slug: string): MarkdownPost | undefined {
  const posts = getAllPosts();
  return posts.find(post => post.slug === slug);
}
