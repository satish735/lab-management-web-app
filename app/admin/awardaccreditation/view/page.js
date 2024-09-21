import View from '@/layouts/awardaccreditation/View';
import BreadcrumbDiv from '@/components/BreadcrumbDiv'

export default function Home({ params = {}, searchParams = {} }) {
    return (
        <>

            <BreadcrumbDiv
                options={[
                    { label: "Home", link: "/admin" },
                    { label: "Award Accreditationn", link: "/admin/awardaccreditation" },
                    { label: "Create Award Accreditationn", link: "/admin/awardaccreditation/view", active: true },
                ]}
            />
            <div className="bg-white m-2 p-3">
                <View searchParams={searchParams} />
            </div>
        </>
    )
}


