

import JobPostComponent from "@/components/admin/job-apply-component/JobPostComponent";

 
export default function Home({ searchParams }) {
    return <div> 
        <JobPostComponent searchParams={searchParams} />
    </div>;
}

