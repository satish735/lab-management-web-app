import ViewEditMilestone from "@/components/admin/create-milestone/ViewEditMilestone";

 
export default function Home({ searchParams }) {
    return <div> 
        <ViewEditMilestone searchParams={searchParams} />
    </div>;
}
