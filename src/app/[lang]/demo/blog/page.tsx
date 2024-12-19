import client from '../../../../../tina/__generated__/client'
import I18nLink from '@/components/i18n/I18nLink'
import { getI18nInstance } from '@/i18n'
import { t } from '@lingui/macro'
import { setI18n } from '@lingui/react/server'
import { Metadata } from 'next'

interface Props {
  params: {
    lang: string
  }
}

export function generateMetadata({ params }: { params: { lang: string } }): Metadata {
  const i18n = getI18nInstance(params.lang)

  return {
    title: t(i18n)`Blog Posts`,
    description: t(i18n)`Blog post list`,
  }
}
// src/app/[lang]/demo/blog/page.tsx
export default async function BlogList({ params: { lang } }: Props) {
  const i18n = getI18nInstance(lang)
  setI18n(i18n)

  try {
    const response = await client.queries.postConnection()
    
    // 只获取当前语言的文章
    const posts = response.data.postConnection.edges?.filter(
      post => post?.node?._sys.relativePath.startsWith(`${lang}/`)
    )

    if (!posts?.length) {
      return (
        <div className="max-w-4xl mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-8">
            Blog Posts
          </h1>
          <p>No posts found</p>
        </div>
      )
    }

    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">
          {t(i18n)`Blog Posts`}
        </h1>
        
        <div className="space-y-6">
          {posts.map((post) => (
            <article 
              key={post?.node?._sys.filename} 
              className="p-6 bg-white rounded-lg shadow-sm border"
            >
              <h2 className="text-xl font-semibold">
                <I18nLink 
                  href={`/demo/blog/${post?.node?._sys.filename}`}
                  lang={lang}
                  className="hover:text-blue-600"
                >
                  {post?.node?.title}
                </I18nLink>
              </h2>
            </article>
          ))}
        </div>
      </div>
    )
  } catch (error) {
    console.error('Error loading posts:', error)
    return <div>{t(i18n)`Error loading posts`}</div>
  }
}
