import { ParsedAttendeeListType } from "@/pages/attendances/attendances-roaster/AttendancesRoaster";
import React, { SetStateAction } from "react";

// Components

import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";

interface Menu {
  name: string;
  path: string;
  icon: string;
  iconActivate: string;
  label: string;
}

interface Iprops {
  status: boolean;
  setAttendeeList?: React.Dispatch<SetStateAction<ParsedAttendeeListType>>;
  onSaveAction?: () => void;
}

const menuList = (attendanceId: string): Menu[] => {
  return [
    {
      name: "attendances",
      path: `/attendances/${attendanceId}`,
      icon: "/images/icons/check-icon.svg",
      iconActivate: "/images/icons/check-activate-icon.svg",
      label: "출석 체크",
    },
    {
      name: "statistics",
      path: "/statistics",
      icon: "/images/icons/statistics-icon.svg",
      iconActivate: "/images/icons/statistics-activate-icon.svg",
      label: "출석 통계",
    },
    {
      name: "list-management",
      path: `/list-management/${attendanceId}`,
      icon: "/images/icons/list-icon.svg",
      iconActivate: "/images/icons/list-activate-icon.svg",
      label: "명단 관리",
    },
    {
      name: "settings",
      path: "/settings",
      icon: "/images/icons/setting-icon.svg",
      iconActivate: "/images/icons/setting-activate-icon.svg",
      label: "출석부 설정",
    },
  ];
};

const Navigation = (props: Iprops) => {
  const { status, setAttendeeList, onSaveAction } = props;

  const navigate = useNavigate();

  const attendanceId = useLocation().pathname.split("/")[2];
  const pathName = useLocation().pathname.split("/")[1];

  const handleMenuClick = (menu: Menu) => {
    navigate(menu.path);
  };

  const resetAllStatus = () => {
    if (setAttendeeList)
      setAttendeeList((prevState) => {
        return Object.fromEntries(
          Object.entries(prevState).map(([time, items]) => [
            time,
            items.map((item) => ({
              ...item,
              newStatus: "",
              isDetailOpen: false,
              etc: "",
            })),
          ])
        );
      });
  };

  return (
    <React.Fragment>
      {status ? (
        <div className="max-w-[359px] min-x-[330px] h-[60px] flex items-center justify-between sticky left-0 right-0 bottom-12 z-[9999]">
          <button
            className="w-[102px] h-[60px] rounded-[30px] bg-white text-[#59996B] text-base font-semibold flex justify-around items-center shadow-sm"
            onClick={() => resetAllStatus()}
          >
            취소
          </button>
          <button
            className="w-[247px] h-[60px] rounded-[30px] bg-[#59996B] text-white text-base font-semibold flex justify-around items-center shadow-sm"
            onClick={onSaveAction}
          >
            저장
          </button>
        </div>
      ) : (
        <nav className="min-w-[330px] max-w-[359px] h-[60px] bg-[#59996B] rounded-[30px] flex shadow-sm items-center justify-around sticky left-0 right-0 bottom-12 z-[9999]">
          {menuList(attendanceId).map((menu, index) => (
            <div
              className="flex flex-col items-center justify-around h-[60px] w-[60px]"
              key={menu.name}
              onClick={() =>
                menu.name === "statistics" || menu.name === "settings"
                  ? toast("준비중인 서비스입니다")
                  : handleMenuClick(menu)
              }
            >
              {pathName === menu.name ? (
                <img
                  src={"/images/icons/eclipse-icon.svg"}
                  alt={"eclipse img"}
                  width={60}
                  height={60}
                  style={{
                    position: "absolute",
                    zIndex: 0,
                    height: 64,
                    top: 0,
                  }}
                  className="absolute z-0 h-[64px] top-0"
                />
              ) : null}
              <div className="relative flex flex-col items-center gap-[7px]">
                <img
                  key={index}
                  src={pathName === menu.name ? menu.iconActivate : menu.icon}
                  alt={menu.label}
                  width={19}
                  height={16.5}
                />
                <p className="text-white text-xs">{menu.label}</p>
              </div>
            </div>
          ))}
        </nav>
      )}
    </React.Fragment>
  );
};

export default Navigation;
