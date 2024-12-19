import { defineConfig } from "tinacms";

const branch =
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main";

//const defaultLocale = "en"

// tina/config.ts
export default defineConfig({
  branch,
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
  token: process.env.TINA_TOKEN,

  build: {
    outputFolder: "admin",
    publicFolder: "public",
    basePath: "admin" 
  },


  media: {
    tina: {
      mediaRoot: "",
      publicFolder: "public",
    },
  },
  schema: {
    collections: [
      {
        name: "post",
        label: "Posts",
        path: "content/posts",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
          },
        ],
        ui: {
          // 修改路由以支持语言前缀
          router: ({ document }) => {
            const lang = document._sys.relativePath.split('/')[0]
            return `/${lang}/demo/blog/${document._sys.filename}`
          },
          // 添加文件名模式以强制遵循语言目录结构
          filename: {
            readonly: false,
            slugify: (values) => {
              const lang = values?.lang || 'en'
              return `${lang}/${values?.title?.toLowerCase().replace(/ /g, '-')}`
            },
          },
        },
      },
    ],
  },
});

