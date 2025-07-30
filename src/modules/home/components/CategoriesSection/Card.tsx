import { Link } from 'react-router-dom'
import getImageURL from '../../../../shared/utils/imageUtils'

interface CardProps {
  imgURL: string
  text: string
  to: string
}

function CardComponent({ imgURL, text, to }: CardProps) {
  return (
    <div className="bg-[var(--stateInactive)] p-1 sm:p-3 rounded-[10px] flex flex-col text-center sm:gap-y-3 max-w-[336px] max-h-[380px]">
      <img className="h-full w-full object-cover" src={getImageURL(imgURL)} alt={text} />
      <ul>
        <li className="font-small text-sm sm:text-xl leading-[28px]">
          <Link to={to} className="menu">
            {text}
          </Link>
        </li>
      </ul>
    </div>
  )
}
export default CardComponent
