

const VoteButton = ({score, onVote}: {score: number, onVote: (type: 'up' | 'down') => void}) => {
  return (
    <div className='p-3 self-start flex flex-row md:flex-col gap-5 bg-(--Very-light-gray) justify-center items-center rounded-t-lg rounded-b-lg'>
        <img className="cursor-pointer" onClick={() => onVote('up')} src="public/images/icon-plus.svg" alt="plus"/>
        <p className="text-(--Moderate-blue)" role="voting-score">{score}</p>
        <img src="public/images/icon-minus.svg" alt="minus" className="cursor-pointer" onClick={() => onVote('down')}/>

    </div>
  )
}

export default VoteButton