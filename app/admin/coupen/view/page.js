
import CoupenComponent from "@/components/admin/coupen-component/CoupenComponent";


export default function Home({ searchParams }) {
    return <div>
        <CoupenComponent searchParams={searchParams} />
    </div>;
}

