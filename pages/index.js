import { useState } from 'react'
import toast from 'react-hot-toast'
import { firestore, fromMillis, postToJSON } from '../lib/firebase'
import PostFeed from '../components/PostFeed'
import Loader from '../components/Loader'

const LIMIT = 1

export async function getServerSideProps(context) {
  const postsQuery = await firestore
    .collectionGroup('posts')
    .where('published', '==', true)
    .orderBy('createdAt', 'desc')
    .limit(LIMIT)

  const posts = (await postsQuery.get()).docs.map(postToJSON);

  if (!posts.length) {
    return {
      props: { posts: [] }
    }
  }

  return {
    props: { posts }
  }
}

export default function Home(props) {
  const [posts, setPosts] = useState(props.posts)
  const [loading, setLoading] = useState(false)

  const [postsEnd, setPostsEnd] = useState(props.posts.length < LIMIT)

  const getMorePosts = async () => {
    setLoading(true)

    const last = posts[posts.length - 1]

    const cursor = typeof last.createdAt === 'number' ? fromMillis(last.createdAt) : last.createdAt

    const query = firestore
      .collectionGroup('posts')
      .where('published', '==', true)
      .orderBy('createdAt', 'desc')
      .startAfter(cursor)
      .limit(LIMIT)

    const newPosts = (await query.get()).docs.map((doc) => doc.data())

    setPosts(posts.concat(newPosts))
    setLoading(false)

    if (newPosts.length < LIMIT) {
      setPostsEnd(true)
    }
  }

  return (
    <main>
      <PostFeed posts={posts} />

      {!loading && !postsEnd && <button onClick={getMorePosts}>Load more</button>}

      <Loader show={loading} />

      {postsEnd && 'You have reached the end!'}
    </main>
  )
}
