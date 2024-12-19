import {
  Box,
  Button,
  FormControlLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import { SetStateAction, useRef, useState } from "react";

import { useMutation } from "@tanstack/react-query";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { createAttandance } from "@/api/AttendanceApiClient";

export interface CreateAttendance {
  title: string;
  description: string;
  availableFrom: string;
  availableTo: string;
  allowLateness: string;
  attendanceDays: string;
  image: File;
}

interface IProps {
  setIsCreate: React.Dispatch<SetStateAction<boolean>>;
  attendancesRefetch: () => void;
}
const daysOfWeek = [
  { 월: "MONDAY" },
  { 화: "TUESDAY" },
  { 수: "WEDNESDAY" },
  { 목: "THURSDAY" },
  { 금: "FRIDAY" },
  { 토: "SATURDAY" },
  { 일: "SUNDAY" },
];

const AttendanceCreateForm = (props: IProps) => {
  const { setIsCreate, attendancesRefetch } = props;
  const refreshToken = Cookies.get("REFRESH_TOKEN");
  const startHours = [];
  const endHours = [];

  //State
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [fileImage, setFileImage] = useState<File>();
  const [attendanceCreate, setAttendanceCreate] = useState<CreateAttendance>();

  for (let i = 0; i <= 23; i++) {
    for (let minute = 0; minute < 60; minute += 30) {
      const time = `${i < 10 ? `0${i}` : `${i}`}:${minute === 0 ? "00" : "30"}`;
      startHours.push(time);
    }
  }

  for (let i = parseInt(attendanceCreate?.availableFrom!); i <= 23; i++) {
    for (let minute = 0; minute < 60; minute += 30) {
      const time = `${i < 10 ? `0${i}` : `${i}`}:${minute === 0 ? "00" : "30"}`;
      endHours.push(time);
    }
  }

  // TODO: REFRESH
  const RefreshApi = async () => {
    const result = await fetch(
      `${import.meta.env.VITE_API_DEV_ROOT}/auth/refresh-token`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          refreshToken,
        }),
      }
    ).then((response) => response.json());

    // 쿠키 등록
    Cookies.set(import.meta.env.VITE_ACCESS_TOKEN, result.data.accessToken);
    Cookies.set(import.meta.env.VITE_REFRESH_TOKEN, result.data.refreshToken);
  };

  // 출석부 생성
  const { mutate: attendanceMutaion } = useMutation({
    mutationKey: ["attendancy-list"],
    mutationFn: async () =>
      await createAttandance({
        ...attendanceCreate!,
        image: fileImage!,
        availableFrom: attendanceCreate?.availableFrom.replace(":", "")!,
        availableTo: attendanceCreate?.availableTo.replace(":", "")!,
      }).then((res) => res.data),
    onSuccess: () => {
      toast("출석부가 생성되었습니다.");
      attendancesRefetch();
      setIsCreate(false);
      RefreshApi();
    },
  });

  // TODO 파일 업로드
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];

    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target && e.target.result) {
        setImageSrc(e.target.result as string);
        setFileImage(selectedFile);
      }
    };

    if (selectedFile) {
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const onChange = (field: keyof CreateAttendance, value: string) => {
    setAttendanceCreate((prevState) => ({
      ...prevState!,
      [field]: value!,
    }));
  };

  // 요일 선택 로직
  const [selectedDays, setSelectedDays] = useState<Set<string>>(new Set());
  const getSelectedDaysString = (selectedDays: Set<string>): string => {
    // 선택된 요일을 배열로 변환 후 정렬
    const sortedSelectedDays = Array.from(selectedDays);

    // 요일 문자열 생성
    const selectedDaysString = sortedSelectedDays.join(",");

    return selectedDaysString;
  };
  const handleSelectDay = (day: string) => {
    const updatedSelectedDays = new Set(selectedDays);
    if (updatedSelectedDays.has(day)) {
      updatedSelectedDays.delete(day);
    } else {
      updatedSelectedDays.add(day);
    }
    setSelectedDays(updatedSelectedDays);

    // 선택된 요일들을 문자열로 변환하여 상태 업데이트
    const selectedDaysString = getSelectedDaysString(updatedSelectedDays);
    onChange("attendanceDays", selectedDaysString);
  };

  return (
    <ContainerSTForm>
      <Typography
        fontSize={20}
        fontWeight={600}
        lineHeight={"27.24px"}
        width={340}
      >
        정보 입력
      </Typography>
      <BoxSTImageWrapper sx={{}}>
        <Typography fontSize={14} lineHeight={"19.07px"} color={"#222222"}>
          출석부 이미지
        </Typography>
        <Box sx={{ display: "flex", gap: "8px", alignItems: "flex-end" }}>
          {imageSrc ? (
            <img
              src={imageSrc}
              alt="profile"
              width={92}
              height={92}
              style={{
                border: "1px solid #D5D5D5",
                borderRadius: "8px",
                objectFit: "cover",
                objectPosition: "center",
              }}
            />
          ) : (
            <BoxSTImage
              onClick={handleImageClick}
              sx={{
                background: "lightgray",
              }}
            />
          )}
          <Typography fontSize={14} lineHeight={"19.07px"} color={"#C9C9C9"}>
            jpg, png 형식 가능
          </Typography>
        </Box>
      </BoxSTImageWrapper>
      <input
        type="file"
        accept="image/jpeg, image/png"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
      />

      {/* 출석부 이름 */}
      <BoxSTTitle>
        <TypoST>출석부 이름</TypoST>
        <TextField
          sx={{
            "&::placeholder": {
              fontSize: "24px", // 원하는 글꼴 크기로 변경
              width: 339,
            },
          }}
          placeholder="출석부 이름을 입력해주세요."
          inputProps={TextFieldProps}
          onChange={(e) => onChange("title", e.target.value)}
        />
        <TypoST>출석부 설명</TypoST>
        <TextField
          sx={{
            "&::placeholder": {
              fontSize: "24px", // 원하는 글꼴 크기로 변경
              width: 339,
            },
          }}
          placeholder="출석부 설명을 입력해주세요.."
          inputProps={TextFieldProps}
          onChange={(e) => onChange("description", e.target.value)}
        />
      </BoxSTTitle>
      {/*  출석부 지각 사용 여부*/}
      <BoxSTTitle>
        <TypoST>출석부 지각 사용 여부</TypoST>
        <RadioGroup
          aria-label="gender"
          name="gender1"
          value={attendanceCreate?.allowLateness}
          row
          onChange={(e) => {
            onChange("allowLateness", e.target.value);
          }}
          sx={{
            display: "flex",
            gap: "20px",
          }}
        >
          <FormControlLabel value="Y" control={<Radio />} label="사용함" />
          <FormControlLabel
            value="N"
            control={<Radio />}
            label="사용하지 않음"
          />
        </RadioGroup>
      </BoxSTTitle>
      {/*  요일 선택 */}
      <BoxSTTitle>
        <TypoST>요일 선택</TypoST>
        <BoxSTday>
          {daysOfWeek.map((day, index) => (
            <Button
              tabIndex={index}
              key={index}
              sx={{
                border: `1px solid ${
                  selectedDays.has(Object.values(day)[0])
                    ? "#59996B"
                    : "#D5D5D5"
                }`,
                color: selectedDays.has(Object.values(day)[0])
                  ? "#59996B"
                  : "#C9C9C9",
                minWidth: "44px",
              }}
              value={Object.values(day)[0]}
              onClick={(e) => {
                handleSelectDay(e.currentTarget.value);
              }}
            >
              {Object.keys(day)[0]}
            </Button>
          ))}
        </BoxSTday>
      </BoxSTTitle>

      {/*  시간 선택 */}
      <BoxSTTitle>
        <TypoST>시간 선택</TypoST>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <SelectSTTime
            labelId="start-time-label"
            id="start-time-select"
            displayEmpty
            value={attendanceCreate?.availableFrom}
            onChange={(e) => {
              onChange("availableFrom", e.target.value as string);
            }}
            renderValue={(v: any) =>
              v?.length ? v : <span color="#D5D5D5">시작 시간 선택</span>
            }
          >
            {startHours.map((hour) => (
              <MenuItem key={hour} value={hour}>
                {hour}
              </MenuItem>
            ))}
          </SelectSTTime>
          <SelectSTTime
            labelId="end-time-label"
            id="end-time-select"
            displayEmpty
            value={attendanceCreate?.availableTo}
            disabled={attendanceCreate?.availableFrom === ""}
            onChange={(e) => {
              onChange("availableTo", e.target.value as string);
            }}
            renderValue={(v: any) =>
              v?.length ? v : <span color="#D5D5D5">종료 시간 선택</span>
            }
          >
            {endHours.map((hour) => (
              <MenuItem key={hour} value={hour}>
                {hour}
              </MenuItem>
            ))}
          </SelectSTTime>
        </Box>
      </BoxSTTitle>

      {/* <BoxSTSave onClick={() => attendanceMutaion()}>저장하기</BoxSTSave> */}
      <BoxSTbutton>
        <BoxSTcancel onClick={() => setIsCreate(false)}>취소</BoxSTcancel>
        <BoxSTSave onClick={() => attendanceMutaion()}>저장하기</BoxSTSave>
      </BoxSTbutton>
    </ContainerSTForm>
  );
};

