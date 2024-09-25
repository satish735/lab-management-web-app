import LoginLayout from '@/layouts/LoginLayout';

export default function MainLayoutWrapper({ children }) {
  return <LoginLayout>{children}</LoginLayout>;
}