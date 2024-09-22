
import BreadcrumbDiv from "@/components/BreadcrumbDiv";
import HomeCollectionPage from "@/components/home-collection/view/HomeCollectionPage";
export default function Home({ params }) {
    return (
        <div>
            <BreadcrumbDiv
                options={[
                    { label: "Home", link: "/admin" },
                    { label: "Home Collections", link: "/admin/home-collections", active: false },
                    { label: params?.collectionId, link: `/admin/home-collections/${params?.collectionId}`, active: true },

                ]}
            />
            <div className="admin-content-box">
                <h1 className="main-heading">Home Collection - {params?.collectionId}</h1>
                <p className="sub-heading">Home Collection Details.</p>
                <HomeCollectionPage CollectionId={params?.collectionId} />
            </div>
        </div>
    );
}
