import BreadcrumbDiv from "@/components/BreadcrumbDiv";
import DashBoardPage from "@/components/dashboard/DashBoardPage";
import PackageBadges from "@/layouts/layout-components/sidemenu-components/PackageBadges";
import Typography from "@/layouts/layout-components/sidemenu-components/Typography";
import Packages from '@/layouts/Test Management/Packages';

export default function Home() {
  return (
    <div>
      <BreadcrumbDiv
        options={[
          { label: "DashBoard", link: "/admin" },
        ]}
      />
      <DashBoardPage />
    </div>
  );
}
