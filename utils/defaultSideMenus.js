import Book from "@/layouts/layout-components/sidemenu-icons/Book";
import Icon from "@/layouts/layout-components/sidemenu-icons/Icon";

const defaultSideMenus = [
  { type: "head", label: "Operations" },
  {
    type: "menu",
    menu: [
      {
        type: "main",
        label: "Dashboard",
        icon: <Book />,
        menu: [
          {
            type: "sub",
            label: "Overview",

          },
          {
            type: "sub",
            label: "Analytics",
          },
        ],
      },
      {
        type: "main",
        label: "User Management",
        icon: <Book />,

        menu: [
          {
            type: "sub",
            label: "Staff Members",
            link: "/admin/teammember"


          },
          {
            type: "sub",
            label: "Patients",
          },
          {
            type: "sub",
            label: "Account Settings",
          },
        ],
      },
      {
        type: "main",
        label: "Test Management",
        icon: <Book />,

        menu: [
          {
            type: "sub",
            label: "Packages",
            link: "/admin/blogs"

          },
          {
            type: "sub",
            label: "Tests",
            link: "/admin/tests"

          },
          {
            type: "sub",
            label: "Test Conditions",
            link: "/admin/test-condition"

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
          {
            type: "sub",
            label: "Cities",
          },
          {
            type: "sub",
            label: "Time Slots",
          },
        ],
      },
    ],
  },
  { type: "head", label: "Administration" },
  {
    type: "menu",
    menu: [
      {
        type: "main",
        label: "Career Management",
        icon: <Book />,

        menu: [
          {
            type: "sub",
            label: "Job Posts",
          },
          {
            type: "sub",
            label: "Awards",
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
        label: "Resources & Policies",
        icon: <Book />,

        menu: [
          {
            type: "sub",
            label: "Blogs",
            link: "/admin/blogs"
          },
          {
            type: "sub",
            label: "Health Bulletin",
            link: "/admin/healthbulletin"
          },
          {
            type: "sub",
            label: "FAQs",
            link: "/admin/faq"

          },
         
          {
            type: "sub",
            label: "Policies",
          },
          {
            type: "sub",
            label: "Terms and Conditions",
          },
          {
            type: "sub",
            label: "Company Profile",
          },
        ],
      },
      {
        type: "main",
        label: "Support & Contact",
        icon: <Book />,

        menu: [
          {
            type: "sub",
            label: "Contact Us",
          },
        ],
      },
      {
        type: "main",
        label: "Master Data Management",
        icon: <Book />,

        menu: [
          {
            type: "sub",
            label: "States",
          },
          {
            type: "sub",
            label: "Facilities",
          },
          {
            type: "sub",
            label: "Package Categories",
            link: '/admin/package-category'

          },
          {
            type: "sub",
            label: "Body Parts",
            link: '/admin/body-parts'
          },
         
          {
            type: "sub",
            label: "Test Condition",
            link: "/admin/test-condition"

          },
          {
            type: "sub",

            label: "Memberships",
            link: "/admin/membership"

          },
        ],
      },
    ],
  },
];

export default defaultSideMenus;
