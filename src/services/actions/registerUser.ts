"use server";

export const registerUser = async (formData: any) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/user/new`,
    {
      method: "POST",
      body: formData,
      cache: "no-store",
    }
  );
  const patientInfo = await res.json();
  return patientInfo;
};
