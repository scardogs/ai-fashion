import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Heart, Shield, Zap, Users } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 lg:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-muted/20 -z-10" />
        <div className="container mx-auto px-4 text-center">
          <span className="inline-block py-1 px-3 rounded-full bg-secondary/20 text-secondary-foreground text-sm font-semibold mb-6">
            Our Mission
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-8 max-w-4xl mx-auto">
            Bridging the gap between <span className="text-primary">Visual Inspiration</span> and <span className="text-secondary-foreground">Generative Art</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            We believe that prompt engineering shouldn't be a barrier to creativity.
            Our tool empowers designers, photographers, and artists to speak the language of AI fluently.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold">The Story Behind the Tool</h2>
              <div className="space-y-4 text-lg text-muted-foreground">
                <p>
                  As generative AI tools like Midjourney and Stable Diffusion exploded in popularity, we noticed a common frustration:
                  <strong> "How do I describe this specific look?"</strong>
                </p>
                <p>
                  Fashion photography, in particular, relies on subtle nuances—lighting ratios, fabric weights, and compositional tension—that are hard to put into words.
                </p>
                <p>
                  We built the <strong>Fashion Prompt Generator</strong> to solve this. By training our models on thousands of professional fashion editorials, we created a translator that turns visual vibes into technical text.
                </p>
              </div>
            </div>
            <div className="bg-muted rounded-2xl p-8 md:p-12 border border-border">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <h3 className="text-4xl font-bold text-primary">10k+</h3>
                  <p className="text-sm text-muted-foreground">Prompts Generated</p>
                </div>
                <div className="space-y-2">
                  <h3 className="text-4xl font-bold text-primary">98%</h3>
                  <p className="text-sm text-muted-foreground">Accuracy Rate</p>
                </div>
                <div className="space-y-2">
                  <h3 className="text-4xl font-bold text-primary">24/7</h3>
                  <p className="text-sm text-muted-foreground">Availability</p>
                </div>
                <div className="space-y-2">
                  <h3 className="text-4xl font-bold text-primary">Free</h3>
                  <p className="text-sm text-muted-foreground">For Everyone</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold">Why We Do It</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-primary-foreground/5 p-8 rounded-xl border border-primary-foreground/10">
              <Heart className="w-10 h-10 mb-6 text-secondary" />
              <h3 className="text-xl font-bold mb-3">For the Creators</h3>
              <p className="text-primary-foreground/70">
                We build tools that enhance human creativity, not replace it. Our goal is to speed up your workflow.
              </p>
            </div>
            <div className="bg-primary-foreground/5 p-8 rounded-xl border border-primary-foreground/10">
              <Shield className="w-10 h-10 mb-6 text-secondary" />
              <h3 className="text-xl font-bold mb-3">Privacy First</h3>
              <p className="text-primary-foreground/70">
                Your uploaded images are processed securely and are never used to train our public models without consent.
              </p>
            </div>
            <div className="bg-primary-foreground/5 p-8 rounded-xl border border-primary-foreground/10">
              <Zap className="w-10 h-10 mb-6 text-secondary" />
              <h3 className="text-xl font-bold mb-3">Constant Innovation</h3>
              <p className="text-primary-foreground/70">
                As AI models evolve, so do we. We constantly update our prompt syntax to match the latest model versions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team/Community CTA */}
      <section className="py-24 text-center">
        <div className="container mx-auto px-4 max-w-3xl">
          <Users className="w-16 h-16 mx-auto mb-6 text-muted-foreground/50" />
          <h2 className="text-3xl font-bold mb-6">Join the Community</h2>
          <p className="text-xl text-muted-foreground mb-10">
            We are an open-source initiative supported by a passionate community of developers and artists.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <Button variant="outline" size="lg" className="px-8">
                Contact Us
              </Button>
            </Link>
            <Link to="/generate">
              <Button size="lg" className="px-8">
                Try the Generator
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
