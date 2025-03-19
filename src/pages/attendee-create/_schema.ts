import { z } from "zod";

// Associate 스키마
export const AssociateSchema = z.object({
  name: z.string().optional(),
  gender: z.enum(["MALE", "FEMALE"]).optional(), // 필요에 따라 값 수정
  relationType: z.enum(["FATHER", "MOTHER", "SIBLING", "OTHER"]),
  phoneNumber: z
    .string({})
    .transform((val) =>
      val === "" || val === undefined || val === null ? "01000000000" : val
    ),
  relationDescription: z.string().optional(),
  description: z.string().optional(),
});

const ProgressSchema = z.object({
  startAt: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "유효한 날짜 형식이 아닙니다.",
  }),
  gradeId: z.number(),
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

// AttendeeRequest 스키마
export const AttendeeRequestSchema = z.object({
  name: z.string().min(1, "이름은 최소 1글자 이상이어야 합니다."),
  actualName: z.string().optional(),
  gender: z.enum(["MALE", "FEMALE"], { message: "성별을 선택해주세요." }),
  birthDate: z.string().min(10, { message: "생년월일은 필수입니다." }),
  enrollmentDate: z.string().min(10, { message: "학생 입학일은 필수입니다." }),
  phoneNumber: z.string().optional(),
  description: z.string().optional(),
  school: z.string().optional(),
  initialGradeId: z.number().default(0).optional(),
  isBeginner: z.boolean().optional(),
  attendeeId: z.number().optional(),
  address_1: z.string().optional(),
  address_2: z.string().optional(),
  associates: z.array(AssociateSchema).optional(),
});

// SchedulesRequest 스키마
export const SchedulesRequestSchema = z.object({
  schedules: z
    .array(ScheduleSchema)
    .min(1, { message: "스케줄을 입력해주세요." }),
});

// ProgressRequest 스키마
export const ProgressRequestSchema = z.object({
  progresses: z
    .array(ProgressSchema)
    .min(1, { message: "진도를 입력해주세요." }),
  subject: z.object({
    title: z.string(),
    id: z.number(),
  }),
  subjectCourse: z.object({
    level: z.number(),
    subjectCourseId: z.number(),
    title: z.string(),
  }),
});

// 최종 메인 스키마
export const AttendeeSchema = z.object({
  attendeeRequest: AttendeeRequestSchema,
  schedulesRequest: SchedulesRequestSchema,
  progressRequest: ProgressRequestSchema,
});

export type CreateAttendeeSchema = z.infer<typeof AttendeeSchema>;
