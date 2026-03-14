import {getTranslations} from "next-intl/server";
import {Link} from "@/i18n/navigation";

type NotFoundPageProps = {
  params: Promise<{locale: string}>;
};

export default async function NotFoundPage({params}: NotFoundPageProps) {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: "NotFoundPage"});

  return (
    <div className="container mx-auto max-w-3xl py-20 text-center">
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{t("title")}</h1>
      <p className="mt-4 text-gray-600">{t("description")}</p>
      <div className="mt-8">
        <Link href="/" className="text-green-600 hover:text-green-700">
          {t("backHome")}
        </Link>
      </div>
    </div>
  );
}
