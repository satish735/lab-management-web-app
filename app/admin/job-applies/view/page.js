

import JobApplyComponent from "@/components/admin/job-apply-component/JobApplyComponent";

 
export default function Home({ searchParams }) {
    return <div> 
        <JobApplyComponent searchParams={searchParams} />
    </div>;
}
