import React from 'react'
import { CommentProps } from '../App'

const DeleteModal = ({setIsDeleting, comment, deleteComment} : {setIsDeleting: React.Dispatch<React.SetStateAction<boolean>>, comment: CommentProps, deleteComment: (id: number) => void}) => {
  return (
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
  )
}

export default DeleteModal