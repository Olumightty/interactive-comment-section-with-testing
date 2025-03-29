import { useState } from "react"
import Avatar from "./Avatar"
import { UserProps } from "../App"

const MakeComment = ({onCLick} : {onCLick: (content: string) => void}) => {
  const [content, setContent] = useState('')
  const [isEmpty, setIsEmpty] = useState(false)
  const user: UserProps = JSON.parse (localStorage.getItem('user')!)
  return (
    <section className="flex justify-between items-center mt-5 relative bg-(--White) p-5 rounded-lg">
        <Avatar src={user.image.webp} alt={user.username}/>
        {isEmpty && <p className="text-(--Soft-Red) text-sm absolute top-[-20px] left-[70px]">Comment cannot be empty</p>}
        <textarea value={content} onChange={(e) => setContent(e.target.value)} className="outline-1 outline-(--Grayish-Blue) w-full mx-5 p-2 rounded-lg" placeholder="Add Comment" name="mew-comment" id="new-comment"></textarea>
        <button onClick={() => {
            if(content.length == 0){
                setIsEmpty(true)
                return
            }
            onCLick(content)}
          } className="bg-(--Moderate-blue) text-(--White) px-5 py-2 self-start rounded-lg cursor-pointer hover:opacity-50 transition-all">Reply</button>
    </section>
  )
}

export default MakeComment