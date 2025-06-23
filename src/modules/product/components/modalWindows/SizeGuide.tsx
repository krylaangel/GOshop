import type { JSX } from 'react'
import { useState } from 'react'
import ReactDOM from 'react-dom'
import Icons from '~/assets/images/icon-sprite.svg'
import Button from '~/shared/components/Button/Button'
import { MeasureSize } from './MeasureSize'
import { SizeTable } from './SizeTableLink'

interface SizeModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function SizeGuide({
  isOpen,
  onClose,
}: SizeModalProps): JSX.Element | null {
  if (!isOpen)
    return null
  const [activeTab, setActiveTab] = useState<'size' | 'measure'>('size')
  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      <div className="bg-white p-2 md:p-10 rounded-lg h-full w-full md:max-w-[997px] md:h-[642px] overflow-y-auto max-h-[100vh]">
        <div className="w-full flex justify-end">
          <button
            onClick={onClose}
            className="cursor-pointer h-8 w-8 text-[var(--hoverBorder)]"
          >
            <svg className="w-4 h-4 md:w-8 md:h-8">
              <use href={`${Icons}#header_burger-close`} />
            </svg>
          </button>
        </div>
        <div className="flex gap-x-2 md:gap-x-8">
          <Button
            variant={activeTab === 'size' ? 'primary' : 'secondary'}
            onClick={() => setActiveTab('size')}
            className="w-[214px] font-medium px-2"
          >
            Розмірна сітка
          </Button>
          <Button
            className="w-[214px] font-medium px-2"
            variant={activeTab === 'measure' ? 'primary' : 'secondary'}
            onClick={() => setActiveTab('measure')}
          >
            Як знімати мірки
          </Button>
        </div>
        {activeTab === 'size' && <SizeTable />}
        {activeTab === 'measure' && <MeasureSize />}
      </div>
    </div>,
    document.body,
  )
}
