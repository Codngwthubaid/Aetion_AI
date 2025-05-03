"use client"
import { Button } from "@/components/ui/button"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { SidebarLinks } from "@/services"
import { Plus } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"

export default function AppSidebar() {
  const router = useRouter()
  const path = usePathname()
  console.log(path)

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="my-5 flex gap-x-2 items-center">
          <Image src="/logo.svg" width={200} height={200} alt="logo" className="w-20" />
          <h2 className="font-bold text-3xl font-mono text-emerald-600">MOKI</h2>
        </div>
        <Button
          variant={"default"}
          onClick={() => router.push("/dashboard/create-interview")}
          className="bg-emerald-500 hover:bg-emerald-600 cursor-pointer">
          <Plus /> Create new Interview
        </Button>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarContent>
            <SidebarMenu>
              {
                SidebarLinks.map((options, index) => (
                  <SidebarMenuItem key={index}>
                    <Link href={options.path} className={`flex items-center gap-3 m-2 p-2 rounded-md hover:bg-zinc-200 ${path === options.path && "bg-zinc-200 text-emerald-500"}`}>
                      <options.icon />
                      <span>{options.name}</span>
                    </Link>
                  </SidebarMenuItem>
                ))
              }
            </SidebarMenu>
          </SidebarContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  )
}
