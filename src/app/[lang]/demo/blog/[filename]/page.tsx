import client from '../../../../../../tina/__generated__/client'
import { TinaMarkdown } from 'tinacms/dist/rich-text'
import { notFound } from 'next/navigation'
import I18nLink from '@/components/i18n/I18nLink'
import { getI18nInstance } from '@/i18n'
import { t } from '@lingui/macro'
import { setI18n } from '@lingui/react/server'
import { Metadata } from 'next'

interface Props {
  params: {
    filename: string
    lang: string
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const i18n = getI18nInstance(params.lang)
  
  try {
    const response = await client.queries.post({
      relativePath: `${params.lang}/${params.filename}.md`,
    })
    
    return {
      title: response.data.post.title,
      description: t(i18n)`Blog post: ${response.data.post.title}`,
    }
  } catch {
    return {
      title: t(i18n)`Post Not Found`,
    }
  }
}

export default async function BlogPost({ params: { filename, lang } }: Props) {
  const i18n = getI18nInstance(lang)
  setI18n(i18n)

  try {
    const response = await client.queries.post({
      relativePath: `${lang}/${filename}.md`,
    })
    
    const post = response.data.post

    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <I18nLink 
          href="/demo/blog"
          lang={lang}
          className="text-blue-600 hover:underline mb-8 inline-block"
        >
          {t(i18n)`← Back to List`}
        </I18nLink>

        <article className="prose lg:prose-xl">
          <h1>{post.title}</h1>
          <TinaMarkdown content={post.body} />
        </article>
      </div>
    )
  } catch {
    notFound()
  }
}

export async function generateStaticParams() {
  const languages = ['en', 'zh']
  const response = await client.queries.postConnection()
  const posts = response.data.postConnection.edges

  const params = []
  
  for (const lang of languages) {
    const langParams = posts?.map((post) => ({
      filename: post?.node?._sys.filename,
      lang,
    })) || []
    params.push(...langParams)
  }

  return params
}
