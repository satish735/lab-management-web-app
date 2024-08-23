import ViewFaq from '@/layouts/Faq/ViewFaq';

export default function Home({ params = {}, searchParams = {} }) {
    return <div className="bg-white m-2 p-3">
        <ViewFaq searchParams={searchParams} />
    </div>;
}


