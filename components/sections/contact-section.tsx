"use client"

import ProjectForm from "@/components/project-form"
import AnimationWrapper from "@/components/animation-wrapper"

export default function ContactSection() {
  return (
    <section id="contact" className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-green-50 to-emerald-50">
      <div className="container mx-auto">
        <AnimationWrapper animation="slide-up">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="inline-block rounded-lg bg-green-100 px-3 py-1 text-sm text-green-700">Контакти</div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Зв'яжіться з нами</h2>
            <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Готові дізнатися більше про ваш проєкт? Сміливо заповнюйте форму нижче — це ні до чого не зобов'язує!
              Просто розкажіть про ваші ідеї та бажання, і ми зв'яжемося з вами для безкоштовної консультації.
            </p>
          </div>
        </AnimationWrapper>

        <AnimationWrapper animation="fade-in" delay={200}>
          <div className="mx-auto max-w-lg md:max-w-2xl lg:max-w-4xl xl:max-w-5xl mt-12">
            <ProjectForm />
          </div>
        </AnimationWrapper>
      </div>
    </section>
  )
}
