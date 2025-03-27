

const Avatar = ({src, alt}: {src: string, alt: string}) => {
  return (
    <img className='self-start' width={40} height={40} loading='lazy' src={src} alt={alt} />
  )
}

export default Avatar