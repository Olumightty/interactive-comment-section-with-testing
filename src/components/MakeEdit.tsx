import { useState } from "react"



const MakeEdit = ({prev, onCLick} : {prev: string, onCLick: (content: string) => void}) => {
    const [content, setContent] = useState(prev)
    const [isEmpty, setIsEmpty] = useState(false)
  return (
    <section className="flex justify-between items-center mt-5 relative">
        {isEmpty && <p className="text-(--Soft-Red) text-sm  absolute top-[-20px] left-[16px]">Comment cannot be empty</p>}
        <textarea value={content}  onChange={(e) => setContent(e.target.value)} className="outline-1 outline-(--Grayish-Blue) w-full mx-5 p-2" placeholder="Update Comment" name="mew-comment" id="new-comment"></textarea>
        <button onClick={() => {
            if(content.length == 0){
                setIsEmpty(true)
                return
            }
            onCLick(content)
        }} className="bg-(--Moderate-blue) text-(--White) px-5 py-2 self-start rounded-lg cursor-pointer hover:opacity-50 transition-all">Update</button>
    </section>
  )
}

export default MakeEdit