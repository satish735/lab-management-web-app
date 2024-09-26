"use client";
import "@/styles/globals.css";
import "./AdminLayout.css";
import React, { useEffect, useState } from "react";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import Switch from "./layout-components/sidemenu-components/Switch";
import SidebarHeader from "./layout-components/sidemenu-components/SidebarHeader";
import Diamond from "./layout-components/sidemenu-icons/Diamond";
import BarChart from "./layout-components/sidemenu-icons/BarChart";
import Global from "./layout-components/sidemenu-icons/Global";
import InkBottle from "./layout-components/sidemenu-icons/InkBottle";
import Book from "./layout-components/sidemenu-icons/Book";
import Calendar from "./layout-components/sidemenu-icons/Calendar";
import ShoppingCart from "./layout-components/sidemenu-icons/ShoppingCart";
import Service from "./layout-components/sidemenu-icons/Service";
import SidebarFooter from "./layout-components/sidemenu-components/SidebarFooter";
import Badge from "./layout-components/sidemenu-components/Badge";
import Typography from "./layout-components/sidemenu-components/Typography";
import PackageBadges from "./layout-components/sidemenu-components/PackageBadges";
import AdminHeader from "./layout-components/AdminHeader";
import AdminFooter from "./layout-components/AdminFooter";
import defaultSideMenus from "@/utils/defaultSideMenus";
import { signOut, useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import matchDynamicPaths from "@/utils/matchDynamicPaths";
import Link from "next/link";
import { useMediaQuery } from "react-responsive";
import { Spinner } from "reactstrap";
import AdminSessionLoader from "./AdminSessionLoader";
import UnauthorizedRedirect from "./UnauthorizedRedirect";

const themes = {
  light: {
    sidebar: {
      backgroundColor: "#ffffff",
      color: "#607489",
    },
    menu: {
      menuContent: "#fbfcfd",
      icon: "#0098e5",
      hover: {
        backgroundColor: "#c5e4ff",
        color: "#44596e",
      },
      disabled: {
        color: "#9fb6cf",
      },
      [`&.active`]: {
        backgroundColor: "black",
        color: "#b6c8d9",
      },
      active: {
        backgroundColor: "black",
        color: "#44596e",
      },
    },
  },
  dark: {
    sidebar: {
      backgroundColor: "#0b2948",
      color: "#8ba1b7",
    },
    menu: {
      menuContent: "#082440",
      icon: "#59d0ff",
      hover: {
        backgroundColor: "#00458b",
        color: "#b6c8d9",
      },
      disabled: {
        color: "#3e5e7e",
      },
    },
  },
};

// hex to rgba converter
const hexToRgba = (hex, alpha) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

const AdminLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [toggled, setToggled] = useState(false);
  const [broken, setBroken] = useState(false);
  const [rtl, setRtl] = useState(false);
  const [hasImage, setHasImage] = useState(false);
  const [theme, setTheme] = useState("light");

  const isMobileScreen = useMediaQuery({ maxWidth: 880 });
  useEffect(() => {
    if (isMobileScreen) {
      setToggled(true);
    }
  }, []);
  // handle on RTL change event
  const handleRTLChange = (e) => {
    setRtl(e.target.checked);
  };

  // handle on theme change event
  const handleThemeChange = (e) => {
    setTheme(e.target.checked ? "dark" : "light");
  };

  // handle on image change event
  const handleImageChange = (e) => {
    setHasImage(e.target.checked);
  };

  const menuItemStyles = {
    root: {
      fontSize: "13px",
      fontWeight: 400,
    },
    icon: {
      color: themes[theme].menu.icon,
      "&.disabled": {
        color: themes[theme].menu.disabled.color,
      },
    },
    SubMenuExpandIcon: {
      color: "#b6b7b9",
    },
    subMenuContent: ({ level }) => ({
      backgroundColor:
        level === 0
          ? hexToRgba(
              themes[theme].menu.menuContent,
              hasImage && !collapsed ? 0.4 : 1
            )
          : "transparent",
    }),
    button: {
      "&.disabled": {
        color: themes[theme].menu.disabled.color,
      },
      "&:hover": {
        backgroundColor: hexToRgba(
          themes[theme].menu.hover.backgroundColor,
          hasImage ? 0.8 : 1
        ),
        color: themes[theme].menu.hover.color,
      },
      "&.ps-active": {
        backgroundColor: hexToRgba(
          themes[theme].menu.hover.backgroundColor,
          hasImage ? 0.8 : 1
        ),
        color: themes[theme].menu.hover.color,
      },
    },
    label: ({ open }) => ({
      fontWeight: open ? 600 : undefined,
    }),
  };

  const session = useSession();
  const pathname = usePathname();
  const router = useRouter();
  const onlyAdminPaths = [];
  var userRole = session?.data?.user?.role;
  useEffect(() => {
    switch (session?.status) {
      case "authenticated":
        if (!["admin", "adminuser"].includes(userRole)) {
          signOut({ redirect: true, callbackUrl: "/" });
        }
        if (userRole != "admin") {
          var checkIfRouteMatch = onlyAdminPaths.some((onlyAdminPathsItem) =>
            matchDynamicPaths(onlyAdminPathsItem, pathname)
          );
          if (checkIfRouteMatch) {
            router.push("/admin");
          }
        }
        break;
      case "unauthenticated":
        router.push("/login/admin");
        break;
    }
  }, [session?.status, pathname]);
  return (
    <div
      style={{
        display: "flex",
        height: "100%",
        direction: rtl ? "rtl" : "ltr",
      }}
      className="left-side-scroll-remove"
    >
      <Sidebar
        collapsedWidth={"75px"}
        collapsed={collapsed}
        toggled={toggled}
        onBackdropClick={() => setToggled(false)}
        onBreakPoint={setBroken}
        image="https://user-images.githubusercontent.com/25878302/144499035-2911184c-76d3-4611-86e7-bc4e8ff84ff5.jpg"
        rtl={rtl}
        breakPoint="sm"
        backgroundColor={hexToRgba(
          themes[theme].sidebar.backgroundColor,
          hasImage ? 0.9 : 1
        )}
        rootStyles={{
          color: themes[theme].sidebar.color,
          maxHeight: "100vh",
        }}
      >
        <div
          style={{ display: "flex", flexDirection: "column", height: "100%" }}
        >
          <SidebarHeader
            collapsed={collapsed}
            rtl={rtl}
            style={{ marginBottom: "24px", marginTop: "5px" }}
          />
          <div style={{ flex: 1, marginBottom: "24px" }}>
            {defaultSideMenus
              .filter(
                (subItem) =>
                  !subItem?.roles ||
                  subItem?.roles == "*" ||
                  subItem?.roles?.includes?.(userRole)
              )
              .map((parentItem, index) => {
                return {
                  head: (
                    <div
                      key={index}
                      style={{
                        padding: "0 24px",
                        marginBottom: "8px",
                        marginTop: "8px",
                      }}
                    >
                      <Typography
                        variant="body2"
                        fontWeight={600}
                        style={{
                          opacity: collapsed ? 0 : 0.7,
                          letterSpacing: "0.5px",
                        }}
                      >
                        {parentItem?.label}
                      </Typography>
                    </div>
                  ),
                  menu: (
                    <Menu menuItemStyles={menuItemStyles} key={index}>
                      <RecursiveMenuCreaterList list={parentItem?.menu ?? []} />
                    </Menu>
                  ),
                }[parentItem?.type];
              })}
          </div>
          {/* <SidebarFooter collapsed={collapsed} /> */}
        </div>
      </Sidebar>

      <main
        style={{
          maxHeight: "100vh",
          position: "relative",
          width: "100%",
          overflow: "auto",
          background: "#f1f6ee",
        }}
      >
        <AdminHeader
          isMobile={broken}
          mobileToggle={() => setToggled(!toggled)}
          collapsed={collapsed}
          collapsedToggle={() => setCollapsed(!collapsed)}
        />
        <div
          style={{
            padding: "8px",
            color: "#44596e",
            minHeight: "calc(100vh - 115px)",
          }}
        >
          {
            {
              unauthenticated: <UnauthorizedRedirect />,
              loading: <AdminSessionLoader />,
              authenticated: children,
            }[session?.status]
          }
        </div>
        <AdminFooter />
      </main>
    </div>
  );
};

