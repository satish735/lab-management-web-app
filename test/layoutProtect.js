import { useUser } from '../lib/useUser';
import { useRouter } from 'next/navigation';

const ProtectedLayout = ({ children }) => {
    const { user, loading } = useUser();
    const router = useRouter();

    if (loading) return <div>Loading...</div>;
    if (!user) return <div>Unauthorized</div>;

    return <>{children}</>;
};

export default ProtectedLayout;


// Example page: app/admin/page.js
import ProtectedLayout from '../components/ProtectedLayout';

const AdminPage = () => {
    return (
        <ProtectedLayout>
            <div>Admin Content</div>
        </ProtectedLayout>
    );
};

export default AdminPage;
