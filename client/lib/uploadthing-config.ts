import { generateReactHelpers } from "@uploadthing/react";
import type { OurFileRouter } from "../../server/routes/uploadthing";

export const { useUploadThing, uploadFiles } = generateReactHelpers<OurFileRouter>();
