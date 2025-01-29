import { setStaticParamsLocale } from 'next-international/server';
import { getI18n, getScopedI18n, getCurrentLocale, getStaticParams } from '../../locales/server';

// Uncomment to test Static Generation on this page only
export async function generateStaticParams() {
  "use server"
  return getStaticParams();
}

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  "use server"
  const { locale } = await params;

  // Uncomment to test Static Generation
  setStaticParamsLocale(locale);

  const t = await getI18n();
  const t2 = await getScopedI18n('scope.more');
  const currentLocale = getCurrentLocale();

  return (
    <div>
      <h1>SSR / SSG</h1>
      <p>
        Current locale:
        <span>{currentLocale}</span>
      </p>
      <p>Hello: {t('hello')}</p>
      <p>
        Hello:{' '}
        {t('welcome', {
          name: 'John',
        })}
      </p>
      <p>{t2('test')}</p>
    </div>
  );
}
