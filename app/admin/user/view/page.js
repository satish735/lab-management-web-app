

 import UserComponent from "@/components/admin/user-component/UserComponent";

 
export default function Home({ searchParams }) {
    return <div> 
        <UserComponent searchParams={searchParams} />
    </div>;
}

