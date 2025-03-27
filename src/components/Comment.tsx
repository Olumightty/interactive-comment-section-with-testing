import { useState } from "react"
import { CommentProps, UserProps } from "../App"
import Avatar from "./Avatar"
import MakeComment from "./MakeComment"
import RepliesWrapper from "./RepliesWrapper"
import VoteButton from "./VoteButton"
import ActionButton from "./ActionButton"
import MakeEdit from "./MakeEdit"
import { timeAgo } from "../helper"


const Comment = ({comment, addComment, voteComment, deleteComment, editComment}: {
  comment: CommentProps,
  addComment: (id: number, content: string, replyingTo: string) => void
  voteComment: (id: number, type: "up" | "down") => void
  editComment: (id: number, content: string) => void
  deleteComment: (id: number) => void
}) => {
  const [isReplying, setIsReplying] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const user:UserProps = JSON.parse(localStorage.getItem('user')!)

  const handleCLick = (content: string) => {
    addComment(comment.id, content, comment.user.username)
    setIsReplying(false)
  }

  const handleVote = (type: 'up' | 'down') =>{
    voteComment(comment.id, type)
  }

  const handleEdit = (content: string) => {
    editComment(comment.id, content)
    setIsEditing(false)
  }
  return (
    <>
      <div role="comment" className="p-5 flex gap-5 items-center bg-(--White) rounded-lg mt-5">
          <VoteButton onVote={handleVote} score={comment.score}/>
          <article className="w-full">
            <div className="flex justify-between">
              <header className="flex gap-5 items-center">
                <Avatar src={comment.user.image.webp} alt={comment.user.username}/>
                <h1 className="font-semibold text-(--Dark-blue)">{comment.user.username}</h1>
                {user.username == comment.user.username && <p className="px-2 text-(--White) bg-(--Moderate-blue)">You</p>}
                <span className="text-(--Grayish-Blue)">{Number(comment.createdAt) ? timeAgo(Number(comment.createdAt)) : `${comment.createdAt}`}</span>
              </header>
              {
                comment.user.username == user.username
                ? <div className="flex gap-5 items-center">
                    <span className="text-(--Soft-Red)" aria-hidden="true"><ActionButton onClick={() => setIsDeleting(true)} action="Delete" src="/images/icon-delete.svg"/></span>
                    <span className="text-(--Moderate-blue)" aria-hidden="true"><ActionButton onClick={() => setIsEditing(true)} action="Edit" src="/images/icon-edit.svg"/></span>
                  </div>
                : <a className="text-(--Moderate-blue)" href="#new-comment"><ActionButton action="Reply" src="/images/icon-reply.svg" onClick={() => setIsReplying(!isReplying)}/></a>
              }
              
            </div>
            {
              isEditing 
              ? <MakeEdit onCLick={handleEdit} prev={comment.content}/>
              : <p className="mt-3 text-(--Grayish-Blue)">

                {comment.replyingTo && <span className="text-(--Moderate-blue) font-semibold">@{comment.replyingTo} </span>}
                {comment.content}
              </p>
            }
            
          </article>
      </div> 
      {
        comment.replies?.length! > 0

        ? <RepliesWrapper editComment={editComment} addComment={addComment} voteComment={voteComment} deleteComment={deleteComment} replies={comment.replies} />

        : null
      }
      {
        isReplying && <MakeComment onCLick={handleCLick}/> 
      }
      {
        isDeleting && 
        <>
        <div className="absolute top-0 left-0 h-[100vh] w-[100vw] bg-black opacity-30 z-10"/>
        <div className="absolute top-0 z-10 left-0 h-[100vh] flex justify-center items-center w-[100vw] bg-(--Very-Dark-Blue)">
          <div className="bg-(--White)  p-5 rounded-lg  flex flex-col items-center justify-center gap-5 w-[400px]">
            <header>
              <h1 className="text-(--Dark-blue) text-2xl font-bold mb-5">Delete Comment</h1>
              <p>Are you sure you want to delete this comment? This would remove the comment and can't be undone.</p>
            </header>
            <div className="flex gap-2">
              <button onClick={() => setIsDeleting(false)} className="bg-(--Grayish-Blue) text-(--White) cursor-pointer px-5 py-2 rounded-lg font-semibold">No, Cancel</button>
              <button onClick={() => deleteComment(comment.id)} className="bg-(--Soft-Red) text-(--White) cursor-pointer px-5 py-2 rounded-lg font-semibold">Yes, Delete</button>
            </div>
          </div>
        </div>
      </>
      }
      
    </>

  )
}

export default Comment