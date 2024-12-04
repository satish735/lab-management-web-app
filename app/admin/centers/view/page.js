

import CentersComponent from "@/components/admin/centers-component/CentersComponent";


export default function Home({ searchParams }) {
  return <div>
    <CentersComponent searchParams={searchParams} />
  </div>;
}


