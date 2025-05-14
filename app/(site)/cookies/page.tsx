import type { Metadata } from "next"
import Link from "next/link"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import CookieSettingsButton from "@/components/cookie-settings-button"

export const metadata: Metadata = {
  title: "Політика використання cookies | Oberemchuk Serhii",
  description:
    "Детальна інформація про те, як ми використовуємо cookies на нашому сайті, та як ви можете керувати своїми налаштуваннями.",
  alternates: {
    canonical: "/cookies",
  },
  openGraph: {
    title: "Політика використання cookies | Oberemchuk Serhii",
    description:
      "Детальна інформація про те, як ми використовуємо cookies на нашому сайті, та як ви можете керувати своїми налаштуваннями.",
    url: "/cookies",
  },
}

export default function CookiesPage() {
  return (
    <div className="container mx-auto max-w-4xl py-12 md:py-24">
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">
            Політика використання cookies
          </h1>
          <p className="text-gray-500">Останнє оновлення: 1 червня 2024 року</p>
        </div>

        <div className="prose prose-gray max-w-none">
          <h2>Що таке cookies?</h2>
          <p>
            Cookies — це невеликі текстові файли, які зберігаються на вашому пристрої (комп'ютері, планшеті, смартфоні)
            при відвідуванні веб-сайтів. Вони широко використовуються для забезпечення роботи веб-сайтів або підвищення
            ефективності їх роботи, а також для надання інформації власникам веб-сайту.
          </p>

          <h2>Як ми використовуємо cookies</h2>
          <p>
            Наш веб-сайт використовує різні типи cookies для різних цілей. Деякі cookies необхідні для функціонування
            сайту, інші допомагають нам покращити ваш досвід, аналізуючи, як ви використовуєте наш сайт, а треті
            використовуються для персоналізації контенту та реклами.
          </p>

          <h2>Типи cookies, які ми використовуємо</h2>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Тип</TableHead>
                <TableHead>Призначення</TableHead>
                <TableHead>Термін дії</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">Необхідні cookies</TableCell>
                <TableCell>
                  Ці cookies необхідні для функціонування нашого веб-сайту і не можуть бути вимкнені. Вони зазвичай
                  встановлюються тільки у відповідь на дії, які ви виконуєте, такі як встановлення налаштувань
                  конфіденційності, вхід в систему або заповнення форм.
                </TableCell>
                <TableCell>Сесія / 1 рік</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Аналітичні cookies</TableCell>
                <TableCell>
                  Ці cookies дозволяють нам підраховувати відвідування і джерела трафіку, щоб ми могли вимірювати і
                  покращувати продуктивність нашого сайту. Вони допомагають нам дізнатися, які сторінки найбільш і
                  найменш популярні, і як відвідувачі переміщаються по сайту.
                </TableCell>
                <TableCell>2 роки</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Маркетингові cookies</TableCell>
                <TableCell>
                  Ці cookies використовуються для відстеження відвідувачів на веб-сайтах. Мета полягає в тому, щоб
                  показувати релевантну рекламу, яка є цінною для видавців і сторонніх рекламодавців.
                </TableCell>
                <TableCell>1-2 роки</TableCell>
              </TableRow>
            </TableBody>
          </Table>

          <h2>Детальна інформація про cookies, які ми використовуємо</h2>

          <h3>Необхідні cookies</h3>
          <ul>
            <li>
              <strong>cookie-consent</strong> - Зберігає ваші налаштування щодо використання cookies на нашому сайті.
            </li>
            <li>
              <strong>session</strong> - Використовується для підтримки функціонал��ності сайту та збереження ваших
              налаштувань під час сеансу.
            </li>
          </ul>

          <h3>Аналітичні cookies (Google Analytics)</h3>
          <ul>
            <li>
              <strong>_ga</strong> - Реєструє унікальний ідентифікатор, який використовується для генерування
              статистичних даних про те, як відвідувач використовує веб-сайт. Термін дії: 2 роки.
            </li>
            <li>
              <strong>_ga_[ID]</strong> - Використовується Google Analytics для збору даних про кількість разів, коли
              користувач відвідував веб-сайт, а також дати першого та останнього відвідування. Термін дії: 2 роки.
            </li>
            <li>
              <strong>_gid</strong> - Реєструє унікальний ідентифікатор, який використовується для генерування
              статистичних даних про те, як відвідувач використовує веб-сайт. Термін дії: 24 години.
            </li>
            <li>
              <strong>_gat</strong> - Використовується Google Analytics для регулювання швидкості запитів. Термін дії: 1
              хвилина.
            </li>
          </ul>

          <h3>Маркетингові cookies</h3>
          <p>
            Наразі наш сайт не використовує маркетингові cookies. Якщо в майбутньому ми почнемо їх використовувати, ми
            оновимо цю політику з детальною інформацією про кожен такий cookie.
          </p>

          <h2>Сторонні cookies</h2>
          <p>
            Деякі cookies встановлюються сторонніми сервісами, які відображаються на наших сторінках. Ми не контролюємо
            розповсюдження цих cookies. Для отримання додаткової інформації ви повинні перевірити політику
            конфіденційності цих третіх сторін.
          </p>

          <h3>Google Analytics</h3>
          <p>
            Наш веб-сайт використовує Google Analytics, сервіс веб-аналітики, що надається Google, Inc. Google Analytics
            використовує cookies для аналізу використання нашого веб-сайту. Інформація, створена cookie про ваше
            використання нашого веб-сайту (включаючи вашу IP-адресу), буде передана та збережена Google на серверах у
            Сполучених Штатах.
          </p>
          <p>
            Google використовуватиме цю інформацію з метою оцінки вашого використання нашого веб-сайту, складання звітів
            про активність веб-сайту для операторів веб-сайтів та надання інших послуг, пов'язаних з актив��істю
            веб-сайту та використанням Інтернету. Google також може передавати цю інформацію третім особам, якщо це
            вимагається законом, або якщо такі треті особи обробляють інформацію від імені Google.
          </p>
          <p>
            Ви можете відмовитися від використання cookies Google Analytics, відвідавши сторінку
            <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer">
              відмови від Google Analytics
            </a>
            .
          </p>

          <h2>Як керувати cookies</h2>
          <p>Ви можете керувати своїми налаштуваннями cookies кількома способами:</p>
          <ul>
            <li>
              <strong>Через налаштування нашого сайту</strong> - Ви можете в будь-який момент змінити свої налаштування
              cookies, натиснувши на кнопку "Налаштування cookies" внизу сторінки.
            </li>
            <li>
              <strong>Через налаштування браузера</strong> - Більшість веб-браузерів дозволяють контролювати більшість
              cookies через налаштування браузера. Дізнайтеся, як керувати cookies у вашому браузері:
              <ul>
                <li>
                  <a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer">
                    Google Chrome
                  </a>
                </li>
                <li>
                  <a
                    href="https://support.mozilla.org/kb/cookies-information-websites-store-on-your-computer"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Mozilla Firefox
                  </a>
                </li>
                <li>
                  <a
                    href="https://support.microsoft.com/help/17442/windows-internet-explorer-delete-manage-cookies"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Internet Explorer
                  </a>
                </li>
                <li>
                  <a
                    href="https://support.apple.com/guide/safari/manage-cookies-and-website-data-sfri11471/mac"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Safari
                  </a>
                </li>
                <li>
                  <a
                    href="https://help.opera.com/en/latest/web-preferences/#cookies"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Opera
                  </a>
                </li>
              </ul>
            </li>
          </ul>

          <div className="bg-gray-50 p-6 rounded-lg mt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">Змінити налаштування cookies</h3>
              <p className="text-gray-600">
                Ви можете в будь-який момент змінити свої налаштування cookies для нашого сайту.
              </p>
            </div>
            <CookieSettingsButton />
          </div>

          <h2>Наслідки відключення cookies</h2>
          <p>
            Якщо ви вирішите відключити певні cookies, деякі функції нашого веб-сайту можуть не працювати належним
            чином. Наприклад, ви не зможете використовувати всі переваги веб-сайту або сервісів, які вимагають входу в
            сист��му.
          </p>
          <p>
            Відключення аналітичних cookies не вплине на вашу можливість використовувати наш веб-сайт, але це означає,
            що ми не зможемо отримувати інформацію про те, як ви використовуєте наш сайт, що може погіршити ваш досвід у
            довгостроковій перспективі.
          </p>

          <h2>Зміни до цієї Політики використання cookies</h2>
          <p>
            Ми можемо оновлювати нашу Політику використання cookies час від часу. Ми повідомимо вас про будь-які зміни,
            розмістивши нову Політику використання cookies на цій сторінці.
          </p>
          <p>
            Ми рекомендуємо вам періодично переглядати цю Політику використання cookies, щоб бути в курсі будь-яких
            змін.
          </p>

          <h2>Зв'язок з нами</h2>
          <p>Якщо у вас є питання щодо нашої Політики використання cookies, будь ласка, зв'яжіться з нами:</p>
          <ul>
            <li>Електронна пошта: serhiioberemchuk@gmail.com</li>
          </ul>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row gap-4">
          <Link href="/" className="text-green-500 hover:underline">
            ← Повернутися на головну
          </Link>
          <Link href="/privacy-policy" className="text-green-500 hover:underline">
            Політика конфіденційності
          </Link>
        </div>
      </div>
    </div>
  )
}
