"use client";
import React from "react";

const UserDropdown = ({ user }: { user: any }) => {
   return <div className="text-[#0c0c0c]">{user?.name ? user?.name : 'Hi User'}</div>;
};

export default UserDropdown;
