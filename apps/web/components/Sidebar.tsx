import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@workspace/ui/components/sidebar";
import Link from "next/link";
import { ReceiptCent, LayoutTemplate, User, ChartArea } from "lucide-react";

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader className="flex items-center justify-center border-b border-border">
        <span className="text-2xl font-bold">Crypto Tracker</span>
      </SidebarHeader>
      <SidebarContent className="py-4">
        <SidebarMenu className="space-y-1">
          <SidebarMenuItem>
            <SidebarMenuButton className="w-[90%] mx-auto" asChild>
              <Link href="/cryptocurrencies">
                <ReceiptCent className="size-4" />
                <span>Cryptocurrencies</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton className="w-[90%] mx-auto" asChild>
              <Link href="/exchanges">
                <LayoutTemplate className="size-4" />
                <span>Exchanges</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton className="w-[90%] mx-auto" asChild>
              <Link href="/profile">
                <User className="size-4" />
                <span>Profile</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton className="w-[90%] mx-auto" asChild>
              <Link href="/address-analyzer">
                <ChartArea className="size-4" />
                <span>Address Analyzer</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
}
