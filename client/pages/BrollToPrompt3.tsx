import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useUploadThing } from "@/lib/uploadthing-config";
import { sendToWebhook, normalizeWebhookResponse } from "@/lib/broll3-webhook";
import { toast } from "sonner";
import { Loader2, Upload, X, Image as ImageIcon } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export default function BrollToPrompt3() {
    const [file, setFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);
    const [isUploading, setIsUploading] = useState(false);
    const [isSendingToWebhook, setIsSendingToWebhook] = useState(false);
    const [prompts, setPrompts] = useState<string[] | null>(null);
    const [error, setError] = useState<string | null>(null);

    const { startUpload } = useUploadThing("imageUploader", {
        onClientUploadComplete: (res) => {
            console.log("Upload complete:", res);
            if (res && res[0]?.url) {
                setUploadedUrl(res[0].url);
                toast.success("Image uploaded successfully!");
                // Automatically send to webhook after upload
                handleSendToWebhook(res[0].url);
            }
        },
        onUploadError: (error: Error) => {
            console.error("Upload error:", error);
            setError(error.message);
            toast.error(`Upload failed: ${error.message}`);
            setIsUploading(false);
        },
    });

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (!selectedFile) return;

        // Validate file type
        if (!selectedFile.type.startsWith("image/")) {
            toast.error("Please select an image file");
            return;
        }

        // Validate file size (16MB max)
        if (selectedFile.size > 16 * 1024 * 1024) {
            toast.error("File size must be less than 16MB");
            return;
        }

        setFile(selectedFile);
        setError(null);
        setPrompts(null);
        setUploadedUrl(null);

        // Create preview
        const url = URL.createObjectURL(selectedFile);
        setPreviewUrl(url);
    };

    const handleUpload = async () => {
        if (!file) return;

        setIsUploading(true);
        setError(null);

        try {
            await startUpload([file]);
        } catch (err: any) {
            console.error("Upload error:", err);
            setError(err.message || "Upload failed");
            toast.error("Upload failed");
            setIsUploading(false);
        }
    };

    const handleSendToWebhook = async (url: string) => {
        setIsSendingToWebhook(true);
        setError(null);

        try {
            toast.info("Sending to webhook for processing...");
            const response = await sendToWebhook(url);
            const extractedPrompts = normalizeWebhookResponse(response);

            if (extractedPrompts.length > 0) {
                setPrompts(extractedPrompts);
                toast.success("Prompts generated successfully!");
            } else {
                // Show raw response if no prompts extracted
                setPrompts([JSON.stringify(response, null, 2)]);
                toast.success("Webhook response received!");
            }
        } catch (err: any) {
            console.error("Webhook error:", err);
            setError(err.message || "Failed to process image");
            toast.error("Failed to process image");
        } finally {
            setIsSendingToWebhook(false);
            setIsUploading(false);
        }
    };

    const handleReset = () => {
        setFile(null);
        if (previewUrl) {
            URL.revokeObjectURL(previewUrl);
        }
        setPreviewUrl(null);
        setUploadedUrl(null);
        setPrompts(null);
        setError(null);
    };

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        toast.success("Copied to clipboard!");
    };

    const isProcessing = isUploading || isSendingToWebhook;

    return (
        <div className="container mx-auto py-10">
            <section className="mb-10">
                <div className="max-w-3xl space-y-3">
                    <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
                        Broll Scene Image to Prompt 3.0
                    </h1>
                    <p className="text-foreground/80 text-lg">
                        Upload your b-roll scene images and generate professional prompts instantly
                    </p>
                </div>
            </section>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                {/* Upload Section */}
                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Upload Image</CardTitle>
                            <CardDescription>
                                Select an image file (JPG, PNG, WEBP) up to 16MB
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {!file ? (
                                <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-border rounded-lg cursor-pointer bg-muted/50 hover:bg-muted transition-colors">
                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                        <Upload className="w-12 h-12 mb-4 text-muted-foreground" />
                                        <p className="mb-2 text-sm text-muted-foreground">
                                            <span className="font-semibold">Click to upload</span> or drag and drop
                                        </p>
                                        <p className="text-xs text-muted-foreground">
                                            PNG, JPG, WEBP (MAX. 16MB)
                                        </p>
                                    </div>
                                    <input
                                        type="file"
                                        className="hidden"
                                        accept="image/*"
                                        onChange={handleFileSelect}
                                    />
                                </label>
                            ) : (
                                <div className="space-y-4">
                                    <div className="relative">
                                        <img
                                            src={previewUrl!}
                                            alt="Preview"
                                            className="w-full h-64 object-cover rounded-lg border border-border"
                                        />
                                        <Button
                                            variant="destructive"
                                            size="icon"
                                            className="absolute top-2 right-2"
                                            onClick={handleReset}
                                            disabled={isProcessing}
                                        >
                                            <X className="h-4 w-4" />
                                        </Button>
                                    </div>

                                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                        <ImageIcon className="h-4 w-4" />
                                        <span className="truncate">{file.name}</span>
                                        <span className="ml-auto">
                                            {(file.size / 1024 / 1024).toFixed(2)} MB
                                        </span>
                                    </div>

                                    <Button
                                        onClick={handleUpload}
                                        disabled={isProcessing || !!uploadedUrl}
                                        className="w-full"
                                    >
                                        {isProcessing ? (
                                            <>
                                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                {isSendingToWebhook ? "Processing..." : "Uploading..."}
                                            </>
                                        ) : uploadedUrl ? (
                                            "✓ Uploaded & Processed"
                                        ) : (
                                            "Upload & Generate Prompt"
                                        )}
                                    </Button>

                                    {error && (
                                        <div className="p-3 rounded-md bg-destructive/10 text-destructive text-sm">
                                            {error}
                                        </div>
                                    )}
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {uploadedUrl && (
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-sm">Uploaded Image URL</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center gap-2">
                                    <input
                                        type="text"
                                        readOnly
                                        value={uploadedUrl}
                                        className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm"
                                    />
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => copyToClipboard(uploadedUrl)}
                                    >
                                        Copy
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    )}
                </div>

                {/* Results Section */}
                <div className="space-y-6">
                    {prompts && prompts.length > 0 && (
                        <Card>
                            <CardHeader>
                                <CardTitle>Generated Prompts</CardTitle>
                                <CardDescription>
                                    Copy and use these prompts for your projects
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {prompts.map((prompt, index) => (
                                    <div key={index} className="space-y-2">
                                        <div className="flex items-center justify-between">
                                            <Label>
                                                {prompts.length > 1 ? `Prompt ${index + 1}` : "Prompt"}
                                            </Label>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => copyToClipboard(prompt)}
                                            >
                                                Copy
                                            </Button>
                                        </div>
                                        <Textarea
                                            value={prompt}
                                            readOnly
                                            className="min-h-[120px] font-mono text-sm"
                                        />
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    )}

                    {!prompts && !file && (
                        <Card className="border-dashed">
                            <CardContent className="flex flex-col items-center justify-center py-16 text-center">
                                <ImageIcon className="h-16 w-16 text-muted-foreground/50 mb-4" />
                                <h3 className="font-semibold text-lg mb-2">No image uploaded</h3>
                                <p className="text-sm text-muted-foreground max-w-sm">
                                    Upload an image to get started. Your prompts will appear here once
                                    processing is complete.
                                </p>
                            </CardContent>
                        </Card>
                    )}
                </div>
            </div>
        </div>
    );
}
