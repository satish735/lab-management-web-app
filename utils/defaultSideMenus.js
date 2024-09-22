import Book from "@/layouts/layout-components/sidemenu-icons/Book";
import Icon from "@/layouts/layout-components/sidemenu-icons/Icon";

import { FaSquarePollVertical, FaCalendarDay, FaTicket, FaCoins, FaUsers, FaBuilding, FaBriefcase, FaFlaskVial, FaHandHoldingMedical, FaLungs, FaBlogger } from "react-icons/fa6";
import { FaHouseUser, FaHospitalUser, FaUser, FaQuestion, FaTags } from "react-icons/fa"
import { TbLayoutDashboardFilled, TbReportSearch, TbPackages } from "react-icons/tb";

const defaultSideMenus = [
  { type: "head", label: "Analytics", },
  {
    type: "menu",
    menu: [
      {
        type: "sub",
        label: "Dashboard",
        icon: <TbLayoutDashboardFilled className="admin-left-menu-icon" />,
        link: "/admin",

      },
      {
        type: "sub",
        label: "Analytics",
        icon: <FaSquarePollVertical className="admin-left-menu-icon" />,
        link: "/admin/analytics",
        roles: ["admin"],
      },
    ],
  },
  { type: "head", label: "Bookings" },
  {
    type: "menu",
    menu: [
      {
        type: "sub",
        label: "Slots",
        icon: <FaCalendarDay className="admin-left-menu-icon" />,
        link: "/admin/slots"
      },
      {
        type: "sub",
        label: "Bookings",
        icon: <FaTags className="admin-left-menu-icon" />,
        link: "/admin/bookings"
      },
      {
        type: "sub",
        label: "Home Collections",
        icon: <FaHouseUser className="admin-left-menu-icon" />,
        link: "/admin/home-collections"
      },
      {
        type: "sub",
        label: "Transactions",
        icon: <FaCoins className="admin-left-menu-icon" />,
        link: "/admin/transactions"
      },]
  },
  { type: "head", label: "Package" },
  {
    type: "menu",
    menu: [
      {
        type: "sub",
        label: "Package & Tests",
        icon: <FaFlaskVial className="admin-left-menu-icon" />,
        link: "/admin/tests"
      },
      {
        type: "sub",
        label: "Test Conditions",
        icon: <TbReportSearch className="admin-left-menu-icon" />,
        link: "/admin/test-condition"
      },
      {
        type: "sub",
        label: "Body Parts",
        icon: <FaLungs className="admin-left-menu-icon" />,
        link: "/admin/body-parts"
      },
      {
        type: "sub",
        label: "Package Categories",
        icon: <TbPackages className="admin-left-menu-icon" />,
        link: "/admin/package-category"
      },]
  },
  { type: "head", label: "Resource & Policies" },
  {
    type: "menu",
    menu: [
      {
        type: "sub",
        label: "Blogs",
        icon: <FaBlogger className="admin-left-menu-icon" />,
        link: "/admin/blogs"
      },
      // {
      //   type: "sub",
      //   label: "Health Bulletins",
      //   icon: <FaHandHoldingMedical className="admin-left-menu-icon" />,
      //   link: "/admin/healthbulletin"
      // },
      {
        type: "sub",
        label: "FAQ's",
        icon: <FaQuestion className="admin-left-menu-icon" />,
        link: "/admin/faq"
      },
      {
        type: "sub",
        label: "Coupons",
        icon: <FaTicket className="admin-left-menu-icon" />,
        link: "/admin/coupen"
      },
    ]
  },
  { type: "head", label: "Admin Control" },
  {
    type: "menu",
    menu: [
      {
        type: "main",
        label: "Openings",
        icon: <FaBriefcase className="admin-left-menu-icon" />,

        menu: [
          {
            type: "sub",
            label: "Job Posts",
            link: "/admin/job-posts"
          },
          // {
          //   type: "sub",
          //   label: "Job Roles",
          //   link: "/admin/job-roles"
          // },
        ],
      },
      {
        type: "main",
        label: "Company Details",
        icon: <FaBuilding className="admin-left-menu-icon" />,

        menu: [
          {
            type: "sub",
            label: "Awards & Acrediations",
            link: "/admin/awardaccreditation"
          },
          {
            type: "sub",
            label: "Milestones",
            link: "/admin/milestones"
          },
          {
            type: "sub",
            label:"Partner with Us",
            link:"/admin/partnerwithus"
          }
        ],
      },
      {
        type: "main",
        label: "Users",
        icon: <FaUsers className="admin-left-menu-icon" />,
        menu: [
          {
            type: "sub",
            label: "Patients",
            link: "/admin"
          },
          // {
          //   type: "sub",
          //   label: "Staff Members",
          //   link: "/admin/teammember"
          // },
          {
            type: "sub",
            label: "Admin Users",
            link: "/admin/user"
          },
        ],
      },
      {
        type: "main",
        label: "Centers & Locations",
        icon: <FaHospitalUser className="admin-left-menu-icon" />,
        menu: [
          {
            type: "sub",
            label: "Centers",
            link: "/admin/centers"
          }
   

        ],
      },
      {
        type: "sub",
        label: "User Profile",
        icon: <FaUser className="admin-left-menu-icon" />,
        link: "/admin/profile"
      },
    ]
  },
  // old
  // { type: "head", label: "Operations" },
  // {
  //   type: "menu",
  //   menu: [
  //     {
  //       type: "main",
  //       label: "Dashboard",
  //       icon: <Book />,
  //       menu: [
  //         {
  //           type: "sub",
  //           label: "Overview",

  //         },
  //         {
  //           type: "sub",
  //           label: "Analytics",
  //         },
  //       ],
  //     },

  //     {
  //       type: "sub",
  //       label: "Bookings",
  //       icon: <Book />,
  //       link: "/admin/bookings"


  //     },
  //     {
  //       type: "main",
  //       label: "User Management",
  //       icon: <Book />,

  //       menu: [
  //         {
  //           type: "sub",
  //           label: "Staff Members",
  //           link: "/admin/teammember"


  //         },
  //         {
  //           type: "sub",
  //           label: "Users",
  //           link: "/admin/user"


  //         },
  //         {
  //           type: "sub",
  //           label: "Patients",
  //         },
  //         {
  //           type: "sub",
  //           label: "Account Settings",
  //         },
  //       ],
  //     },
  //     {
  //       type: "main",
  //       label: "Test Management",
  //       icon: <Book />,

  //       menu: [

  //         {
  //           type: "sub",
  //           label: "Packages & Tests",
  //           link: "/admin/tests"

  //         },
  //         {
  //           type: "sub",
  //           label: "Test Conditions",
  //           link: "/admin/test-condition"

  //         },
  //         {
  //           type: "sub",
  //           label: "Coupens",
  //           link: "/admin/coupens"

  //         },
  //       ],
  //     },
  //     {
  //       type: "main",
  //       label: "Centers & Locations",
  //       icon: <Book />,

  //       menu: [
  //         {
  //           type: "sub",
  //           label: "Centers",
  //           link: "/admin/centers"


  //         },
  //         {
  //           type: "sub",
  //           label: "Cities",
  //         },
  //         {
  //           type: "sub",
  //           label: "Time Slots",
  //         },
  //       ],
  //     },
  //   ],
  // },
  // { type: "head", label: "Administration" },
  // {
  //   type: "menu",
  //   menu: [
  //     {
  //       type: "main",
  //       label: "Career Management",
  //       icon: <Book />,

  //       menu: [
  //         {
  //           type: "sub",
  //           label: "Job Posts",
  //           link: "/admin/job-posts"
  //         },
  //         {
  //           type: "sub",
  //           label: "Awards",
  //           link: "/admin/awardaccreditation"
  //         },
  //         {
  //           type: "sub",
  //           label: "Milestones",
  //           link: "/admin/milestones"
  //         },
  //       ],
  //     },
  //     {
  //       type: "main",
  //       label: "Resources & Policies",
  //       icon: <Book />,

  //       menu: [
  //         {
  //           type: "sub",
  //           label: "Blogs",
  //           link: "/admin/blogs"
  //         },
  //         {
  //           type: "sub",
  //           label: "Health Bulletin",
  //           link: "/admin/healthbulletin"
  //         },
  //         {
  //           type: "sub",
  //           label: "FAQs",
  //           link: "/admin/faq"

  //         },

  //         {
  //           type: "sub",
  //           label: "Policies",
  //         },
  //         {
  //           type: "sub",
  //           label: "Terms and Conditions",
  //         },
  //         {
  //           type: "sub",
  //           label: "Company Profile",
  //         },
  //       ],
  //     },
  //     {
  //       type: "main",
  //       label: "Support & Contact",
  //       icon: <Book />,

  //       menu: [
  //         {
  //           type: "sub",
  //           label: "Contact Us",
  //         },
  //       ],
  //     },
  //     {
  //       type: "main",
  //       label: "Master Data Management",
  //       icon: <Book />,

  //       menu: [
  //         {
  //           type: "sub",
  //           label: "States",
  //         },
  //         {
  //           type: "sub",
  //           label: "Facilities",
  //         },
  //         {
  //           type: "sub",
  //           label: "Package Categories",
  //           link: '/admin/package-category'

  //         },
  //         {
  //           type: "sub",
  //           label: "Body Parts",
  //           link: '/admin/body-parts'
  //         },

  //         {
  //           type: "sub",
  //           label: "Test Condition",
  //           link: "/admin/test-condition"

  //         },
  //         {
  //           type: "sub",

  //           label: "Memberships",
  //           link: "/admin/membership"

  //         },
  //       ],
  //     },
  //   ],
  // },
];

export default defaultSideMenus;
