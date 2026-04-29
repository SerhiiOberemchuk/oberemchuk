# Стратегія оптимізації продуктивності та анімацій

## 1. Що зараз виглядає проблемним

### Мобільне меню
- У [components/mobile-menu.tsx](c:/GitHub/oberemchuk/components/mobile-menu.tsx:40) меню відкривається через кастомний `div role="dialog"`, portal і ручне блокування скролу.
- При `isOpen === true` код змінює `body.style.overflow`, `position`, `width`, `top`, а при закритті відновлює `scrollY`.
- На мобільних браузерах саме такий патерн часто дає:
  - ривки під час відкриття/закриття;
  - стрибки viewport;
  - зайві reflow/repaint;
  - конфлікти з address bar / dynamic viewport height.

### Зайвий JS для декоративних анімацій
- Є окремий `AnimationWrapper` + `useInView`:
  - [components/animation-wrapper.tsx](c:/GitHub/oberemchuk/components/animation-wrapper.tsx:1)
  - [hooks/use-in-view.ts](c:/GitHub/oberemchuk/hooks/use-in-view.ts:1)
- Цей wrapper використовується масово на сторінках і секціях.
- Це не катастрофа, але це додатковий client-side JS, додаткові observer-и і додаткова гідрація там, де ефект здебільшого декоративний.

### CSS вже містить зайвий технічний борг
- У [app/globals.css](c:/GitHub/oberemchuk/app/globals.css:1) є `@import` Google Fonts, хоча шрифти вже підключені через `next/font` у [app/[locale]/layout.tsx](c:/GitHub/oberemchuk/app/[locale]/layout.tsx:18).
- У тому ж CSS є кілька наборів анімацій для меню, частина з яких зараз не використовується:
  - [app/globals.css](c:/GitHub/oberemchuk/app/globals.css:169)
  - [app/globals.css](c:/GitHub/oberemchuk/app/globals.css:297)
- Це не головна причина лагів, але це збільшує складність і розмазує відповідальність між JS та CSS.

## 2. Головна гіпотеза по проблемі зі скролом

Проблема швидше не в "важкому JS" як у великій бібліотеці, а в поєднанні трьох речей:

1. Ручний scroll lock через `body { position: fixed; top: -scrollY }`.
2. Portal-рендер повноекранного меню поверх уже прокрученої сторінки.
3. Одночасна анімація overlay + panel під час зміни layout/viewport на мобілці.

Тобто джерело проблеми ближче до архітектури UI-стану, ніж до "розміру bundle".

## 3. Що робити в першу чергу

### Крок 1. Перевести мобільне меню на нативний `dialog`
Це найкращий перший крок.

Що дає:
- нативний top layer;
- вбудовану модальну поведінку через `showModal()`;
- простіший focus management;
- менше ручного JS;
- простіший scroll lock без фіксації `body`.

Цільова модель:
- замінити кастомний `div role="dialog"` на `<dialog>`;
- відкривати через `dialog.showModal()`;
- закривати через `dialog.close()`;
- використовувати `::backdrop` замість окремого overlay div;
- прибрати ручний focus trap;
- прибрати маніпуляції `body.style.position/top/width`.

### Крок 2. Анімацію меню перенести в CSS через `@starting-style`
Для цього кейсу це підходить дуже добре.

Що варто зробити:
- анімувати сам `dialog` або внутрішню панель через `opacity`, `transform`;
- для відкриття використати `@starting-style`;
- для backdrop анімувати `dialog::backdrop`;
- обов'язково додати `prefers-reduced-motion`.

Приклад напрямку:
- closed/open state через атрибут `[open]`;
- вхід:
  - panel: `translateX(100%) -> translateX(0)`;
  - backdrop: `opacity: 0 -> 1`;
- вихід:
  - якщо потрібен плавний exit, його краще робити коротким JS-хендлером `close after transitionend`, бо `dialog.close()` одразу прибирає `open`.

### Крок 3. Перестати "фіксити body", якщо це не критично
У більшості випадків з `dialog.showModal()` ручний fixed-lock для `body` не потрібен.

Якщо виявиться, що iOS поводиться нестабільно:
- краще мати дуже тонкий fallback через клас на `html`/`body`;
- але не через `position: fixed` + `top`.

## 4. Що робити з Motion / JS-анімаціями загалом

### Важливий факт
- У поточному коді я не знайшов `motion` або `framer-motion` у залежностях.
- Тобто прибирати `motion` як бібліотеку зараз фактично нема звідки.
- Але є власний JS-шар для reveal-анімацій, і саме його має сенс скорочувати.

### Рекомендована стратегія

#### Залишити JS тільки там, де без нього справді гірше
JS ще виправданий для:
- складного carousel/drag;
- реального gesture-driven UI;
- анімацій, що залежать від scroll progress;
- синхронізації кількох елементів по таймлайну.

