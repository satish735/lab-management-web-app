import View from '@/layouts/health-bulletin/View';
export default function Home({ params = {}, searchParams = {} }) {
    return <div className="bg-white m-2 p-3">
        <View searchParams={searchParams} />
    </div>;
}


