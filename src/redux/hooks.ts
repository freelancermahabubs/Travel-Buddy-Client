import {useDispatch, useSelector} from "react-redux";
import type {TypedUseSelectorHook} from "react-redux";
import type {RootState, AppDispatch} from "./store";
import {useEffect, useState} from "react";
import axios from "axios";
import {toast} from "sonner";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

type TDebouncedProps = {
  searchQuery: string;
  delay: number;
};

export const useDebounced = ({searchQuery, delay}: TDebouncedProps) => {
  const [debouncedValue, setDebouncedValue] = useState<string>(searchQuery);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(searchQuery);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [searchQuery, delay]);

  return debouncedValue;
};

export const singleImageUpload = async (formData: any, setImage: any) => {
  const apiKey = `ddca1a259fd62cce65f86b938057b982`;
  const imageBBUrl = `https://api.imgbb.com/1/upload`;
  formData.set("key", apiKey);

  const {data} = await axios.post(imageBBUrl, formData);

  if (data.success === true) {
    setImage(data?.data?.display_url);
  } else {
    toast.error("Failed to upload image. Please try again.");
  }
};
