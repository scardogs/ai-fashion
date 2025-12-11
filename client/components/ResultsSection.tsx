import PromptCard from "./PromptCard";
import { Button } from "@/components/ui/button";
import { Loader2, Sparkles } from "lucide-react";

interface ResultsSectionProps {
  prompts: string[] | null;
  labels?: string[];
  combinedPromptFooter?: string;
  // Kling Generator Props
  klingPrompt?: string | null;
  isGeneratingKling?: boolean;
  onGenerateKling?: (prompt: string) => void;
}

function download(filename: string, content: string, type: string) {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export default function ResultsSection({
  prompts,
  labels,
  combinedPromptFooter,
  klingPrompt,
  isGeneratingKling,
  onGenerateKling
}: ResultsSectionProps) {
  const hasPrompts = prompts && prompts.length > 0;

  const handleDownloadText = () => {
    if (!hasPrompts) return;
    const text = prompts
      .map((p) => p)
      .join("\n\n---\n\n");
    download("fashion-prompt.txt", text, "text/plain;charset=utf-8");
  };

  const handleDownloadJson = () => {
    if (!hasPrompts) return;
    const json = JSON.stringify(
      { input: prompts.map((p) => ({ prompt: p })) },
      null,
      2,
    );
    download("fashion-prompts.json", json, "application/json;charset=utf-8");
  };

  const getTitle = (i: number) => {
    if (labels && labels[i]) return labels[i];
    return prompts!.length > 1 ? `Variation ${i + 1}` : "Generated Prompt";
  };

  const combinedPromptContent = prompts
    ? prompts.join("\n\n") + (combinedPromptFooter ? `\n\n${combinedPromptFooter}` : "")
    : "";

  return (
    <section className="space-y-4">
      {hasPrompts && (
        <>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <h2 className="text-xl font-semibold text-foreground">
              Your Fashion Photography Prompt{prompts.length > 1 ? 's' : ''}
            </h2>
            <div className="flex items-center gap-2">
              <Button variant="outline" onClick={handleDownloadText}>
                Download as Text
              </Button>
              <Button onClick={handleDownloadJson}>Download Prompt</Button>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4">
            {prompts.map((p, i) => (
              <PromptCard key={i} title={getTitle(i)} prompt={p} />
            ))}

            {prompts.length > 1 && (
              <>
                <PromptCard
                  key="combined"
                  title="Combined Prompt"
                  prompt={combinedPromptContent}
                />

                {onGenerateKling && (
                  <div className="pt-4 border-t border-dashed border-border mt-4">
                    <div className="flex flex-col gap-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                          <Sparkles className="w-4 h-4 text-purple-500" />
                          Kling AI Prompt Generator
                        </h3>
                        <Button
                          onClick={() => onGenerateKling(combinedPromptContent)}
                          disabled={isGeneratingKling}
                          className="bg-purple-600 hover:bg-purple-700 text-white"
                        >
                          {isGeneratingKling ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Generating...
                            </>
                          ) : (
                            "Generate Kling Prompt"
                          )}
                        </Button>
                      </div>

                      {klingPrompt && (
                        <PromptCard
                          key="kling"
                          title="Generated Kling Prompt"
                          prompt={klingPrompt}
                        />
                      )}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </>
      )}
    </section>
  );
}
