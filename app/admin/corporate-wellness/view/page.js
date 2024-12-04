import CorporateComponent from "@/components/admin/partners-view-component/CorporateComponent";
 

export default function Home({ searchParams }) {
    return <div>
        <CorporateComponent searchParams={searchParams} />
    </div>;
}
