import { useState } from "react"
import { CommentProps, UserProps } from "../App"
import Avatar from "./Avatar"
import MakeComment from "./MakeComment"
import RepliesWrapper from "./RepliesWrapper"
import VoteButton from "./VoteButton"
import ActionButton from "./ActionButton"
import MakeEdit from "./MakeEdit"
import { timeAgo } from "../helper"
import DeleteModal from "./DeleteModal"


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
      <div role="comment" className="p-5 flex flex-col-reverse md:flex-row relative  gap-5 items-center bg-(--White) rounded-lg mt-5">
          <VoteButton onVote={handleVote} score={comment.score}/>
          <article className="w-full">
            <div className="flex justify-between p">
              <header className="flex gap-5 items-center flex-wrap sm:flex-nowrap">
                <Avatar src={comment.user.image.webp} alt={comment.user.username}/>
                <h1 className="font-semibold text-(--Dark-blue)">{comment.user.username}</h1>
                {user.username == comment.user.username && <p className="px-2 text-(--White) bg-(--Moderate-blue)">You</p>}
                <span className="justify-self-end text-(--Grayish-Blue)">{Number(comment.createdAt) ? timeAgo(Number(comment.createdAt)) : `${comment.createdAt}`}</span>
              </header>
              {
                comment.user.username == user.username
                ? <div className="absolute bottom-5 right-5 md:static flex gap-5 items-center">
                    <button onClick={() => setIsDeleting(true)} className="text-(--Soft-Red)"><ActionButton  action="Delete" src="/images/icon-delete.svg"/></button>
                    <button  onClick={() => setIsEditing(true)}   className="text-(--Moderate-blue)"><ActionButton action="Edit" src="/images/icon-edit.svg"/></button>
                  </div>
                : <a onClick={() => setIsReplying(!isReplying)} className="absolute bottom-5 right-5 md:static text-(--Moderate-blue)" href="#new-comment"><ActionButton action="Reply" src="/images/icon-reply.svg" /></a>
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
        <DeleteModal setIsDeleting={setIsDeleting} comment={comment} deleteComment={deleteComment}/>
      }
      
    </>

  )
}

export default Comment