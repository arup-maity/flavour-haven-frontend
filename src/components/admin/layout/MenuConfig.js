import { LuUsers2 } from "react-icons/lu";
import { IoTicketOutline } from "react-icons/io5";
import { MdFlightLand, MdFlight, MdConnectingAirports, MdOutlineLocationCity, MdOutlineDashboardCustomize } from "react-icons/md";

const AdminMenu = [
   {
      id: "user",
      title: "User",
      icon: <LuUsers2 size={20} />,
      permissions: ["administrator", "admin"],
      children: [
         {
            id: 'customers',
            title: 'Customers',
            icon: <IoTicketOutline size='8' />,
            permission: ['administrator', 'admin'],
            Link: '/admin/users/customers',
            navLink: '/admin/users/customers'
         },
         {
            id: 'management',
            title: 'Management',
            icon: <IoTicketOutline size='8' />,
            permission: ['administrator', 'admin'],
            Link: '/admin/users/managements',
            navLink: '/admin/users/managements'
         },
      ]
   },
];

export default AdminMenu;
