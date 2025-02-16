'use client';

import { useQuery } from '@tanstack/react-query';
import React from 'react';

import BoardsService from '@/services/boards';

import BoardIcon from '../atoms/icons/BoardIcon';
import { ScrollArea } from '../atoms/scroll-area';
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
import ToggleThemeButton from '../molecules/ToggleThemeButton';

import CreateBoardDialog from './CreateBoardDialog';

const AsideMenu = () => {
  const { data: boards } = useQuery({
    queryKey: ['boards'],
    queryFn: BoardsService.get,
    staleTime: 60 * 1000,
  });

  return (
    <Sidebar className="pt-16 sm:pt-[81px] lg:pt-24">
      <SidebarHeader className="mb-[19px] ml-6 mt-[15px] lg:ml-8">
        {`ALL BOARDS (${boards?.length})`}
      </SidebarHeader>

      <SidebarContent>
        <ScrollArea>
          <SidebarGroup className="w-[240px] p-0 lg:w-[276px]">
            <SidebarGroupContent>
              <SidebarMenu>
                {boards?.map((board, i) => (
                  <SidebarMenuItem key={board.id}>
                    <SidebarMenuButton
                      variant={i === 0 ? 'active' : 'default'}
                      asChild
                    >
                      <span>
                        <BoardIcon className="group/menu-item-hover:stroke-white transition-colors" />
                        <span>{board.name}</span>
                      </span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}

                <SidebarMenuItem>
                  <CreateBoardDialog />
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </ScrollArea>
      </SidebarContent>

      <SidebarFooter className="p-0 pb-8">
        <ToggleThemeButton />

        <SidebarTrigger className="ml h-12 w-[240px] rounded-l-none pr-[130px] text-[15px] font-bold leading-5 text-secondary-foreground hover:bg-accent-secondary hover:text-accent lg:w-[276px]" />
      </SidebarFooter>
    </Sidebar>
  );
};

export default AsideMenu;
