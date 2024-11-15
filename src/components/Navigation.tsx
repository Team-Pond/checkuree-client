import React, { SetStateAction, useState } from 'react';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';

// Components
import { Box, styled, Typography } from '@mui/material';
import { ParsedAttendeeListType } from '../[id]/page';
import toast from 'react-hot-toast';

interface Menu {
    name: string;
    path: string;
    icon: string;
    iconActivate: string;
    label: string;
}

interface Iprops {
    status: boolean;
    setAttendeeList: React.Dispatch<SetStateAction<ParsedAttendeeListType>>;
    onSaveAction: () => void;
}

const menuList = (attendanceId: string): Menu[] => {
    return [
        {
            name: 'attendance',
            path: '/attendanceId',
            icon: '/images/icons/check-icon.svg',
            iconActivate: '/images/icons/check-activate-icon.svg',
            label: '출석 체크',
        },
        {
            name: 'statistics',
            path: '/attendanceId',
            icon: '/images/icons/statistics-icon.svg',
            iconActivate: '/images/icons/statistics-activate-icon.svg',
            label: '출석 통계',
        },
        {
            name: 'management',
            path: `/list-management/${attendanceId}`,
            icon: '/images/icons/list-icon.svg',
            iconActivate: '/images/icons/list-activate-icon.svg',
            label: '명단 관리',
        },
        {
            name: 'settings',
            path: '/attendanceId',
            icon: '/images/icons/setting-icon.svg',
            iconActivate: '/images/icons/setting-activate-icon.svg',
            label: '출석부 설정',
        },
    ];
};

const Navigation = (props: Iprops) => {
    const { status, setAttendeeList, onSaveAction } = props;

    const router = useRouter();
    const attendanceId = usePathname().split('/')[2];

    const [activeMenu, setActiveMenu] = useState<string>('attendance');

    const handleMenuClick = (menu: Menu) => {
        setActiveMenu(menu.name);
        router.push(menu.path);
    };

    const resetAllStatus = () => {
        setAttendeeList((prevState) => {
            return Object.fromEntries(
                Object.entries(prevState).map(([time, items]) => [
                    time,
                    items.map((item) => ({
                        ...item,
                        newStatus: '',
                        isDetailOpen: false,
                        etc: '',
                    })),
                ])
            );
        });
    };

    return (
        <React.Fragment>
            {status ? (
                <BoxSTNavigationActivate>
                    <BoxSTCancel onClick={() => resetAllStatus()}>
                        취소
                    </BoxSTCancel>
                    <BoxSTConfirm onClick={onSaveAction}>저장</BoxSTConfirm>
                </BoxSTNavigationActivate>
            ) : (
                <BoxSTNavigation>
                    {menuList(attendanceId).map((menu, index) => (
                        <BoxSTMenu
                            key={menu.name}
                            onClick={() =>
                                menu.name === 'statistics' ||
                                menu.name === 'settings'
                                    ? toast('준비중인 서비스입니다')
                                    : handleMenuClick(menu)
                            }
                        >
                            {activeMenu === menu.name ? (
                                <Image
                                    src={'/images/icons/eclipse-icon.svg'}
                                    alt={''}
                                    width={60}
                                    height={60}
                                    style={{
                                        position: 'absolute',
                                        zIndex: 0,
                                    }}
                                />
                            ) : null}
                            <Box
                                sx={{
                                    position: 'relative',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    gap: '7px',
                                }}
                            >
                                <Image
                                    key={index}
                                    src={
                                        activeMenu === menu.name
                                            ? menu.iconActivate
                                            : menu.icon
                                    }
                                    alt={menu.label}
                                    width={19}
                                    height={16.5}
                                />
                                <Typography fontSize={12} color={'white'}>
                                    {menu.label}
                                </Typography>
                            </Box>
                        </BoxSTMenu>
                    ))}
                </BoxSTNavigation>
            )}
        </React.Fragment>
    );
};

export default Navigation;

const BoxSTNavigation = styled(Box)(() => {
    return {
        minWidth: '330px',
        maxWidth: '359px',
        height: '60px',
        backgroundColor: '#59996B',
        borderRadius: '30px',
        display: 'flex',
        boxShadow: '0px 2px 10px 4px rgba(0, 0, 0, 0.25)',
        alignItems: 'center',
        justifyContent: 'space-around',
        position: 'fixed',
        bottom: '48px',
        zIndex: '9999',
        left: '50%',
        transform: 'translateX(-50%)',
    };
});

const BoxSTMenu = styled(Box)(() => {
    return {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-around',
        height: '60px',
        width: '60px',
    };
});

const BoxSTNavigationActivate = styled(Box)(() => {
    return {
        minWidth: '330px',
        maxWidth: '359px',
        height: '60px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'fixed',
        bottom: '48px',
        zIndex: '9999',
        left: '50%',
        transform: 'translateX(-50%)',
    };
});

const BoxSTConfirm = styled(Box)(() => {
    return {
        width: '247px',
        height: '60px',
        borderRadius: '30px',
        backgroundColor: '#59996B',
        color: 'white',
        fontSize: '16px',
        fontWeight: 600,
        lineHeight: '21.79px',
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        boxShadow: '0px 2px 10px 4px rgba(0, 0, 0, 0.25)',
    };
});

const BoxSTCancel = styled(Box)(() => {
    return {
        width: '102px',
        height: '60px',
        borderRadius: '30px',
        color: '#59996B',
        background: 'white',
        fontSize: '16px',
        fontWeight: 600,
        lineHeight: '21.79px',
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        boxShadow: '0px 2px 10px 4px rgba(0, 0, 0, 0.25)',
    };
});
