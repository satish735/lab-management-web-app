import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '../lib/useUser'; // Custom hook for user info

const withAuth = (WrappedComponent, allowedRoles) => {
  return (props) => {
    const { user, loading } = useUser(); // Assume useUser provides user info
    const router = useRouter();

    useEffect(() => {
      if (!loading && (!user || !allowedRoles.includes(user.role))) {
        router.push('/403'); // Redirect to a forbidden page
      }
    }, [user, loading]);

    if (loading || !user || !allowedRoles.includes(user.role)) {
      return null; // Render nothing while loading or unauthorized
    }

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;




import withAuth from '../components/withAuth';

const AdminPage = () => {
  return <div>Admin Content</div>;
};

export default withAuth(AdminPage, ['admin']);
