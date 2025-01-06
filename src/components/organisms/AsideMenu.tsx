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
    <Sidebar className="pt-24">
      <SidebarHeader className="mb-[19px] ml-8 mt-[15px]">
        ALL BOARDS (3)
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup className="w-[276px] p-0">
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

        <SidebarTrigger className="ml h-12 w-[276px] rounded-l-none pr-[130px] text-[15px] font-bold leading-5 text-secondary-foreground hover:bg-accent-secondary hover:text-accent" />
      </SidebarFooter>
    </Sidebar>
  );
};

export default AsideMenu;
