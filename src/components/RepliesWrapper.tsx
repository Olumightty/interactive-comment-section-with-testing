import { CommentProps } from "../App"
import CommentWrapper from "./CommentWrapper"

const RepliesWrapper = ({replies, addComment, voteComment, deleteComment, editComment}: {
    replies?: CommentProps[]
    addComment: (id: number, content: string, replyingTo: string) => void
    voteComment: (id: number, type: "up" | "down") => void
    deleteComment: (id: number) => void
    editComment: (id: number, content: string) => void
}) => {
  return (
    <div className="border-l-2 ml-10 border-(--Light-gray) pl-10 flex flex-col">
        <CommentWrapper editComment={editComment} deleteComment={deleteComment} addComment={addComment} voteComment={voteComment} comments={replies}/>
    </div>
  )
}

export default RepliesWrapper