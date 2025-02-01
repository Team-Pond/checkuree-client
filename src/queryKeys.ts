import { createQueryKeys } from "@lukemorales/query-key-factory";

export const courseQueryKeys = {
  subjects: ["subjects"] as const,

  subjectItems: (subjectTitle?: string) =>
    ["subject-items", subjectTitle] as const,
};
