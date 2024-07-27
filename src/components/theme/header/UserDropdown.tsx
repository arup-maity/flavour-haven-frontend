"use client";
import React from "react";

const UserDropdown = ({ user }: { user: any }) => {
  return <div className="text-white">{user?.name}</div>;
};

export default UserDropdown;