#### Все інше переводити на CSS або platform APIs
Першими кандидатами на спрощення є:
- mobile menu;
- hover/focus/press transitions;
- accordion/open-close анімації;
- прості reveal ефекти секцій.

## 5. Що робити з reveal-анімаціями секцій

Зараз `AnimationWrapper` використовується дуже широко, тому видаляти його одним комітом не варто.

### Практичний план

#### Варіант A. Мінімальний ризик
- залишити `useInView`, але:
  - зменшити кількість місць використання;
  - прибрати анімацію з усього, що нижче fold не потребує акценту;
  - не анімувати великі списки/сітки поелементно;
  - не анімувати елементи, які і так видно above the fold.

#### Варіант B. Більш сучасний напрямок
Поступово перейти на CSS scroll-driven animation там, де є підтримка:
- `animation-timeline: view()`;
- `animation-range`;
- fallback без анімації для старіших браузерів.

Це хороший напрямок, але не перший пріоритет. Для меню `dialog + @starting-style` дасть швидший і надійніший виграш.

## 6. Де `@view-transition` реально доречний

`@view-transition` варто застосовувати не до мобільного меню, а до переходів між сторінками або великими layout state changes.

Підходить для:
- переходу між списком кейсів і сторінкою кейсу;
- переходу між blog list і blog article;
- анімованої зміни hero/media між route transitions.

Не варто робити ним:
- звичайне off-canvas mobile menu;
- дрібні hover/focus анімації;
- банальні open/close стани.

Тобто:
- `mobile menu` -> `dialog + @starting-style`
- `page transitions` -> `view-transition`

## 7. Додаткові оптимізації, які варто зробити паралельно

### Прибрати дубль завантаження шрифтів
- Видалити `@import url(...)` з [app/globals.css](c:/GitHub/oberemchuk/app/globals.css:1).
- Залишити лише `next/font`.

Це дасть:
- менше зайвих network requests;
- кращий контроль над font loading;
- менше ризику CLS/FOIT/FOUT-конфліктів.

### Прибрати мертвий CSS для старих анімацій меню
- Перевірити і видалити невикористані блоки в [app/globals.css](c:/GitHub/oberemchuk/app/globals.css:169) і [app/globals.css](c:/GitHub/oberemchuk/app/globals.css:297).

### Переглянути всі `use client`-обгортки з декоративною роллю
Насамперед:
- `AnimationWrapper`
- `ScrollToTop`
- інші дрібні UI-елементи, де можна зменшити реактивність або відкласти гідрацію.

### Перевірити бандл на зайві залежності
У `package.json` є багато UI-бібліотек, які можуть не використовуватись.
Окремо варто пройтися по:
- `swiper`
- `embla-carousel-react`
- великому набору `@radix-ui/*`

Ціль:
- залишити тільки реально використовуване;
- зменшити install/build/runtime overhead.

## 8. Пріоритети впровадження

### Фаза 1. Швидкий виграш
1. Переписати mobile menu на `<dialog>`.
2. Перенести open animation на `@starting-style`.
3. Прибрати `body.style.position = "fixed"` та відновлення `scrollY` вручну.
4. Видалити `@import` Google Fonts з CSS.
5. Почистити мертвий CSS меню.

### Фаза 2. Скорочення зайвого JS
1. Провести аудит `AnimationWrapper`.
2. Зменшити кількість reveal-анімацій.
3. Прибрати анімації з великих списків і повторюваних карток.
4. Там, де можливо, замінити на чистий CSS або взагалі на статичний рендер.

### Фаза 3. Сучасні platform APIs
1. Додати `view-transition` для route/page transitions.
2. Точково протестувати scroll-driven animations як progressive enhancement.
3. Стандартизувати motion system:
   - одна крива;
   - 2-3 тривалості;
   - чітке правило, де є JS, а де тільки CSS.

## 9. Практичне рішення, яке я б рекомендував

Якщо робити без зайвого розкиду:

1. Спочатку переписати лише мобільне меню на нативний `dialog`.
2. Одразу після цього прибрати дубль шрифтів і старий CSS для меню.
3. Потім окремим етапом пройтись по `AnimationWrapper` і скоротити JS-анімації.
4. `@view-transition` додавати вже після стабілізації меню, не змішуючи ці задачі.

## 10. Висновок

Поточна проблема майже напевно сидить не в абстрактно "важкому JS", а в конкретній реалізації mobile menu:
- кастомний dialog;
- ручний scroll lock;
- фіксація `body`;
- ручне відновлення scroll position.

Найбільш правильний технічний напрямок:
- перейти на нативний `<dialog>`;
- анімації меню зробити через CSS і `@starting-style`;
- `@view-transition` використовувати для route transitions, а не для off-canvas меню;
- поступово скоротити декоративний client-side JS навколо `AnimationWrapper`.
