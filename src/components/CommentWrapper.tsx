import { CommentProps } from "../App"
import Comment from "./Comment"


const CommentWrapper = ({comments, addComment, voteComment, deleteComment, editComment}: {
    comments?: CommentProps[],
    addComment: (id: number, content: string, replyingTo: string) => void
    voteComment: (id: number, type: "up" | "down") => void
    deleteComment: (id: number) => void
    editComment: (id: number, content: string) => void
}) => {
  return (
    <>
        {   
            comments && comments?.length! > 0
            ? comments.sort((a, b) => b.score - a.score).map(comment => <Comment editComment={editComment} deleteComment={deleteComment} addComment={addComment} voteComment={voteComment} comment={comment} key={comment.id}/>)
            : <p>No Comments Available</p>
        }
    </>
  )
}

export default CommentWrapper