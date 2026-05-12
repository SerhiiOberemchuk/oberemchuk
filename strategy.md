# Стратегія оптимізації продуктивності та анімацій

Оновлено після перевірки поточного стану проєкту.

## 1. Поточний стан

### Мобільне меню

Мобільне меню вже переведене на нативний `<dialog>`:

- `components/Mobile-Menu/mobile-menu.tsx`
- `components/Mobile-Menu/mobile-menu.module.css`

Що вже зроблено:

- використовується `dialog.showModal()` / `dialog.close()`;
- прибрано старий кастомний `div role="dialog"`;
- немає ручної фіксації `body.style.position = "fixed"`;
- backdrop реалізований через `dialog::backdrop`;
- open-анімація винесена в CSS через `@starting-style`;
- додано `prefers-reduced-motion` для вимкнення transitions у меню.

Цей пункт стратегії вважається виконаним.

### Шрифти

Дубльованого `@import` Google Fonts у `app/globals.css` вже немає.

Шрифти підключаються через `next/font/google` у:

- `app/[locale]/layout.tsx`

Цей пункт стратегії вважається виконаним.

### JS-анімації

Старого `hooks/use-in-view.ts` вже немає.

`AnimationWrapper` зараз не є client-компонентом і не використовує `IntersectionObserver`. Він лише додає CSS-класи:

- `components/animation-wrapper.tsx`
- `.inview-reveal` у `app/globals.css`

Reveal-анімації працюють через CSS:

- `animation-timeline: view()`;
- fallback без анімації для браузерів без підтримки;
- `prefers-reduced-motion`.

Це вже значно краще за старий JS-підхід, але wrappers ще використовуються дуже широко.

## 2. Що вже спрощено

Перший cleanup-прохід:

- прибрано reveal-анімацію з hero above the fold;
- прибрано поелементні reveal wrappers з повторюваних outcome-карток;
- прибрано поелементні reveal wrappers з другорядних portfolio-карток на головній;
- прибрано reveal wrappers із головної services-секції;
- увімкнено `prefers-reduced-motion` для mobile menu CSS.

Збірка після змін проходить:

- `cmd /c npm run build`

## 3. Поточна гіпотеза

Основний ризик уже не в "важкому JS для меню". Цю проблему фактично знято.

Залишковий технічний борг тепер у двох місцях:

1. Надмірна кількість декоративних reveal-анімацій у сторінках.
2. Зайві DOM-wrappers навколо великих блоків і повторюваних карток.

Оскільки `AnimationWrapper` більше не client-компонент, це не критична runtime-проблема. Але поступове спрощення все одно корисне:

- менше DOM;
- менше CSS-анімацій на scroll;
- спокійніший UX;
- простіша підтримка компонентів.

## 4. Подальший план

### Фаза 1. Завершити cleanup головної сторінки

Пройти компоненти:

- `components/sections/about-section.tsx`
- `components/sections/contact-section.tsx`
- `components/sections/seo-section.tsx`
- `components/faq-section.tsx`

Правило:

- залишати анімацію тільки для великих секційних входів;
- прибирати анімацію з повторюваних карток, списків і контенту, який і так добре сканується;
- не анімувати above the fold.

### Фаза 2. Сторінки списків

Пройти:

- `app/[locale]/(site)/services/page.tsx`
- `app/[locale]/(site)/solutions/page.tsx`
- `app/[locale]/(site)/portfolio/page.tsx`
- `app/[locale]/(site)/blog/page.tsx`

Правило:

- не обгортати кожну картку списку в `AnimationWrapper`;
- якщо потрібен motion, анімувати контейнер секції або використовувати легкий CSS class без додаткового компонента.

### Фаза 3. Detail-сторінки

Пройти:

- `app/[locale]/(site)/services/[slug]/page.tsx`
- `app/[locale]/(site)/solutions/[slug]/page.tsx`
- `app/[locale]/(site)/portfolio/[slug]/page.tsx`
- `app/[locale]/(site)/blog/[slug]/page.tsx`

Правило:

- прибрати reveal-анімації з довгого читабельного контенту;
- залишити тільки легкі секційні акценти, якщо вони справді покращують структуру.

## 5. Що не треба робити зараз

- Не додавати `framer-motion` або іншу motion-бібліотеку.
- Не повертати JS `IntersectionObserver` для простих reveal-ефектів.
- Не використовувати `view-transition` для mobile menu.
- Не робити великий одноразовий рефактор усіх сторінок, бо ризик регресій буде вищий за користь.

## 6. Рекомендований напрямок

Поточний напрямок правильний:

- menu: нативний `<dialog>` + CSS;
- reveal: CSS-only, поступово менше;
- page transitions: розглядати окремо пізніше, якщо буде реальна потреба;
- залежності: тримати без motion/carousel-бібліотек, якщо вони не використовуються.

Наступний найкращий крок: завершити cleanup `AnimationWrapper` на головній сторінці, потім перейти до сторінок списків.
