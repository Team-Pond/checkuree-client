import { z } from "zod";

export const CounsellingSchema = z.object({
  counsellingType: z.enum(["PHONE", "VISIT", "KAKAOTALK"]),
  counsellingTopicTypes: z.array(
    z.enum(["FUTURE_PATH", "STUDY_PROGRESS", "PEER_RELATIONS", "ETC"]),
  ),
  counsellingDate: z.string().nonempty({ message: "상담일시는 필수입니다." }),
  description: z.string(),
  counseleeId: z.number().positive({ message: "상담자는 필수입니다." }),
});

export type CreateCounsellingSchema = z.infer<typeof CounsellingSchema>;
