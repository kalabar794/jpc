// tina/config.ts
import { defineConfig } from "tinacms";
var branch = process.env.NEXT_PUBLIC_TINA_BRANCH || process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF || process.env.HEAD || "main";
var config_default = defineConfig({
  branch,
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID || "local",
  token: process.env.TINA_TOKEN || "local",
  build: {
    outputFolder: "admin",
    publicFolder: "public"
  },
  // Local development mode
  ...{
    localContentPath: "./content"
  },
  media: {
    // Use local storage for now since we only have read-only tokens
    tina: {
      mediaRoot: "uploads",
      publicFolder: "public"
    }
  },
  schema: {
    collections: [
      // Projects Collection
      {
        name: "project",
        label: "Projects",
        path: "content/projects",
        ui: {
          allowedActions: {
            create: true,
            delete: true
          }
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "Project Title",
            required: true
          },
          {
            type: "string",
            name: "slug",
            label: "URL Slug",
            required: true,
            description: 'Used for the project URL (e.g., "ai-marketing-tool")'
          },
          {
            type: "datetime",
            name: "date",
            label: "Project Date",
            required: true
          },
          {
            type: "boolean",
            name: "featured",
            label: "Featured Project",
            description: "Show this project on the homepage"
          },
          {
            type: "string",
            name: "status",
            label: "Status",
            options: ["draft", "published", "archived"],
            required: true
          },
          {
            type: "string",
            name: "heroImage",
            label: "Hero Image URL",
            description: "Upload via /upload page or paste URL (recommended: 1200x800px)"
          },
          {
            type: "object",
            name: "gallery",
            label: "Image Gallery",
            list: true,
            fields: [
              {
                type: "string",
                name: "image",
                label: "Image URL",
                description: "Upload via /upload page or paste URL"
              },
              {
                type: "string",
                name: "alt",
                label: "Alt Text"
              },
              {
                type: "string",
                name: "caption",
                label: "Caption"
              }
            ]
          },
          {
            type: "string",
            name: "excerpt",
            label: "Short Description",
            description: "Brief description for project cards",
            ui: {
              component: "textarea"
            }
          },
          {
            type: "rich-text",
            name: "description",
            label: "Full Description",
            description: "Detailed project description",
            isBody: true
          },
          {
            type: "string",
            name: "techStack",
            label: "Technology Stack",
            list: true,
            description: "Technologies used in this project"
          },
          {
            type: "object",
            name: "metrics",
            label: "Project Metrics",
            fields: [
              {
                type: "string",
                name: "roi",
                label: "ROI Increase",
                description: 'e.g., "400%"'
              },
              {
                type: "string",
                name: "engagement",
                label: "Engagement Boost",
                description: 'e.g., "350%"'
              },
              {
                type: "string",
                name: "efficiency",
                label: "Efficiency Gain",
                description: 'e.g., "80%"'
              },
              {
                type: "string",
                name: "custom1Label",
                label: "Custom Metric 1 Label"
              },
              {
                type: "string",
                name: "custom1Value",
                label: "Custom Metric 1 Value"
              },
              {
                type: "string",
                name: "custom2Label",
                label: "Custom Metric 2 Label"
              },
              {
                type: "string",
                name: "custom2Value",
                label: "Custom Metric 2 Value"
              }
            ]
          },
          {
            type: "string",
            name: "projectUrl",
            label: "Live Project URL",
            description: "Link to the live project (optional)"
          },
          {
            type: "string",
            name: "githubUrl",
            label: "GitHub URL",
            description: "Link to the project repository (optional)"
          },
          {
            type: "string",
            name: "category",
            label: "Category",
            options: [
              { value: "ai-marketing", label: "AI Marketing" },
              { value: "automation", label: "Marketing Automation" },
              { value: "analytics", label: "Analytics & Data" },
              { value: "creative", label: "Creative & Design" },
              { value: "web-development", label: "Web Development" },
              { value: "other", label: "Other" }
            ],
            required: true
          },
          {
            type: "string",
            name: "color",
            label: "Brand Color",
            description: 'Tailwind gradient classes (e.g., "from-blue-500 to-purple-600")'
          }
        ]
      },
      // Blog Posts Collection
      {
        name: "post",
        label: "Blog Posts",
        path: "content/posts",
        ui: {
          allowedActions: {
            create: true,
            delete: true
          }
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "Post Title",
            required: true
          },
          {
            type: "string",
            name: "slug",
            label: "URL Slug",
            required: true,
            description: 'Used for the post URL (e.g., "future-of-ai-marketing")'
          },
          {
            type: "datetime",
            name: "date",
            label: "Publish Date",
            required: true
          },
          {
            type: "string",
            name: "status",
            label: "Status",
            options: ["draft", "published", "archived"],
            required: true
          },
          {
            type: "boolean",
            name: "featured",
            label: "Featured Post",
            description: "Show this post prominently"
          },
          {
            type: "string",
            name: "heroImage",
            label: "Featured Image URL",
            description: "Upload via /upload page or paste URL (recommended: 1200x630px)"
          },
          {
            type: "string",
            name: "excerpt",
            label: "Excerpt",
            description: "Brief description for post previews",
            ui: {
              component: "textarea"
            }
          },
          {
            type: "rich-text",
            name: "content",
            label: "Post Content",
            isBody: true
          },
          {
            type: "string",
            name: "tags",
            label: "Tags",
            list: true,
            description: "Topics covered in this post"
          },
          {
            type: "string",
            name: "category",
            label: "Category",
            options: [
              { value: "ai-marketing", label: "AI Marketing" },
              { value: "automation", label: "Marketing Automation" },
              { value: "case-studies", label: "Case Studies" },
              { value: "tutorials", label: "Tutorials" },
              { value: "industry-insights", label: "Industry Insights" },
              { value: "tools-reviews", label: "Tools & Reviews" }
            ],
            required: true
          },
          {
            type: "number",
            name: "readTime",
            label: "Read Time (minutes)",
            description: "Estimated reading time"
          },
          {
            type: "string",
            name: "author",
            label: "Author",
            description: "Post author name"
          },
          {
            type: "object",
            name: "seo",
            label: "SEO Settings",
            fields: [
              {
                type: "string",
                name: "title",
                label: "SEO Title",
                description: "Title for search engines (max 60 chars)"
              },
              {
                type: "string",
                name: "description",
                label: "Meta Description",
                description: "Description for search engines (max 160 chars)",
                ui: {
                  component: "textarea"
                }
              },
              {
                type: "string",
                name: "keywords",
                label: "Keywords",
                list: true,
                description: "SEO keywords for this post"
              }
            ]
          }
        ]
      },
      // Gallery Images Collection
      {
        name: "galleryImage",
        label: "Gallery Images",
        path: "content/gallery",
        ui: {
          allowedActions: {
            create: true,
            delete: true
          }
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "Image Title",
            required: true
          },
          {
            type: "string",
            name: "image",
            label: "Image URL",
            description: "Upload via /upload page or paste Cloudinary URL",
            required: true
          },
          {
            type: "string",
            name: "alt",
            label: "Alt Text",
            description: "Descriptive text for accessibility",
            required: true
          },
          {
            type: "string",
            name: "description",
            label: "Description",
            description: "Optional description or caption",
            ui: {
              component: "textarea"
            }
          },
          {
            type: "string",
            name: "category",
            label: "Category",
            options: [
              { value: "ai-generated", label: "AI Generated" },
              { value: "photography", label: "Photography" },
              { value: "landscape", label: "Landscape" },
              { value: "macro", label: "Macro" },
              { value: "travel", label: "Travel" },
              { value: "architecture", label: "Architecture" },
              { value: "portrait", label: "Portrait" },
              { value: "other", label: "Other" }
            ],
            required: true
          },
          {
            type: "string",
            name: "tool",
            label: "Creation Tool",
            description: "AI tool used or camera/equipment (optional)",
            options: [
              { value: "midjourney", label: "Midjourney" },
              { value: "dall-e", label: "DALL-E" },
              { value: "stable-diffusion", label: "Stable Diffusion" },
              { value: "leonardo", label: "Leonardo AI" },
              { value: "camera", label: "Camera/Photography" },
              { value: "other", label: "Other" }
            ]
          },
          {
            type: "datetime",
            name: "date",
            label: "Creation Date",
            required: true
          },
          {
            type: "string",
            name: "tags",
            label: "Tags",
            list: true,
            description: "Descriptive tags for this image"
          },
          {
            type: "boolean",
            name: "featured",
            label: "Featured Image",
            description: "Show this image prominently in galleries"
          }
        ]
      },
      // Site Settings Collection
      {
        name: "siteSettings",
        label: "Site Settings",
        path: "content/settings",
        ui: {
          allowedActions: {
            create: false,
            delete: false
          },
          global: true
        },
        fields: [
          {
            type: "object",
            name: "site",
            label: "Site Information",
            fields: [
              {
                type: "string",
                name: "title",
                label: "Site Title",
                required: true
              },
              {
                type: "string",
                name: "description",
                label: "Site Description",
                ui: {
                  component: "textarea"
                }
              },
              {
                type: "string",
                name: "author",
                label: "Author Name"
              },
              {
                type: "string",
                name: "email",
                label: "Contact Email"
              },
              {
                type: "image",
                name: "logo",
                label: "Site Logo"
              },
              {
                type: "image",
                name: "favicon",
                label: "Favicon"
              }
            ]
          },
          {
            type: "object",
            name: "social",
            label: "Social Media",
            fields: [
              {
                type: "string",
                name: "twitter",
                label: "Twitter URL"
              },
              {
                type: "string",
                name: "linkedin",
                label: "LinkedIn URL"
              },
              {
                type: "string",
                name: "github",
                label: "GitHub URL"
              },
              {
                type: "string",
                name: "instagram",
                label: "Instagram URL"
              }
            ]
          },
          {
            type: "object",
            name: "seo",
            label: "Default SEO",
            fields: [
              {
                type: "string",
                name: "defaultTitle",
                label: "Default Page Title"
              },
              {
                type: "string",
                name: "defaultDescription",
                label: "Default Meta Description",
                ui: {
                  component: "textarea"
                }
              },
              {
                type: "image",
                name: "defaultImage",
                label: "Default Social Share Image"
              }
            ]
          }
        ]
      }
    ]
  }
});
export {
  config_default as default
};
