import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import chalk from 'chalk';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataFile = path.join(__dirname, 'data/deep-analysis/latest.json');

try {
  const data = await fs.readFile(dataFile, 'utf8');
  const analysis = JSON.parse(data);
  
  console.log(chalk.bold.cyan('\n📊 WEO Competitor Analysis Summary\n'));
  
  // Blog Activity
  console.log(chalk.bold.yellow('📝 Blog Activity:'));
  for (const [id, comp] of Object.entries(analysis)) {
    if (comp.metrics) {
      const blogData = comp.metrics?.blogs || {};
      console.log(`  ${chalk.white(comp.name)}: ${chalk.green(blogData.totalPosts || 0)} posts - ${chalk.cyan(blogData.postingFrequency || 'Unknown')} frequency`);
      if (blogData.lastPostDate) {
        console.log(chalk.gray(`     Last post: ${new Date(blogData.lastPostDate).toLocaleDateString()}`));
      }
    }
  }
  
  // Pricing
  console.log(chalk.bold.yellow('\n💰 Pricing Models:'));
  for (const [id, comp] of Object.entries(analysis)) {
    if (comp.metrics) {
      const pricingData = comp.metrics?.pricing || {};
      console.log(`  ${chalk.white(comp.name)}: ${chalk.green(pricingData.pricingModel || 'Unknown')} - Starting at ${chalk.cyan(pricingData.startingPrice || 'Not Listed')}`);
    }
  }
  
  // Social Media
  console.log(chalk.bold.yellow('\n📱 Social Media Presence:'));
  for (const [id, comp] of Object.entries(analysis)) {
    if (comp.metrics) {
      const socialData = comp.metrics?.social || {};
      const channels = socialData.activeChannels || [];
      console.log(`  ${chalk.white(comp.name)}: ${chalk.green(channels.length)} channels - ${chalk.cyan(socialData.engagementLevel || 'Unknown')} engagement`);
      if (channels.length > 0) {
        console.log(chalk.gray(`     Platforms: ${channels.join(', ')}`));
      }
    }
  }
  
  // Content Types
  console.log(chalk.bold.yellow('\n📚 Content Strategy:'));
  for (const [id, comp] of Object.entries(analysis)) {
    if (comp.metrics) {
      const contentData = comp.metrics?.content || {};
      const types = contentData.contentTypes || [];
      console.log(`  ${chalk.white(comp.name)}: ${chalk.green(types.length)} content types`);
      if (types.length > 0) {
        console.log(chalk.gray(`     Types: ${types.join(', ')}`));
      }
    }
  }
  
  // Key Insights
  console.log(chalk.bold.cyan('\n🎯 Key Insights:\n'));
  
  // Most active bloggers
  const bloggers = Object.entries(analysis)
    .filter(([id, comp]) => comp.metrics)
    .map(([id, comp]) => ({ name: comp.name, posts: comp.metrics?.blogs?.totalPosts || 0 }))
    .sort((a, b) => b.posts - a.posts)
    .slice(0, 3);
  
  console.log(chalk.bold('Top Content Producers:'));
  bloggers.forEach((b, i) => {
    console.log(`  ${i + 1}. ${b.name}: ${b.posts} blog posts`);
  });
  
  // Most social
  const social = Object.entries(analysis)
    .filter(([id, comp]) => comp.metrics)
    .map(([id, comp]) => ({ name: comp.name, channels: comp.metrics?.social?.activeChannels?.length || 0 }))
    .sort((a, b) => b.channels - a.channels)
    .slice(0, 3);
  
  console.log(chalk.bold('\nMost Social Media Active:'));
  social.forEach((s, i) => {
    console.log(`  ${i + 1}. ${s.name}: ${s.channels} channels`);
  });
  
  // Dental focus
  const dentalFocused = Object.entries(analysis)
    .filter(([id, comp]) => comp.metrics?.services?.dentalFocus)
    .map(([id, comp]) => comp.name);
  
  console.log(chalk.bold('\nDental-Focused Competitors:'));
  if (dentalFocused.length > 0) {
    dentalFocused.forEach(name => {
      console.log(`  ✓ ${name}`);
    });
  } else {
    console.log(chalk.gray('  No specific dental focus detected'));
  }
  
  // Technology used
  console.log(chalk.bold('\n🔧 Technology Stack:'));
  for (const [id, comp] of Object.entries(analysis)) {
    if (comp.metrics?.technology?.cms) {
      console.log(`  ${chalk.white(comp.name)}: ${chalk.cyan(comp.metrics.technology.cms)} CMS`);
    }
  }
  
  console.log(chalk.green('\n✨ View full analysis at: ') + chalk.bold.cyan('http://localhost:3456/matrix\n'));
  
} catch (error) {
  console.error(chalk.red('❌ Could not load analysis data:'), error.message);
  console.error(chalk.yellow('Run the analysis first with: node run-deep-analysis.js'));
}