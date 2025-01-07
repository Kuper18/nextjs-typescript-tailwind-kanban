import React from 'react';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from '../atoms/sidebar';
import BoardIcon from '../atoms/icons/BoardIcon';
import ToggleThemeButton from '../molecules/ToggleThemeButton';

const items = [
  {
    title: 'Platform Launch',
    url: '#',
  },
  {
    title: 'Marketing Plan',
    url: '#',
  },
  {
    title: 'Roadmap',
    url: '#',
  },
];

const AsideMenu = () => {
  return (
    <Sidebar className="pt-16 sm:pt-[81px] lg:pt-24">
      <SidebarHeader className="mb-[19px] ml-6 mt-[15px] lg:ml-8">
        ALL BOARDS (3)
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup className="w-[240px] p-0 lg:w-[276px]">
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item, i) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    variant={i === 0 ? 'active' : 'default'}
                    asChild
                  >
                    <span>
                      <BoardIcon className="group/menu-item-hover:stroke-white transition-colors" />
                      <span>{item.title}</span>
                    </span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}

              <SidebarMenuItem>
                <SidebarMenuButton variant="outline" asChild>
                  <span>
                    <BoardIcon />
                    <span>+ Create New Board</span>
                  </span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-0 pb-8">
        <ToggleThemeButton />

        <SidebarTrigger className="ml h-12 w-[240px] rounded-l-none pr-[130px] text-[15px] font-bold leading-5 text-secondary-foreground hover:bg-accent-secondary hover:text-accent lg:w-[276px]" />
      </SidebarFooter>
    </Sidebar>
  );
};

export default AsideMenu;
