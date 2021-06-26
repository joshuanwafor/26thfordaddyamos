import Link from '@/components/Link'
import { PageSeo } from '@/components/SEO'
import siteMetadata from '@/data/siteMetadata'
import { getAllFilesFrontMatter } from '@/lib/mdx'
import { MiniTweets } from '../components/realtitme'
import Image from 'next/image'

const MAX_DISPLAY = 5
const postDateTemplate = { year: 'numeric', month: 'long', day: 'numeric' }

export async function getStaticProps() {
  const posts = await getAllFilesFrontMatter('blog')
  return { props: { posts } }
}

export default function Home({ posts }) {
  return (
    <>
      <PageSeo
        title={siteMetadata.title}
        description={siteMetadata.description}
        url={siteMetadata.siteUrl}
      />
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="flex flex-col-reverse md:flex-row items-center  ">
          <div className="pt-6 pb-8 space-y-2 md:space-y-5 pr-10">
            <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
              Birthay wishes & prayers
            </h1>
            <p className="text-lg leading-7 text-gray-500 dark:text-gray-400 mb-4">
              May God fill your life with a brighter smile and more joy than ever. Happy birthday
              daddy. We love you.
            </p>
            <Link href="https://drive.google.com/drive/folders/1--EEXTMlIeAAMdioTKmosJT_aosPCB2t?usp=sharing">
              Find Media files...
            </Link>
          </div>
          <div className="w-12/12 md:w-6/12">
            <Image
              alt={'title'}
              src={'/static/images/download.jpeg'}
              className="lg:h-48 md:h-36 object-cover object-center rounded-xl shadow-xl overflow-hidden"
              width={544}
              height={544}
            />
          </div>
        </div>

        <div>
          <MiniTweets />
        </div>
      </div>
    </>
  )
}
