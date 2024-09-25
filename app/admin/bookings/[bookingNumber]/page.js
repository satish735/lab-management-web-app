import BookingPage from "@/components/bookings/view/BookingPage";
import BreadcrumbDiv from "@/components/BreadcrumbDiv";



export default function Home({ params }) {
    return (
        <div>
            <BreadcrumbDiv
                options={[
                    { label: "Home", link: "/admin" },
                    { label: "Bookings", link: "/admin/bookings", active: false },
                    { label: params?.bookingNumber, link: `/admin/bookings/${params?.bookingNumber}`, active: true },

                ]}
            />
            <div className="admin-content-box">
                <h1 className="main-heading">Booking - {params?.bookingNumber}</h1>
                <p className="sub-heading">Boking Details.</p>
                <BookingPage bookingNumber={params?.bookingNumber} />
            </div>
        </div>
    );
}
