import { useState } from 'react'

function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  const faqs = [
    {
      question: 'Які можна сплатити за товар?',
      answer:
        'Ви можете оплатити товар банківською карткою, готівкою або через електронні платіжні системи.',
    },
    {
      question: 'Які доступні способи доставки?',
      answer: 'Ми пропонуємо кур\'єрську доставку, поштові служби та самовивіз.',
    },
    {
      question: 'Якщо товар не підійде, чи є можливість його повернути?',
      answer:
        'Так, ви можете повернути товар протягом 14 днів за умови збереження товарного вигляду.',
    },
    {
      question: 'Чи можливий самовивіз?',
      answer:
        'Так, ви можете забрати товар у нашому магазині за попереднім узгодженням.',
    },
    {
      question: 'Чи є у вас система лояльності?',
      answer:
        'Так, ми маємо програму лояльності з бонусами та знижками для постійних клієнтів.',
    },
  ]

  return (
    <section className="clamp">
      <div className="pb-5 sm:pb-12 lg:pb-20">
        <h2 className="flex-center font-medium text-2xl md:text-4xl leading-[50.4px] tracking-[2.5] sm:tracking-[3.6px]">
          Питання і відповіді
        </h2>
        <div className="mt-8">
          {faqs.map((faq, index) => (
            <div key={index}>
              <button
                className="cursor-pointer text-justify border-[var(--secondaryBgColor)] border-b w-full flex sm:items-center"
                onClick={() => toggleFAQ(index)}
              >
                <div className="flex-wrap text-xl font-bold leading-[28px] py-4">
                  {faq.question}
                </div>
                <div className="ml-auto w-4 h-4 px-4">
                  {openIndex === index ? '−' : '+'}
                </div>
              </button>
              {openIndex === index && (
                <div className="text-xl leading-[28px] p-4">{faq.answer}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FAQSection
