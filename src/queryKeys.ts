// src/queryKeys/courseQueryKeys.ts

export const courseQueryKeys = {
  subjects: ["subjects"] as const,

  subjectItems: (subjectTitle?: string) =>
    ["subject-items", subjectTitle] as const,
};
