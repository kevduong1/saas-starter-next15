"use client"

import { ChevronRight, type LucideIcon } from "lucide-react"
import { useState } from "react"
import Link from "next/link"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"

export function NavMain({
  items,
}: {
  items: {
    title: string
    url: string
    icon: LucideIcon
    isActive?: boolean
    items?: {
      title: string
      url: string
    }[]
  }[]
}) {
  const [openItems, setOpenItems] = useState<string[]>([]);

  const toggleItem = (title: string) => {
    setOpenItems((prev) => {
      const newOpenItems = prev.includes(title) ? prev.filter((item) => item !== title) : [...prev, title];
      return newOpenItems;
    });
  };

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Home</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <Collapsible key={item.title} asChild defaultOpen={item.isActive} open={openItems.includes(item.title)} onOpenChange={() => toggleItem(item.title)}>
            <SidebarMenuItem>
              {/* If the item has subitems, show a collapsible trigger */}
              {item.items?.length ? (
                <>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton asChild tooltip={item.title}>
                      {item.url === "#" ? (
                        <button className="flex items-center gap-2">
                          <item.icon />
                          <span>{item.title}</span>
                        </button>
                      ) : (
                        <Link href={item.url}>

                          <item.icon />
                          <span>{item.title}</span>
                          <ChevronRight className={`ml-auto ${openItems.includes(item.title) ? 'rotate-90' : ''}`} />
                          <span className="sr-only">Toggle</span>

                        </Link>
                      )}
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {item.items?.map((subItem) => (
                        <SidebarMenuSubItem key={subItem.title}>
                          <SidebarMenuSubButton asChild>
                            <Link href={subItem.url}>
                                <span>{subItem.title}</span>
                            </Link>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </>
              ) :
                <>
                  {/* If the item does not have subitems, show a simple button */}
                  <SidebarMenuButton asChild tooltip={item.title}>
                    <Link href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </>}
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}
