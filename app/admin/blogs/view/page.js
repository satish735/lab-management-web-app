import ViewEditBlogs from "@/components/admin/blogs-component/ViewEditBlogs";

 
export default function Home({ searchParams }) {
    return <div> 
        <ViewEditBlogs searchParams={searchParams} />
    </div>;
}
