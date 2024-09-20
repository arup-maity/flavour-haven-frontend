import { LuUsers2 } from "react-icons/lu";
import { IoTicketOutline } from "react-icons/io5";
import { MdFlightLand, MdFlight, MdConnectingAirports, MdOutlineLocationCity, MdOutlineDashboardCustomize } from "react-icons/md";

const AdminMenu = [
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
            id: 'add-dish',
            title: 'Add Dish',
            icon: <IoTicketOutline size='8' />,
            permission: ['administrator', 'admin'],
            Link: '/admin/dishes/add-dish',
            navLink: '/admin/dishes/add-dish'
         },
         {
            id: 'dishes-list',
            title: 'Dishes List',
            icon: <IoTicketOutline size='8' />,
            permission: ['administrator', 'admin'],
            Link: '/admin/dishes/dishes-list',
            navLink: '/admin/dishes/dishes-list'
         },

      ]
   },
   {
      id: "dish-category",
      title: "Dishes category",
      icon: <LuUsers2 size={20} />,
      permissions: ["administrator", "admin"],
      children: [
         // {
         //    id: 'add-category',
         //    title: 'Add Category',
         //    icon: <IoTicketOutline size='8' />,
         //    permission: ['administrator', 'admin'],
         //    Link: '/admin/dish-category/add-category',
         //    navLink: '/admin/dish-category/add-category'
         // },
         {
            id: 'category-list',
            title: 'Category List',
            icon: <IoTicketOutline size='8' />,
            permission: ['administrator', 'admin'],
            Link: '/admin/dish-category/category-list',
            navLink: '/admin/dish-category/category-list'
         },
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
