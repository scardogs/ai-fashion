import { Upload, Sparkles, Copy, Camera, Aperture, Palette } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function HowItWorks() {
  const steps = [
    {
      icon: <Upload className="w-8 h-8 text-primary" />,
      title: "1. Upload Your Reference",
      description: "Start by uploading a fashion image that inspires you. It could be a photo of a specific garment, a mood board, or a stylistic reference. We support JPG, PNG, and WEBP formats."
    },
    {
      icon: <Sparkles className="w-8 h-8 text-secondary-foreground" />,
      title: "2. AI Analysis",
      description: "Our advanced computer vision algorithms scan your image to identify key elements: fabric textures, lighting patterns, camera angles, poses, and color palettes."
    },
    {
      icon: <Copy className="w-8 h-8 text-primary" />,
      title: "3. Generate & Copy",
      description: "Receive a detailed, professional-grade prompt optimized for Midjourney, Stable Diffusion, or DALL-E. Simply copy the text and use it in your favorite image generator."
    }
  ];

  const features = [
    {
      icon: <Camera className="w-6 h-6" />,
      title: "Camera Settings",
      description: "We extract implied focal lengths, aperture settings, and shutter speeds to replicate the 'feel' of the shot."
    },
    {
      icon: <Palette className="w-6 h-6" />,
      title: "Color Grading",
      description: "Get precise color codes and lighting descriptions (e.g., 'cinematic lighting', 'golden hour', 'high key')."
    },
    {
      icon: <Aperture className="w-6 h-6" />,
      title: "Composition",
      description: "Understand the rule of thirds, framing, and perspective used in the original image."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
            How It Works
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            From a simple image to a complex creative directive in three simple steps.
          </p>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-12 relative">
            {/* Connecting Line (Desktop only) */}
            <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-border -z-10" />

            {steps.map((step, index) => (
              <div key={index} className="flex flex-col items-center text-center bg-background p-6">
                <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center mb-6 border-4 border-background shadow-sm">
                  {step.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Deep Dive Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Under the Hood</h2>
            <p className="text-primary-foreground/80 max-w-2xl mx-auto">
              Our technology goes beyond simple object recognition. We understand the language of photography.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-primary-foreground/10 backdrop-blur-sm p-8 rounded-xl border border-primary-foreground/20">
                <div className="mb-4 text-secondary">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-primary-foreground/70 text-sm">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-6">Ready to try it out?</h2>
          <Link to="/generate">
            <Button size="lg" className="px-8 h-12 text-lg">
              Start Generating Now
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
