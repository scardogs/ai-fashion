import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Camera, Sparkles, Zap } from "lucide-react";

export default function Index() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative py-12 md:py-20 lg:py-32 overflow-hidden bg-background">
        <div className="container px-4 md:px-6 relative z-10">
          <div className="flex flex-col items-center text-center space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-4 max-w-3xl"
            >
              <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80 mb-4">
                <Sparkles className="w-3 h-3 mr-1" />
                New: Enhanced Fashion Analysis
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight lg:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
                Master the Art of <br className="hidden sm:inline" />
                <span className="text-foreground">Fashion Prompts</span>
              </h1>
              <p className="mx-auto max-w-[700px] text-muted-foreground text-base md:text-xl">
                Turn your fashion concepts into precise, professional AI prompts in seconds.
                Perfect for designers, photographers, and AI artists.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4 min-[400px]:flex-row justify-center w-full sm:w-auto"
            >
              <Link to="/generate" className="w-full sm:w-auto">
                <Button size="lg" className="h-12 px-8 text-lg gap-2 w-full sm:w-auto">
                  Start Generating <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link to="/how-it-works" className="w-full sm:w-auto">
                <Button variant="outline" size="lg" className="h-12 px-8 text-lg w-full sm:w-auto">
                  How it Works
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Abstract Background Elements */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] opacity-10 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-tr from-secondary to-primary rounded-full blur-3xl animate-pulse" style={{ animationDuration: '4s' }} />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 md:py-16 bg-muted/30">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="flex flex-col items-center text-center p-6 bg-card rounded-xl shadow-sm border border-border/50 hover:border-border transition-colors"
            >
              <div className="p-3 bg-primary/10 rounded-full mb-4 text-primary">
                <Camera className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">Visual Analysis</h3>
              <p className="text-muted-foreground">
                Our advanced AI analyzes your image for specific style, cut, fabric, and lighting details.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex flex-col items-center text-center p-6 bg-card rounded-xl shadow-sm border border-border/50 hover:border-border transition-colors"
            >
              <div className="p-3 bg-secondary/10 rounded-full mb-4 text-secondary-foreground">
                <Sparkles className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">Professional Terminology</h3>
              <p className="text-muted-foreground">
                Automatically translates visual elements into industry-standard fashion photography vocabulary.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="flex flex-col items-center text-center p-6 bg-card rounded-xl shadow-sm border border-border/50 hover:border-border transition-colors"
            >
              <div className="p-3 bg-primary/10 rounded-full mb-4 text-primary">
                <Zap className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">Instant Results</h3>
              <p className="text-muted-foreground">
                Get production-ready Midjourney and Stable Diffusion prompts in seconds.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Demo/Preview Section */}
      <section className="py-12 md:py-20">
        <div className="container px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                From Image to <span className="text-secondary-foreground">Masterpiece</span>
              </h2>
              <p className="text-muted-foreground text-lg">
                Stop struggling with prompt engineering. Simply upload a reference image, and let our AI describe it in the language of professional generative art.
              </p>
              <ul className="space-y-4">
                <li className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-xs">✓</div>
                  <span>Accurate fabric descriptions</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-xs">✓</div>
                  <span>Lighting and camera settings</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-xs">✓</div>
                  <span>Pose and composition details</span>
                </li>
              </ul>
              <Link to="/generate">
                <Button className="mt-4 w-full sm:w-auto" size="lg">Try it Now</Button>
              </Link>
            </div>
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-border bg-muted aspect-video group">
              <img
                src="/imagepreview.png"
                alt="App Interface Preview"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-20 bg-primary text-primary-foreground">
        <div className="container px-4 md:px-6 text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl mb-6">
            Ready to Elevate Your Workflow?
          </h2>
          <p className="mx-auto max-w-[600px] text-primary-foreground/80 text-lg mb-8">
            Join thousands of creators using our tool to generate better fashion prompts.
          </p>
          <Link to="/generate">
            <Button size="lg" variant="secondary" className="h-14 px-10 text-lg font-semibold shadow-lg hover:shadow-xl transition-all w-full sm:w-auto">
              Get Started for Free
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
