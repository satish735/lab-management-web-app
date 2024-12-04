

 import PatientComponent from "@/components/admin/patient-component/PatientComponent";

 
export default function Home({ searchParams }) {
    return <div> 
        <PatientComponent searchParams={searchParams} />
    </div>;
}

