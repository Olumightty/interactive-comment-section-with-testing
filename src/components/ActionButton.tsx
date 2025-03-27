
const ActionButton = ({action, src, onClick} : {action: string, src: string, onClick: () => void}) => {
  return (
    <p onClick={onClick} role='reply' className='flex gap-2 items-center cursor-pointer hover:opacity-50'>
        <img src={src} alt={action + ' icon'} />
        <span>{action}</span>
    </p>
  )
}

export default ActionButton