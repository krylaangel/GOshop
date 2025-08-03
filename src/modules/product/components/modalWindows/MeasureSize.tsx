import getImageURL from '~/shared/utils/imageUtils'

export function MeasureSize() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-[minmax(0,380px)_1fr] ">
      <div className="col-span-1">
        <img
          className="cover"
          src={getImageURL('size.png')}
          alt="Instruction for measuring"
        />
      </div>
      <div className="col-span-1">
        <h1 className="font-medium text-lg leading-[140%] tracking-normal mt-5 mb-7">
          Як правильно знімати мірки
        </h1>
        <ol className="list-decimal marker:font-medium list-inside mb-4">
          <li className="measure">
            <span>Обхват грудей.</span>
            {' '}
            Оберніть сантиметр навколо найоб'ємнішої
            і виступаючої частини грудей, наполовину вдихніть і зафіксуйте
            обсяг.
          </li>
          <li className="measure">
            <span>Обхват талії.</span>
            {' '}
            Оберніть сантиметр навколо найтоншої
            частини талії, вимірюйте напів вдихаючи. Не втягуйте і не надувайте
            живіт під час вимірювання.
          </li>
          <li className="measure">
            <span>Ширина плеча.</span>
            {' '}
            Тримаючі сантиметр перед собою,
            зафіксуйте відстань від краю одного плеча до краю іншого. Не
            потрібно обертати плечі по колу, для цієї мірки потрібен
            «напівобхват».
          </li>
          <li className="measure">
            <span>Обхват стегон.</span>
            {' '}
            Вимірюється по найоб'ємнішій частині
            сідниць, приблизно на рівні кульшових суглобів.
          </li>
          <li className="measure">
            <span>Довжина рукава.</span>
            {' '}
            Витягнувши руку наполовину, або
            тримаючи прямо, але ні в якому разі, не згинаючи, виміряйте відстань
            від плеча до зап'ястя .
          </li>
          <li className="measure">
            <span>Довжина ноги.</span>
            {' '}
            Стоячи прямо, виміряйте відстань від паху
            до кісточки на щиколотці.
          </li>
          <li className="measure">
            <span>Обхват шиї.</span>
            {' '}
            Вимірюється основа шиї безпосередньо над
            ключицею.
          </li>
        </ol>
      </div>
    </div>
  )
}
