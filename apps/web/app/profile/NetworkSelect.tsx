"use client";

import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui/components/select";

const NetworkSelect = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a network" />
          </SelectTrigger>
        </Select>
      </div>
    </div>
  );
};

export default NetworkSelect;
