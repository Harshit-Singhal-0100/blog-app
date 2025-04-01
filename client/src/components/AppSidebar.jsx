import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Link } from "react-router-dom";
import logo from '@/assets/images/logo-white.png';
import { IoHomeOutline } from "react-icons/io5";
import { BiCategoryAlt } from "react-icons/bi";
import { GrBlog } from "react-icons/gr";
import { FaRegComments } from "react-icons/fa6";
import { LuUsers } from "react-icons/lu";
import { GoDot } from "react-icons/go";
import {
    RouteBlog,
    RouteBlogByCategory,
    RouteCategoryDetails,
    RouteCommentDetails,
    RouteIndex,
    RouteUser,
} from "@/helpers/RouteName";
import { useFetch } from "@/hooks/useFetch";
import { getEvn } from "@/helpers/getEnv";
import { useSelector } from "react-redux";

const AppSidebar = () => {
    const user = useSelector(state => state.user);
    const { data: categoryData } = useFetch(`${getEvn('VITE_API_BASE_URL')}/category/all-category`, {
        method: 'get',
        credentials: 'include',
    });

    return (
        <Sidebar className="bg-gradient-to-r from-gray-100 via-gray-200 to-gray-300">
            <SidebarHeader className="bg-transparent p-4">
                <img src={logo} width={210} alt="Logo" />
            </SidebarHeader>
            <SidebarContent className="bg-transparent">
                <SidebarGroup>
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <SidebarMenuButton className="text-gray-900 hover:bg-indigo-600 hover:text-white transition-all duration-300 transform hover:scale-105">
                                <IoHomeOutline className="text-gray-900" />
                                <Link to={RouteIndex}>Home</Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>

                        {user && user.isLoggedIn && (
                            <>
                                <SidebarMenuItem>
                                    <SidebarMenuButton className="text-gray-900 hover:bg-indigo-600 hover:text-white transition-all duration-300 transform hover:scale-105">
                                        <GrBlog className="text-gray-900" />
                                        <Link to={RouteBlog}>Blogs</Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                                <SidebarMenuItem>
                                    <SidebarMenuButton className="text-gray-900 hover:bg-indigo-600 hover:text-white transition-all duration-300 transform hover:scale-105">
                                        <FaRegComments className="text-gray-900" />
                                        <Link to={RouteCommentDetails}>Comments</Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            </>
                        )}

                        {user && user.isLoggedIn && user.user.role === 'admin' && (
                            <>
                                <SidebarMenuItem>
                                    <SidebarMenuButton className="text-gray-900 hover:bg-indigo-600 hover:text-white transition-all duration-300 transform hover:scale-105">
                                        <BiCategoryAlt className="text-gray-900" />
                                        <Link to={RouteCategoryDetails}>Categories</Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>

                                <SidebarMenuItem>
                                    <SidebarMenuButton className="text-gray-900 hover:bg-indigo-600 hover:text-white transition-all duration-300 transform hover:scale-105">
                                        <LuUsers className="text-gray-900" />
                                        <Link to={RouteUser}>Users</Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            </>
                        )}
                    </SidebarMenu>
                </SidebarGroup>

                <SidebarGroup>
                    <SidebarGroupLabel className="text-gray-900 font-semibold text-xl shadow-md">
                        Categories
                    </SidebarGroupLabel>
                    <SidebarMenu>
                        {categoryData && categoryData.category.length > 0
                            && categoryData.category.map(category => (
                                <SidebarMenuItem key={category._id}>
                                    <SidebarMenuButton className="text-gray-900 hover:bg-indigo-600 hover:text-white transition-all duration-300 transform hover:scale-105">
                                        <GoDot className="text-gray-900" />
                                        <Link to={RouteBlogByCategory(category.slug)}>{category.name}</Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))
                        }
                    </SidebarMenu>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    );
};

export default AppSidebar;
