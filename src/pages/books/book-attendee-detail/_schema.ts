import { z } from "zod";

export const CounsellingSchema = z.object({
  type: z.enum(["PHONE", "VISIT", "KAKAOTALK"], {
    message: "상담 유형은 필수입니다.",
  }),
  topics: z.array(
    z.enum(["FUTURE_PATH", "STUDY_PROGRESS", "PEER_RELATIONS", "ETC"]),
    { message: "상담 주제는 필수입니다." }
  ),

  counsellingAt: z.string().nonempty({ message: "상담일시는 필수입니다." }),
  description: z.string(),
  counseleeId: z.number().optional(),
});

export type CreateCounsellingSchema = z.infer<typeof CounsellingSchema>;
