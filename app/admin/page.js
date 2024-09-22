import PackageBadges from "@/layouts/layout-components/sidemenu-components/PackageBadges";
import Typography from "@/layouts/layout-components/sidemenu-components/Typography";
import Packages from '@/layouts/Test Management/Packages';

export default function Home() {
  return (
    <div>
       <div className="admin-content-box">
        <Typography variant="h4" fontWeight={600}>
          Copy Path lab project
        </Typography>
        <Typography variant="body2">
          Project dashboard for managing labs
        </Typography>
        <PackageBadges />
      </div>
    </div>
  );
}
