import { lazy, Suspense, memo } from "react";
// import Home from '../../pages/home/Home';
// import Story from '../../pages/story/Story';
import * as FaIcons from "react-icons/fa";
import { IoCalendarSharp } from "react-icons/io5";
import { MdWork, MdAccountBox, MdPassword } from "react-icons/md";

const Home = lazy(() => import("../../pages/home/Home"));
const Story = lazy(() => import("../../pages/story/Story"));

// Task List
const Task = lazy(() => import("../../pages/task/Task"));
const MyTask = lazy(() => import("../../pages/task/myTask/MyTask"));
const TaskList = lazy(() => import("../../pages/task/taskList/TaskList"));

// Time Table
const TimeTable = lazy(() => import("../../pages/timetable/Timetable"));


// Profile
const Profile = lazy(() => import("../../pages/profile/Profile"));
const UserInfo = lazy(() => import("../../pages/profile/userInfo/UserInfo"));
const ChangePassword = lazy(() =>
  import("../../pages/profile/changePassword/ChangePassword")
);

const SideBarData = [
  // {
  //   title: "Home",
  //   link: "/",
  //   icon: <FaIcons.FaHome />,
  //   page: (
  //     <Suspense fallback={"loading...."}>
  //       <Home />
  //     </Suspense>
  //   ),
  //   children: [],
  // },
  // {
  //   title: "Story",
  //   link: "Story",
  //   icon: <FaIcons.FaBook />,
  //   page: (
  //     <Suspense fallback={"loading...."}>
  //       <Story />
  //     </Suspense>
  //   ),
  //   children: [],
  // },
  {
    title: "My Tasks",
    link: "MyTasks",
    icon: <FaIcons.FaTasks />,
    page: (
      <Suspense fallback={"loading...."}>
        <Task />
      </Suspense>
    ),
    children: [
      {
        title: "My Tasks",
        link: "",
        icon: <FaIcons.FaTasks />,
        page: (
          <Suspense fallback={"loading...."}>
            <MyTask />
          </Suspense>
        ),
        children: []
      },
      {
        title: "My Task Lists",
        link: "MyTaskLists",
        icon: <FaIcons.FaTasks />,
        page: (
          <Suspense fallback={"loading...."}>
            <TaskList />
          </Suspense>
        ),
        children: [],
      },
    ],
  },
  {
    title: "My Timetable",
    link: "MyTimetable",
    icon: <IoCalendarSharp />,
    page: (
      <Suspense fallback={"loading...."}>
        <TimeTable />
      </Suspense>
    ),
    children: [],
  },
  {
    title: "My Projects",
    link: "MyProjects",
    icon: <MdWork />,
    page: (
      <Suspense fallback={"loading...."}>
        <Home />
      </Suspense>
    ),
    children: [],
  },
  {
    title: "My Profile",
    link: "MyProfile",
    icon: <MdAccountBox />,
    page: (
      <Suspense fallback={"Loading ..."}>
        <Profile />
      </Suspense>
    ),
    children: [
      {
        title: "User Info",
        link: "",
        icon: <MdPassword />,
        page: (
          <Suspense fallback={"Loading ..."}>
            <UserInfo />
          </Suspense>
        ),
        children: [],
      },
      {
        title: "Change Password",
        link: "ChangePassword",
        icon: <MdPassword />,
        page: (
          <Suspense fallback={"Loading ..."}>
            <ChangePassword />
          </Suspense>
        ),
        children: [],
      },
    ],
  },
];

export default SideBarData;
