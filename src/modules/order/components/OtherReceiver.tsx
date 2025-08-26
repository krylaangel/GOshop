interface Receiver {
    firstName: string
    lastName: string
    fatherName: string
    phoneNumber: string
    note: string
}

interface OtherReceiverProps {
    receiver: Receiver
    setReceiver: (receiver: Receiver) => void
}
export function OtherReceiver({ receiver, setReceiver }:OtherReceiverProps) {
    return (
    <div className="flex gap-6 flex-col mb-8">
      <h2 className="w-full bg-[var(--hoverBorder)] rounded-lg p-3 ">4. Інший отримувач:</h2>
      <div className="gap-6 flex flex-col w-full">

        <div className="flex gap-6">
          <input
            className="border rounded-lg px-3 py-2 w-full input-field input-field-styles"
            value={receiver.firstName}
            placeholder="Ім’я*"
            onChange={(e) =>
                setReceiver({ ...receiver, firstName: e.target.value })
            }
          />
          <input
            className="border rounded-lg px-3 py-2 input-field input-field-styles"
            value={receiver.lastName}
            placeholder="Прізвище*"
            onChange={(e) =>
                setReceiver({ ...receiver, lastName: e.target.value })
            }
          />
        </div>
        <div className="flex gap-6">
          <input
            className="border rounded-lg px-3 py-2 w-full input-field input-field-styles"
            value={receiver.fatherName}
            placeholder="По батькові*"
            onChange={(e) =>
                setReceiver({ ...receiver, fatherName: e.target.value })
            }
          />
          <input
            className="border rounded-lg px-3 py-2 input-field input-field-styles"
            value={receiver.phoneNumber}
            placeholder="Номер телефону*"
            onChange={(e) =>
                setReceiver({ ...receiver, phoneNumber: e.target.value })
            }
          />
        </div>
      </div>
      <h2>Додати коментар до замовлення</h2>
      <input
        className="border rounded-lg px-3 py-2 w-full input-field input-field-styles h-[94px] text-sm!"
        value={receiver.note}
        placeholder="Введіть Ваш текст"
        onChange={(e) =>
            setReceiver({ ...receiver, note: e.target.value })
        }
      />
    </div>
  )
}
