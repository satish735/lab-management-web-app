import BreadcrumbDiv from "@/components/BreadcrumbDiv";
import CreateCenter from "@/components/create-centers/CreateCenter";


export default function Home() {
    return <div>
         <BreadcrumbDiv
        options={[
          { label: "Home", link: "/admin" },
          { label: "Centers", link: "/admin/centers"},
          { label: "Create Centers", link: "/admin/create/centers", active: true },
        ]}
      />
        <CreateCenter />
    </div>;
}
