#!/usr/bin/env node

/**
 * TinaCMS + Cloudinary Setup Script
 * This script helps configure the portfolio with visual content management
 */

const fs = require('fs')
const path = require('path')
const readline = require('readline')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

const question = (query) => new Promise((resolve) => rl.question(query, resolve))

async function setupCMS() {
  console.log('\n🎨 Portfolio CMS Setup\n')
  console.log('This script will help you configure TinaCMS and Cloudinary for your portfolio.\n')

  // TinaCMS Setup
  console.log('📝 TinaCMS Configuration')
  console.log('1. Visit https://app.tina.io and create a free account')
  console.log('2. Create a new project')
  console.log('3. Copy your credentials from the dashboard\n')

  const tinaClientId = await question('Enter your TinaCMS Client ID: ')
  const tinaToken = await question('Enter your TinaCMS Token: ')

  // Cloudinary Setup
  console.log('\n📸 Cloudinary Configuration (Optional)')
  console.log('1. Visit https://cloudinary.com and create a free account')
  console.log('2. Get your cloud name, API key, and API secret from the dashboard')
  console.log('3. Leave blank to skip Cloudinary setup\n')

  const cloudName = await question('Enter your Cloudinary Cloud Name (or press Enter to skip): ')
  let cloudApiKey = ''
  let cloudApiSecret = ''

  if (cloudName) {
    cloudApiKey = await question('Enter your Cloudinary API Key: ')
    cloudApiSecret = await question('Enter your Cloudinary API Secret: ')
  }

  // Update .env.local
  const envPath = path.join(process.cwd(), '.env.local')
  let envContent = ''

  if (fs.existsSync(envPath)) {
    envContent = fs.readFileSync(envPath, 'utf8')
  }

  // Update TinaCMS variables
  envContent = updateEnvVariable(envContent, 'NEXT_PUBLIC_TINA_CLIENT_ID', tinaClientId)
  envContent = updateEnvVariable(envContent, 'TINA_TOKEN', tinaToken)
  envContent = updateEnvVariable(envContent, 'NEXT_PUBLIC_TINA_BRANCH', 'main')

  // Update Cloudinary variables if provided
  if (cloudName) {
    envContent = updateEnvVariable(envContent, 'NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME', cloudName)
    envContent = updateEnvVariable(envContent, 'CLOUDINARY_API_KEY', cloudApiKey)
    envContent = updateEnvVariable(envContent, 'CLOUDINARY_API_SECRET', cloudApiSecret)
  }

  fs.writeFileSync(envPath, envContent)

  console.log('\n✅ Environment variables updated!')

  // Build TinaCMS
  console.log('\n🔨 Building TinaCMS...')
  const { spawn } = require('child_process')
  
  const build = spawn('npm', ['run', 'tina:build'], { stdio: 'inherit' })
  
  build.on('close', (code) => {
    if (code === 0) {
      console.log('\n🎉 Setup complete!')
      console.log('\nNext steps:')
      console.log('1. Restart your development server: npm run dev')
      console.log('2. Visit http://localhost:3000/admin to access the CMS')
      console.log('3. Start editing your content!')

      if (cloudName) {
        console.log('\n📸 Cloudinary is configured!')
        console.log('- Images will be automatically optimized')
        console.log('- Use the TinaCMS media manager to upload images')
      }
    } else {
      console.log('\n❌ Build failed. Check the error messages above.')
    }
    
    rl.close()
  })
}

function updateEnvVariable(content, key, value) {
  const regex = new RegExp(`^${key}=.*$`, 'm')
  const newLine = `${key}=${value}`
  
  if (regex.test(content)) {
    return content.replace(regex, newLine)
  } else {
    return content + (content.endsWith('\n') ? '' : '\n') + newLine + '\n'
  }
}

// Run the setup
setupCMS().catch(console.error)