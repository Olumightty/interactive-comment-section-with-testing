import CommentWrapper from './components/CommentWrapper';
import { useEffect, useState } from 'react';
import data from '../data.json'

export interface UserProps{
  image: {
    png: string;
    webp: string;
  };
  username: string;
}
export interface CommentProps{
  id: number;
  content: string;
  createdAt: string;
  score: number;
  user: UserProps
  replyingTo?: string
  replies?: CommentProps[]
}



export interface DataProps{
  currentUser: UserProps;
  comments: CommentProps[]
}

const App = () => {
 const [comments, setComments] = useState<CommentProps[]>(() => {
  const localComments = localStorage.getItem('comments')
  if(localComments) return JSON.parse(localComments)
  return data.comments
 })

 useEffect(() => {
  localStorage.setItem('user', JSON.stringify(data.currentUser))
 }, [])

 useEffect(() => {
  localStorage.setItem('comments', JSON.stringify(comments))
 }, [comments])
const addComment = (id: number, content: string, replyingTo: string) => {
    const currentUser: UserProps = JSON.parse(localStorage.getItem('user')!)
    const updateComment = comments?.map((comment) => {
      if(id == comment.id){
        comment.replies?.push(
          { 
            id: Date.now(), 
            content: content, 
            createdAt: Date.now().toString(), 
            score: 0, 
            user: currentUser, 
            replyingTo: replyingTo

          })
      }
      if(comment.replies && comment.replies?.length > 0){
        comment.replies.map((reply) => {
          if(id == reply.id){
            comment.replies?.push(
              { 
                id: Date.now(), 
                content: content, 
                createdAt: Date.now().toString(), 
                score: 0, 
                user: currentUser, 
                replyingTo: replyingTo
    
              })
  
          }
        })
      }
      return comment
    })
    setComments(updateComment)
 }

 const voteComment = (id: number, type: 'up' | 'down') => {
  const updateComment = comments?.map((comment) => {
    if(id == comment.id){
      type == 'up' ? comment.score++ : comment.score--
    }
    if(comment.replies && comment.replies?.length > 0){
      comment.replies.map((reply) => {
        if(id == reply.id){
          type == 'up' ? reply.score++ : reply.score--

        }
      })
    }
    
    return comment
  })
  setComments(updateComment)
 }

 const deleteComment = (id: number) => {
  let updateComment
  updateComment = comments?.filter((comment) => {
    return comment.id != id
  })
  if(updateComment.length == comments?.length){
    updateComment = comments?.map((comment) => {
      const updateReply = comment.replies?.filter((reply) => {
        return reply.id != id
      })
      comment.replies = updateReply
      return comment
    })
  }
  setComments(updateComment)
 }

 const editComment = (id: number, content: string) => {
  const updateComment = comments?.map((comment) => {
    if(comment.id == id){
      comment.content = content
    }
    if(comment.replies && comment.replies?.length > 0){
      comment.replies.map((reply) => {
        if(reply.id == id){
          reply.content = content
        }
      })
    }
    return comment
 })
  
  setComments(updateComment)
 }

  return (
    <main className='h-full relative w-full flex justify-center items-center px-5 sm:px-10 lg:px-20 xl:px-[25vw] mb-10'>
      <div>
        <CommentWrapper comments={comments} addComment={addComment} voteComment={voteComment} deleteComment = {deleteComment} editComment={editComment}/>
      </div>
      
    </main>
  )
}

export default App