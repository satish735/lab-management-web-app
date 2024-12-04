import HospitalComponent from "@/components/admin/partners-view-component/HospitalComponent";


export default function Home({ searchParams }) {
    return <div>
        <HospitalComponent searchParams={searchParams} />
    </div>;
}
