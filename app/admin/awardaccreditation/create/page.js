import Create from '@/layouts/awardaccreditation/Create';
export default function Home({ params = {}, searchParams = {} }) {
  return <div className="bg-white m-2 p-3"> <Create searchParams={searchParams} /> </div>;
}
