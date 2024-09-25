import BreadcrumbDiv from "@/components/BreadcrumbDiv";
import AnalyticsPage from "@/components/dashboard/AnalyticsPage";
import PackageBadges from "@/layouts/layout-components/sidemenu-components/PackageBadges";
import Typography from "@/layouts/layout-components/sidemenu-components/Typography";
import Packages from '@/layouts/Test Management/Packages';

export default function Home() {
    return (
        <div>
            <BreadcrumbDiv
                options={[
                    { label: "Home", link: "/admin" },
                    { label: "Analytics",  active: true},

                ]}
            />
            <AnalyticsPage />
        </div>
    );
}
