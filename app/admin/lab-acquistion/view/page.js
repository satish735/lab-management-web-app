import LabPartnerComponent from "@/components/admin/partners-view-component/LabPartnerComponent";


export default function Home({ searchParams }) {
    return <div>
        <LabPartnerComponent searchParams={searchParams} />
    </div>;
}
