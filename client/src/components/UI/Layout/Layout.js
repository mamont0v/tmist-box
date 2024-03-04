import './Layout.styles.scss'
import { MainContent } from '../MainContent/MainContent'
import { Sidebar } from '../Sidebar/Sidebar'
import { SidebarMenu } from '../Sidebar/SidebarMenu/SidebarMenu'


export const Layout = () => {

    return (
        <>
            <div className="default-layout sidebar-default">
                <Sidebar />
                <SidebarMenu />
                <MainContent />
            </div>
        </>

    )
}