"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
} from "@workspace/ui/components/form";
import { Input } from "@workspace/ui/components/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@workspace/ui/components/button";
import { Search } from "lucide-react";
import { SearchStatus } from "@/types/enums";
const formSchema = z.object({
  address: z.string().refine((value) => {
    if (value.length !== 42) {
      return false;
    } else if (!value.startsWith("0x")) {
      return false;
    } else if (!/^(0x)?[0-9a-fA-F]{40}$/.test(value)) {
      return false;
    }
    return true;
  }, "Invalid address"),
});

interface AddressSearchProps {
  onSearch: (address: string) => void;
  searchStatus: SearchStatus;
}

const AddressSearch = ({ onSearch, searchStatus }: AddressSearchProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      address: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    onSearch(values.address);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="flex items-center gap-2">
                  <Input
                    placeholder="Enter an ethereum address"
                    type="text"
                    {...field}
                  />
                  <Button
                    type="submit"
                    disabled={searchStatus === SearchStatus.LOADING}
                    className={`${searchStatus === SearchStatus.LOADING ? "disabled" : "cursor-pointer"}`}
                  >
                    <Search className={`w-4 h-4`} />
                  </Button>
                </div>
              </FormControl>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};

export default AddressSearch;
