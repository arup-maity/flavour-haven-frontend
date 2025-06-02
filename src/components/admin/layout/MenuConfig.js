import { LuUsers2 } from "react-icons/lu";
import { IoTicketOutline } from "react-icons/io5";
import { MdFlightLand, MdFlight, MdConnectingAirports, MdOutlineLocationCity, MdOutlineDashboardCustomize } from "react-icons/md";

const AdminMenu = [
   {
      id: "admin",
      title: "Dashboard",
      icon: <LuUsers2 size={20} />,
      permissions: ["administrator", "admin"],
      Link: '/admin',
      navLink: '/admin'
   },
   {
      id: "table",
      title: "Table Bookings",
      icon: <LuUsers2 size={20} />,
      permissions: ["administrator", "admin"],
      children: [
         {
            id: 'booking-requests',
            title: 'Booking Requests',
            icon: <IoTicketOutline size='8' />,
            permission: ['administrator', 'admin'],
            Link: '/admin/table/booking-requests',
            navLink: '/admin/table/booking-requests'
         },
         {
            id: 'booking-list',
            title: 'Booking List',
            icon: <IoTicketOutline size='8' />,
            permission: ['administrator', 'admin'],
            Link: '/admin/table/booking-list',
            navLink: '/admin/table/booking-list'
         },
      ]
   },
   {
      id: "order",
      title: "Orders",
      icon: <LuUsers2 size={20} />,
      permissions: ["administrator", "admin"],
      children: [
         {
            id: 'order-requests',
            title: 'Order Requests',
            icon: <IoTicketOutline size='8' />,
            permission: ['administrator', 'admin'],
            Link: '/admin/order/order-requests',
            navLink: '/admin/order/order-requests'
         },
         {
            id: 'orders-list',
            title: 'Order List',
            icon: <IoTicketOutline size='8' />,
            permission: ['administrator', 'admin'],
            Link: '/admin/order/orders-list',
            navLink: '/admin/order/orders-list'
         },
      ]
   },
   {
      id: "dishes",
      title: "Dishes",
      icon: <LuUsers2 size={20} />,
      permissions: ["administrator", "admin"],
      children: [
         {
            id: 'edit-dish',
            title: 'Add Dish',
            icon: <IoTicketOutline size='8' />,
            permission: ['administrator', 'admin'],
            Link: '/admin/dishes/edit-dish',
            navLink: '/admin/dishes/edit-dish'
         },
         {
            id: 'dishes-list',
            title: 'Dishes List',
            icon: <IoTicketOutline size='8' />,
            permission: ['administrator', 'admin'],
            Link: '/admin/dishes/dishes-list',
            navLink: '/admin/dishes/dishes-list'
         },
         {
            id: 'category-list',
            title: 'Category List',
            icon: <IoTicketOutline size='8' />,
            permission: ['administrator', 'admin'],
            Link: '/admin/dishes/category-list',
            navLink: '/admin/dishes/category-list'
         }
      ]
   },

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
