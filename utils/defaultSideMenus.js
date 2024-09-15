import Book from "@/layouts/layout-components/sidemenu-icons/Book";
import Icon from "@/layouts/layout-components/sidemenu-icons/Icon";
const defaultSideMenus = [
  { type: "head", label: "Analytics", },
  {
    type: "menu",
    menu: [
      {
        type: "sub",
        label: "Dashboard",
        icon: <Book />,
        link: "/admin",
      
      },
      {
        type: "sub",
        label: "Analytics",
        icon: <Book />,
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
        icon: <Book />,
        link: "/admin/slots"
      },
      {
        type: "sub",
        label: "Bookings",
        icon: <Book />,
        link: "/admin/bookings"
      },
      {
        type: "sub",
        label: "Home Collections",
        icon: <Book />,
        link: "/admin/home-collections"
      },
      {
        type: "sub",
        label: "Transactions",
        icon: <Book />,
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
        icon: <Book />,
        link: "/admin/tests"
      },
      {
        type: "sub",
        label: "Test Conditions",
        icon: <Book />,
        link: "/admin/test-condition"
      },
      {
        type: "sub",
        label: "Body Parts",
        icon: <Book />,
        link: "/admin/body-parts"
      },
      {
        type: "sub",
        label: "Package Categories",
        icon: <Book />,
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
        icon: <Book />,
        link: "/admin/blogs"
      },
      {
        type: "sub",
        label: "Health Bulletins",
        icon: <Book />,
        link: "/admin/healthbulletin"
      },
      {
        type: "sub",
        label: "FAQ's",
        icon: <Book />,
        link: "/admin/faq"
      },
      {
        type: "sub",
        label: "Coupons",
        icon: <Book />,
        link: "/admin/coupon"
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
        icon: <Book />,

        menu: [
          {
            type: "sub",
            label: "Job Posts",
            link: "/admin/job-posts"
          },
          {
            type: "sub",
            label: "Job Roles",
            link: "/admin/job-roles"
          },
        ],
      },
      {
        type: "main",
        label: "Company Details",
        icon: <Book />,

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
        ],
      },
      {
        type: "main",
        label: "Users",
        icon: <Book />,
        menu: [
          {
            type: "sub",
            label: "Patients",
            link: "/admin/user"
          },
          {
            type: "sub",
            label: "Staff Members",
            link: "/admin/teammember"
          },
          {
            type: "sub",
            label: "Admin Users",
            link: "/admin/admin-users"
          },
        ],
      },
      {
        type: "main",
        label: "Centers & Locations",
        icon: <Book />,
        menu: [
          {
            type: "sub",
            label: "Centers",
            link: "/admin/centers"
          },

        ],
      },
      {
        type: "sub",
        label: "User Profile",
        icon: <Book />,
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
