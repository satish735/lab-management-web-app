import HealthBulletin from '@/layouts/health-bulletin/HealthBulletin';
export default function Home({ params = {}, searchParams = {} }) {
  return <div className="bg-white m-2 p-3"> <HealthBulletin searchParams={searchParams} /> </div>;
}
