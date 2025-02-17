import { z } from "zod";

// Associate 스키마
const AssociateSchema = z.object({
  name: z.string(),
  gender: z.enum(["MALE", "FEMALE"]), // 필요에 따라 값 수정
  relationType: z.enum(["FATHER", "MOTHER", "SIBLING", "OTHER"]), // 예시 enum 값
  phoneNumber: z.string(),
  relationDescription: z.string(),
  description: z.string(),
});

// AttendeeRequest 스키마
const AttendeeRequestSchema = z.object({
  name: z.string().min(1, "이름은 최소 1글자 이상이어야 합니다."),
  actualName: z.string(),
  gender: z.enum(["MALE", "FEMALE"]),
  birthDate: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "유효한 날짜 형식이 아닙니다.",
  }),
  enrollmentDate: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "유효한 날짜 형식이 아닙니다.",
  }),
  phoneNumber: z.string(),
  description: z.string(),
  school: z.string(),
  initialGradeId: z.number(),
  isBeginner: z.boolean(),
  attendeeId: z.number(),
  address_1: z.string().min(1, "주소는 필수 입니다."),
  address_2: z.string(),
  associates: z.array(AssociateSchema),
});

// Schedule 스키마
const ScheduleSchema = z.object({
  hhmm: z.string(), // 시간 형식에 맞춰 추가 검증 가능
  day: z.enum([
    "MONDAY",
    "TUESDAY",
    "WEDNESDAY",
    "THURSDAY",
    "FRIDAY",
    "SATURDAY",
    "SUNDAY",
  ]),
});

// SchedulesRequest 스키마
const SchedulesRequestSchema = z.object({
  schedules: z.array(ScheduleSchema),
});

// Progress 스키마
const ProgressSchema = z.object({
  startAt: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "유효한 날짜 형식이 아닙니다.",
  }),
  gradeId: z.number(),
});

// ProgressRequest 스키마
const ProgressRequestSchema = z.object({
  progresses: z.array(ProgressSchema),
});

// 최종 메인 스키마
export const AttendeeSchema = z.object({
  attendeeRequest: AttendeeRequestSchema,
  schedulesRequest: SchedulesRequestSchema,
  progressRequest: ProgressRequestSchema,
});

export type CreateAttendeeSchema = z.infer<typeof AttendeeSchema>;
