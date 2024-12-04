

import ContactUsPageComponent from "@/components/admin/contact-us-component/ContactUsPageComponent";
 
 
export default function Home({ searchParams }) {
    return <div> 
        <ContactUsPageComponent searchParams={searchParams} />
    </div>;
}

