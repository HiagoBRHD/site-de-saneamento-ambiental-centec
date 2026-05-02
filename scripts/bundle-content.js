import fs from 'fs';
import path from 'path';

const subjectsDir = 'public/subjects';
const indexPath = 'src/data/curriculum/index.ts';

const files = fs.readdirSync(subjectsDir).filter(f => f.endsWith('.md'));

const markdownData = {};

files.forEach(file => {
  const id = file.replace('.md', '');
  const content = fs.readFileSync(path.join(subjectsDir, file), 'utf-8');
  // Strip frontmatter
  const cleanContent = content.replace(/^---[\s\S]+?---/, '').trim();
  markdownData[id] = cleanContent;
});

let indexContent = fs.readFileSync(indexPath, 'utf-8');

// Add the bundled content to the index file
const bundleString = `\nexport const bundledContent: Record<string, string> = ${JSON.stringify(markdownData, null, 2)};\n`;

// Append or replace
if (indexContent.includes('export const bundledContent')) {
  indexContent = indexContent.replace(/export const bundledContent[\s\S]+?};/, bundleString.trim());
} else {
  indexContent += bundleString;
}

fs.writeFileSync(indexPath, indexContent);
console.log('Bundled 42 markdown files into index.ts');
