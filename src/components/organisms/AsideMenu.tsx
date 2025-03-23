'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import React from 'react';

import useBoards from '@/hooks/boards/use-boards';
import useOpenModal from '@/hooks/use-open-modal';

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
  const { boardId } = useParams();
  const { data: boards } = useBoards();
  const { isOpen, toggleOpen } = useOpenModal();

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
                {boards?.map((board) => (
                  <Link key={board.id} href={`/${board.id}`}>
                    <SidebarMenuItem>
                      <SidebarMenuButton
                        variant={
                          boardId === `${board.id}` ? 'active' : 'default'
                        }
                        asChild
                      >
                        <span>
                          <BoardIcon className="group/menu-item-hover:stroke-white transition-colors" />
                          <span>{board.name}</span>
                        </span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </Link>
                ))}

                <SidebarMenuItem>
                  <CreateBoardDialog
                    toggleOpen={toggleOpen}
                    isOpen={isOpen}
                    action="create"
                  />
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
