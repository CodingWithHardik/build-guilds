import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const faqs = [
  {
    question: "Is there a free plan?",
    answer:
      "Yes, we offer a free tier with basic features. You can use it as long as you like without paying.",
  },
  {
    question: "Do you offer any discounts?",
    answer:
      "We have discounts for students and non-profits. Contact us to learn more.",
  },
  {
    question: "How do I cancel my subscription?",
    answer:
      "You can cancel anytime in your account settings. You'll keep access until your current billing period ends.",
  },
  {
    question: "What happens if I switch to a lower-priced plan?",
    answer:
      "You'll lose access to premium features right away. Your data stays safe, but you might need to reduce usage to fit the new plan limits.",
  },
  {
    question: "Can I change my plan?",
    answer:
      "Yes, you can change plans anytime in your account settings. Changes start at your next billing date.",
  },
]

export function Faq() {
  return (
    <div className="bg-[#071d35] w-full">
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
