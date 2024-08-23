import Faq from '@/layouts/Faq/faq';
export default function Home({ params = {}, searchParams = {} }) {
  return <div className="bg-white m-2 p-3"> <Faq searchParams={searchParams} /> </div>;
}
