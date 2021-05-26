import fs from "fs";
import { join } from "path";
import matter from "gray-matter";

const postsDirectory = join(process.cwd(), "_posts");

export function getBlogSlugs() {
    return fs.readdirSync(postsDirectory)
};

export function getBlogBySlug(slug, fields = []){
    const realSlug = slug.replace(/\.md$/, "");
    const fullPath = join(postsDirectory, `${realSlug}.md`);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);
  
    const items = {};
  
    // Ensure only the minimal needed data is exposed
    fields.forEach((field) => {
      if (field === "slug") {
        items[field] = realSlug;
      }
      if (field === "content") {
        items[field] = content;
      }
  
      if (data[field]) {
        items[field] = data[field];
      }
    });
  
    return items;
}

export function getAllBlogs(fields = []){
    const slugs = getBlogSlugs();
    const blogs = slugs.map(
        (slug) => getBlogBySlug(slug, fields));
    return blogs;
}