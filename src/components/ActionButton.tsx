
const ActionButton = ({action, src} : {action: string, src: string}) => {
  return (
    <span className='flex gap-2 items-center cursor-pointer hover:opacity-50'>
        <img src={src} alt={action + ' icon'} />
        {action}
    </span>
  )
}

export default ActionButton