export default AttendanceCreateForm;

const ContainerSTForm = styled(Box)(() => {
  return {
    display: "flex",
    paddingTop: "43px",
    gap: "24px",
    flexDirection: "column",
    flexWrap: "wrap",
    width: "100%",
    alignItems: "center",
  };
});

const TextFieldProps = {
  style: {
    backgroundColor: "white",
    width: "339px",
    height: "20px",
    borderRadius: "8px",
    border: "1px solid #D5D5D5",
    fontSize: "16px",
  },
};
const BoxSTImageWrapper = styled(Box)(() => {
  return {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    width: 340,
  };
});

const BoxSTImage = styled(Box)(() => {
  return {
    width: "92px",
    height: "92px",
    border: "1px solid #D5D5D5",
    borderRadius: "8px",
    cursor: "pointer",
  };
});
const BoxSTTitle = styled(Box)(() => {
  return {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    width: "340px",
  };
});

const TypoST = styled(Typography)(() => {
  return {
    fontSize: "14px",
    fontWeight: 500,
    lineHeight: "19.07px",
  };
});

const BoxSTSave = styled(Box)(() => {
  return {
    width: "100%",
    height: "60px",
    background: " #59996B",
    color: "white",
    display: "flex",
    flex: 2.5,
    justifyContent: "space-around",
    alignItems: "center",
  };
});
const BoxSTcancel = styled(Box)(() => {
  return {
    width: "100%",
    height: "60px",
    background: " #C9C9C9",
    color: "white",
    display: "flex",
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
  };
});

const BoxSTbutton = styled(Box)(() => {
  return {
    display: "flex",
    maxWidth: 375,
    width: "100%",
    justifyContent: "center",
  };
});

const SelectSTTime = styled(Select)(() => {
  return {
    width: 163,
    height: 40,
    border: "1px solid #D5D5D5",
    borderRadius: "8px",
  };
});

const BoxSTday = styled(Box)(() => {
  return {
    display: "grid",
    gridTemplateColumns: "repeat(7,1fr)",
    gap: "5px",
    width: "340px",
  };
});
