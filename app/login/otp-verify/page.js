import OTPForm from "@/components/auth/OTPForm";

export default function Home({ params = {}, searchParams = {} }) {
  return <OTPForm searchParams={searchParams} />;
}
