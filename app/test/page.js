import MenuItems from "@/components/multilevel-dropdown/MenuItems";
import MultiLevelDropDown from "@/components/multilevel-dropdown/MultiLevelDropDown";
// import "@/components/multilevel-dropdown/CustomDropdown.css";
const menuItems = [
  {
    type: "parent",
    label: "Parent menu 1",
    menu: [{ label: "Menu Item 4", href: "#" }],
  },
  {
    type: "parent",
    label: "Parent menu 2",
    menu: [{ label: "Menu Item 4", href: "#" }],
  },
  {
    type: "parent",
    label: "Parent menu 3",
    menu: [{ label: "Menu Item 4", href: "#" }],
  },
  {
    type: "parent",
    label: "Parent menu 4",
    menu: [{ label: "Menu Item 4", href: "#" }],
  },
  {
    type: "parent",
    label: "Parent menu 5",
    menu: [{ label: "Menu Item 4", href: "#" }],
  },
  {
    type: "parent",
    label: "Parent menu 6",
    menu: [{ label: "Menu Item 4", href: "#" }],
  },
  {
    type: "parent",
    label: "Parent menu 7",
    menu: [
      { label: "Menu Item 1 ", href: "#" },
      { label: "Menu Item 2", href: "#" },
      { label: "Menu Item 3", href: "#" },
      { label: "Menu Item 4", href: "#" },
      {
        label: "Sub Menu 1",
        href: "#",
        type: "sub-menu",
        menu: [
          { label: "Menu Item 5", href: "#" },
          { label: "Menu Item 6", href: "#" },
          { label: "Menu Item 7", href: "#" },
          { label: "Menu Item 8", href: "#" },
        ],
      },
      {
        label: "Sub Menu 2",
        href: "#",
        type: "sub-menu",
        menu: [
          { label: "Menu Item 9", href: "#" },
          { label: "Menu Item 10", href: "#" },
          { label: "Menu Item 11", href: "#" },
          {
            label: "Sub menu 3",
            href: "#",
            type: "sub-menu",
            menu: [
              { label: "Menu Item 9", href: "#" },
              { label: "Menu Item 10", href: "#" },
              { label: "Menu Item 11", href: "#" },
            ],
          },
        ],
      },
    ],
  },
];

export default function Test() {
  return (
    <div>
      <MultiLevelDropDown data={menuItems} />
    </div>
  );
}
