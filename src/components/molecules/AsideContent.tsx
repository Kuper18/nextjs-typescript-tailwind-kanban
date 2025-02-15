import React from 'react';

import BoardIcon from '../atoms/icons/BoardIcon';
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '../atoms/sidebar';

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

const AsideMobileContent = () => {
  return (
    <SidebarMenu className="w-[240px]">
      {items.map((item, i) => (
        <SidebarMenuItem key={item.title}>
          <SidebarMenuButton variant={i === 0 ? 'active' : 'default'} asChild>
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
  );
};

export default AsideMobileContent;
