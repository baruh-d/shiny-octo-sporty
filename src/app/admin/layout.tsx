"use client"

import { Sidebar } from "@/app/components/sidebar"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <div className="flex min-h-screen flex-col">
  
      {/* Main Content Area with Sidebar */}
      <div className="flex flex-1">
        <Sidebar />
        
        {/* Content Container */}
        <main className="flex-1 overflow-auto p-6 pb-20"> {/* Added pb-20 for footer space */}
          <div className="mx-auto max-w-7xl">
            {children}
          </div>
        </main>
      </div>
      
    </div>
  )
}