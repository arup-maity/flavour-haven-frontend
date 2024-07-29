"use client";
import { Ability } from "@/authentication/AccessControl";
import { sessionContext } from "@/authentication/AuthSession";
import Table from "@/components/common/Table";
import { axiosInstance } from "@/config/axios";
import { handleApiError } from "@/utils";
import Link from "next/link";
import React, { useContext, useLayoutEffect, useState } from "react";
import { IoEyeOutline } from "react-icons/io5";
import { MdOutlineModeEditOutline } from "react-icons/md";
import { RiDeleteBinLine } from "react-icons/ri";

const DishesList = () => {
  // auth session
  const { session, sessionLoading } = useContext(sessionContext);
  const [dishes, setDishes] = useState([]);
  useLayoutEffect(() => {
    getDishes({});
  }, []);
  async function getDishes(params: any) {
    try {
      const response = await axiosInstance.get("/dishes/all-dishes", {
        params
      });
      console.log(response.data);
      if (response.data.success) {
        setDishes(response.data.dishes);
      }
    } catch (error) {
      handleApiError(error);
    }
  }

  const columns = [
    {
      index: "title",
      title: "Name",
      dataIndex: "title",
      sortable: true,
      className: "w-[20%] min-w-[250px]"
    },
    {
      index: "slug",
      title: "Slug",
      dataIndex: "slug",
      sortable: true,
      className: "w-auto min-w-[300px]"
    },
    {
      title: "Options",
      className: "min-w-[150px] w-[200px]",
      dataIndex: "",
      render: (row: any) => (
        <div className="flex items-center justify-center gap-4">
          <button>
            <IoEyeOutline size={20} />
          </button>
          {Ability("update", "user", session?.user) && (
            <Link href={`/admin/dishes/edit-dish/${row?.id} `}>
              <MdOutlineModeEditOutline size={20} />
            </Link>
          )}
          {Ability("detele", "user", session?.user) && (
            <Link href={`/admin/dishes/delete-dish/${row?.id} `}>
              <RiDeleteBinLine size={17} />
            </Link>
          )}
        </div>
      )
    }
  ];

  return (
    <div>
      <div className="">
        <Table columns={columns} data={dishes} />
      </div>
    </div>
  );
};

export default DishesList;
