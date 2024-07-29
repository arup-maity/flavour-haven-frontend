"use client";
import React, { useLayoutEffect, useState } from "react";
import { axiosInstance } from "@/config/axios";
import { handleApiError } from "@/utils";
import { toast } from "sonner";

const EditCategory = ({ params }: { params: { id: string } }) => {
  const id = params.id;
  const [taxonomyDetails, setTaxonomyDetails] = useState([]);

  useLayoutEffect(() => {
    async function getCategory() {
      try {
        const res = await axiosInstance.get(`/taxonomy/read-taxonomy/${id}`);
        if (res.data.success) {
          setTaxonomyDetails(res.data.taxonomy);
        }
      } catch (error) {
        handleApiError(error);
      }
    }
    getCategory();
  }, [id]);

  async function handleDeleteCategory() {
    try {
      const res = await axiosInstance.delete(`/taxonomy/delete-taxonomy/${id}`);
      if (res.data.success) {
        toast.success(res.data.message);
      }
    } catch (error) {
      handleApiError(error);
    }
  }

  return (
    <div className="">
      <div className="">
        <ul>
          <li>{taxonomyDetails.name}</li>
          <li>{taxonomyDetails.description}</li>
        </ul>
        <button
          type="button"
          className="border border-slate-400 rounded py-1 px-4"
          onClick={handleDeleteCategory}
        >
          Delete Category
        </button>
      </div>
    </div>
  );
};

export default EditCategory;
