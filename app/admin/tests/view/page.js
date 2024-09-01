 import ViewEdit from "@/layouts/Test Management/viewEdit/viewEdit";

export default function Home({ searchParams }) {
    return <div> 
        <ViewEdit searchParams={searchParams} />
    </div>;
}
