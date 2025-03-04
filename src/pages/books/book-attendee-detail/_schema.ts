import { z } from "zod";

export const CounsellingSchema = z.object({
  type: z.enum(["PHONE", "VISIT", "KAKAOTALK"]),
  topics: z.array(
    z.enum(["FUTURE_PATH", "STUDY_PROGRESS", "PEER_RELATIONS", "ETC"])
  ),
  counsellingAt: z.string().nonempty({ message: "상담일시는 필수입니다." }),
  description: z.string(),
  counseleeId: z.number().positive({ message: "상담자는 필수입니다." }),
});

export type CreateCounsellingSchema = z.infer<typeof CounsellingSchema>;
