import { Breadcrumb } from './Breadcrumb'

import { SidebarClientContainer } from './SidebarClientContainer'
import { SidebarProvider } from './SidebarProvider'

interface Props {
  checkBoxFiltersSaved: { categoryLabel: string; filterValue: string }[]
  priceSaved: {
    min: number
    max: number
  }
}

export async function Sidebar(props: Props) {
  return (
    <div
      className={`
        w-96
        h-full
        bg-white
        rounded-xl
        p-6
        flex flex-col
        shadow-products-sidebar-cc
        shadow-color-products-sidebar-shadow-cc
        gap-6
      
      `}
    >
      {/* <Breadcrumb /> */}
      <SidebarProvider>
        <SidebarClientContainer {...props} />
      </SidebarProvider>
    </div>
  )
}
