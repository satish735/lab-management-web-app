import FaqComponent from "@/components/admin/faq-component/FaqComponent";
 

export default function Home({ searchParams }) {
    return <div>
        <FaqComponent searchParams={searchParams} />
    </div>;
}

