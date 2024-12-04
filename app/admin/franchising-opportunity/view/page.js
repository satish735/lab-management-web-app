 import FranchiseComponent from "@/components/admin/partners-view-component/FranchiseComponent";

 
export default function Home({ searchParams }) {
    return <div> 
        <FranchiseComponent searchParams={searchParams} />
    </div>;
}
