"use client";

import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

interface props {
  name: string;
  label: string;
  placeholder: string;
  form: any;
}

const InputField = ({ name, label, placeholder, form }: props) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex w-full flex-col">
          <FormLabel className="text-primary">
            {label}
            <span className="text-teal-500">*</span>
          </FormLabel>
          <FormControl>
            <Input
              placeholder={placeholder}
              className="border-primary text-primary no-focus w-full border bg-transparent outline-none"
              {...field}
            />
          </FormControl>
          <FormMessage className="text-red-500" />
        </FormItem>
      )}
    />
  );
};

export default InputField;
