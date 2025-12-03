import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

export interface AdvancedSettingsProps {
    ethnicity: string;
    setEthnicity: (value: string) => void;
    skinColor: string;
    setSkinColor: (value: string) => void;
    facialExpression: string;
    setFacialExpression: (value: string) => void;
    imperfection: string;
    setImperfection: (value: string) => void;
}

export default function AdvancedSettings({
    ethnicity,
    setEthnicity,
    skinColor,
    setSkinColor,
    facialExpression,
    setFacialExpression,
    imperfection,
    setImperfection,
}: AdvancedSettingsProps) {
    return (
        <div className="rounded-xl border border-border bg-white p-6 shadow-sm space-y-4">
            <h2 className="text-lg font-semibold text-foreground mb-2">
                Advanced Settings
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="ethnicity">Ethnicity</Label>
                    <Select value={ethnicity} onValueChange={setEthnicity}>
                        <SelectTrigger id="ethnicity">
                            <SelectValue placeholder="Select Ethnicity" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="asian">Asian</SelectItem>
                            <SelectItem value="black">Black</SelectItem>
                            <SelectItem value="hispanic">Hispanic</SelectItem>
                            <SelectItem value="white">White</SelectItem>
                            <SelectItem value="mixed">Mixed</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="skinColor">Skin Color</Label>
                    <Select value={skinColor} onValueChange={setSkinColor}>
                        <SelectTrigger id="skinColor">
                            <SelectValue placeholder="Select Skin Color" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="fair">Fair</SelectItem>
                            <SelectItem value="light">Light</SelectItem>
                            <SelectItem value="medium">Medium</SelectItem>
                            <SelectItem value="tan">Tan</SelectItem>
                            <SelectItem value="dark">Dark</SelectItem>
                            <SelectItem value="deep">Deep</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="facialExpression">Facial Expression</Label>
                    <Select value={facialExpression} onValueChange={setFacialExpression}>
                        <SelectTrigger id="facialExpression">
                            <SelectValue placeholder="Select Expression" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="neutral">Neutral</SelectItem>
                            <SelectItem value="happy">Happy</SelectItem>
                            <SelectItem value="sad">Sad</SelectItem>
                            <SelectItem value="angry">Angry</SelectItem>
                            <SelectItem value="surprised">Surprised</SelectItem>
                            <SelectItem value="serious">Serious</SelectItem>
                            <SelectItem value="smiling">Smiling</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="imperfection">Imperfection</Label>
                    <Input
                        id="imperfection"
                        placeholder="e.g. freckles, scar, mole"
                        value={imperfection}
                        onChange={(e) => setImperfection(e.target.value)}
                    />
                </div>
            </div>
        </div>
    );
}
