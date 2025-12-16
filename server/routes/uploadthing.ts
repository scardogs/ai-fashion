import { createUploadthing, type FileRouter } from "uploadthing/server";
import type { UploadThingError } from "uploadthing/server";

const f = createUploadthing();

/**
 * UploadThing File Router
 * Define your upload endpoints here
 */
export const ourFileRouter = {
    imageUploader: f({ image: { maxFileSize: "16MB" } })
        .middleware(async ({ req }) => {
            // You can add authentication logic here if needed
            return { userId: "anonymous" };
        })
        .onUploadComplete(async ({ metadata, file }) => {
            console.log("Upload complete for file:", file.url);
            console.log("File metadata:", metadata);

            // Send to webhook after upload
            try {
                const webhookUrl = "https://n8n.srv1151765.hstgr.cloud/webhook/upload-broll";
                const response = await fetch(webhookUrl, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        imageUrl: file.url,
                        fileName: file.name,
                        fileSize: file.size,
                        timestamp: new Date().toISOString(),
                    }),
                });

                if (response.ok) {
                    console.log("Webhook notification sent successfully");
                } else {
                    console.error("Webhook notification failed:", response.statusText);
                }
            } catch (error) {
                console.error("Error sending webhook notification:", error);
            }

            // Return data available to the client
            return { uploadedBy: metadata.userId, url: file.url };
        }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
