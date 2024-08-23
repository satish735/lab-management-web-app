import UserFooter from "./layout-components/UserFooter";
import UserHeader2 from "./layout-components/UserHeader2";
import UserSvg from "./layout-components/UserSvg";
const UserLayout = ({ children }) => {
  return (
    <>
      <UserHeader2 />
      <main
        style={{
          overflow: "visible !important",
        }}
      >
        {children}
      </main>
      <UserFooter />
      <UserSvg />
    </>
  );
};

export default UserLayout;
