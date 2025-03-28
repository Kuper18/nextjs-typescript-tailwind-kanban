import Link from 'next/link';
import { useParams } from 'next/navigation';
import React from 'react';

import useBoards from '@/hooks/boards/use-boards';
import useOpenModal from '@/hooks/use-open-modal';

import BoardIcon from '../atoms/icons/BoardIcon';
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '../atoms/sidebar';
import CreateBoardDialog from '../organisms/CreateBoardDialog';

const AsideMobileContent = () => {
  const { data: boards } = useBoards();
  const { boardId } = useParams<{ boardId: string }>();
  const { isOpen, toggleOpen } = useOpenModal();

  return (
    <SidebarMenu className="w-[240px]">
      {boards?.map(({ id, name }) => (
        <Link key={id} href={`/${id}`}>
          <SidebarMenuItem>
            <SidebarMenuButton
              variant={id === Number(boardId) ? 'active' : 'default'}
              asChild
            >
              <span>
                <BoardIcon className="group/menu-item-hover:stroke-white transition-colors" />
                <span>{name}</span>
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
  );
};

export default AsideMobileContent;
