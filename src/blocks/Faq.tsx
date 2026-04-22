import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export function Faq({ id, faqs }: { id?: string; faqs: { question: string; answer: string }[] }) {
  return (
    <div className="bg-[#071d35] w-full" id={id}>
        <div className="container mx-auto px-6 md:px-14 max-w-7xl py-14">
            <h3 className="text-4xl mb:text-5xl lg:text-6xl font-bold text-white uppercase font-rcfull px-4 text-center">
                frequently asked <span className="text-bp-warning uppercase">questions</span>
            </h3>
        <Accordion
          className="mx-auto w-full max-w-2xl my-8"
          collapsible
          type="single"
        >
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="py-2">
              <AccordionTrigger className="text-left text-bp-warning font-rcfull text-lg font-bold bg-background rounded-none px-8">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="bg-background px-8">{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  )
}