const RecursiveMenuCreaterList = ({ list }) => {
  const session = useSession();
  const pathname = usePathname();
  var userRole = session?.data?.user?.role;
  const getAllLinks = (obj) =>
    obj?.menu?.flatMap((item) =>
      item.type === "sub"
        ? [item.link]
        : item.menu
        ? getAllLinks({ menu: item.menu })
        : []
    ) || [];
  const checkAllObjectRecursive = (obj) => {
    var traversedlinks = getAllLinks(obj);
    return Array.isArray(traversedlinks)
      ? traversedlinks.includes(pathname)
      : false;
  };
  return (
    <>
      {list
        .filter(
          (subItem) =>
            !subItem?.roles ||
            subItem?.roles == "*" ||
            subItem?.roles?.includes?.(userRole)
        )
        .map((subItem, index) => {
          var isOpenOrActive =
            subItem?.type == "main"
              ? checkAllObjectRecursive(subItem)
              : pathname == subItem?.link;

          return {
            main: (
              <SubMenu
                active={isOpenOrActive}
                defaultOpen={isOpenOrActive}
                key={index}
                icon={subItem?.icon}
                disabled={subItem?.disabled}
                suffix={subItem?.suffix}
                label={subItem?.label}
              >
                <RecursiveMenuCreaterList list={subItem?.menu} />
              </SubMenu>
            ),
            sub: (
              <MenuItem
                active={isOpenOrActive}
                href={subItem?.link}
                key={index}
                icon={subItem?.icon}
                disabled={subItem?.disabled}
                suffix={subItem?.suffix}
                component={<Link />}
              >
                {/* <a  style={{ color: "inherit", textDecoration: "none" }}> */}
                {subItem?.label}
                {/* </a> */}
              </MenuItem>
            ),
          }[subItem?.type];
        })}
    </>
  );
};

export default AdminLayout;
