import { cookies } from "next/headers";

export const getSession = async () => {
  const token = cookies().get("token")?.value;
  //   const res = await axiosInstance.get(`/auth/check-token`)
  if (!token) {
    return { login: false, user: {} };
  }

  const options = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };

  const url = process.env.NEXT_PUBLIC_API_URL + `/auth/verify-token`;
  const response = await fetch(url, options);
  const json = await response.json();

  if(json.success) {
   return { login: true, user:json?.payload}
  }else {
    return { login: false, user: {} };
  }
};
