

'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
import {
  Home,
  FlaskConical,
  Beaker,
  FileText,
  Book,
  Users,
  HardDrive,
  History,
  LogOut,
  ShieldCheck,
  ChevronDown,
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

const navItems = {
  labTechnician: [
    { href: '/dashboard', icon: Home, label: 'Dashboard' },
    { href: '/samples', icon: FlaskConical, label: 'Sample Management' },
    { href: '/orders', icon: Beaker, label: 'Test Orders' },
    { href: '/results', icon: FileText, label: 'Results Entry' },
    { href: '/reporting', icon: FileText, label: 'Reporting' },
  ],
  supervisor: [
    { href: '/dashboard', icon: Home, label: 'Dashboard' },
    { href: '/samples', icon: FlaskConical, label: 'Sample Management' },
    { href: '/orders', icon: Beaker, label: 'Test Orders' },
    { href: '/results', icon: FileText, label: 'Results & Validation' },
    { href: '/instruments', icon: HardDrive, label: 'Instrument Status' },
    { href: '/reporting', icon: FileText, label: 'Reporting' },
  ],
  systemAdministrator: [
    { href: '/dashboard', icon: Home, label: 'Dashboard' },
    { href: '/samples', icon: FlaskConical, label: 'Sample Management' },
    { href: '/orders', icon: Beaker, label: 'Test Orders' },
    { href: '/results', icon: FileText, label: 'Results & Validation' },
    { href: '/reporting', icon: FileText, label: 'Reporting' },
    { href: '/catalog', icon: Book, label: 'Test Catalog' },
    { href: '/users', icon: Users, label: 'User Management' },
    { href: '/instruments', icon: HardDrive, label: 'Instrument Status' },
    { href: '/audit-trail', icon: History, label: 'Audit Trail' },
  ],
};

// For now, we'll hardcode the role. This would come from your auth context.
const userRole = 'systemAdministrator' as keyof typeof navItems;

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const items = navItems[userRole];
  const pathname = usePathname();

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/20 text-primary">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <h1 className="text-xl font-semibold">SmartLIS</h1>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {items.map((item) => (
              <SidebarMenuItem key={item.href}>
                <Link href={item.href}>
                  <SidebarMenuButton tooltip={item.label} isActive={pathname === item.href}>
                    <item.icon />
                    <span>{item.label}</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu>
             <SidebarMenuItem>
               <div className="flex items-center gap-2 p-2">
                 <Avatar className="h-8 w-8">
                   <AvatarImage src="https://placehold.co/100x100.png" />
                   <AvatarFallback>SA</AvatarFallback>
                 </Avatar>
                 <div className="flex flex-col text-sm">
                   <span className="font-semibold">Admin User</span>
                   <span className="text-muted-foreground">System Admin</span>
                 </div>
                 <Button variant="ghost" size="icon" className="ml-auto">
                    <ChevronDown className="h-4 w-4" />
                 </Button>
               </div>
             </SidebarMenuItem>
            <SidebarMenuItem>
                <Link href="/login">
                    <SidebarMenuButton tooltip="Logout">
                        <LogOut />
                        <span>Logout</span>
                    </SidebarMenuButton>
                </Link>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
      <main className="flex-1">{children}</main>
    </SidebarProvider>
  );
}
