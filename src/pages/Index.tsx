import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Sparkles, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const { toast } = useToast();

  const generateImage = async () => {
    if (!prompt.trim()) {
      toast({
        title: "Please enter a prompt",
        description: "Describe the image you want to generate",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    setGeneratedImage(null);

    try {
      const response = await fetch(
        "https://yohanhailet.app.n8n.cloud/webhook-test/image",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ prompt }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to generate image");
      }

      const blob = await response.blob();
      const imageUrl = URL.createObjectURL(blob);
      setGeneratedImage(imageUrl);

      toast({
        title: "Image generated!",
        description: "Your AI-generated image is ready",
      });
    } catch (error) {
      console.error("Error generating image:", error);
      toast({
        title: "Generation failed",
        description: "There was an error generating your image. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const downloadImage = () => {
    if (generatedImage) {
      const link = document.createElement("a");
      link.href = generatedImage;
      link.download = `ai-generated-${Date.now()}.png`;
      link.click();
    }
  };

  return (
    <div className="min-h-screen gradient-hero">
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            AI Image Generator
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Transform your ideas into stunning visuals with the power of AI
          </p>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Input Section */}
          <div className="bg-card border border-border rounded-2xl p-6 shadow-2xl backdrop-blur-sm">
            <label htmlFor="prompt" className="text-sm font-medium text-foreground mb-2 block">
              Describe your image
            </label>
            <Textarea
              id="prompt"
              placeholder="e.g., a raccoon DJ at a rooftop party, digital art style"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="min-h-[120px] resize-none bg-input border-border text-foreground placeholder:text-muted-foreground"
              disabled={isGenerating}
            />
            <Button
              onClick={generateImage}
              disabled={isGenerating || !prompt.trim()}
              className="w-full mt-4 bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity text-primary-foreground font-semibold py-6"
              size="lg"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-5 w-5" />
                  Generate Image
                </>
              )}
            </Button>
          </div>

          {/* Image Display Section */}
          {(isGenerating || generatedImage) && (
            <div className="bg-card border border-border rounded-2xl p-6 shadow-2xl backdrop-blur-sm animate-fade-in">
              <div className="aspect-square bg-muted rounded-xl overflow-hidden relative">
                {isGenerating && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center space-y-4">
                      <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
                      <p className="text-muted-foreground">Creating your masterpiece...</p>
                    </div>
                  </div>
                )}
                {generatedImage && (
                  <>
                    <img
                      src={generatedImage}
                      alt="AI Generated"
                      className="w-full h-full object-contain"
                    />
                    <Button
                      onClick={downloadImage}
                      className="absolute top-4 right-4 bg-card/80 backdrop-blur-sm hover:bg-card"
                      size="icon"
                      variant="secondary"
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                  </>
                )}
              </div>
              {generatedImage && (
                <p className="text-sm text-muted-foreground mt-4 text-center">
                  {prompt}
                </p>
              )}
            </div>
          )}

          {/* Example Prompts */}
          {!generatedImage && !isGenerating && (
            <div className="text-center space-y-4 animate-fade-in">
              <p className="text-sm text-muted-foreground">Try these examples:</p>
              <div className="flex flex-wrap justify-center gap-2">
                {[
                  "a futuristic city at sunset",
                  "a magical forest with glowing mushrooms",
                  "abstract art with vibrant colors",
                ].map((example) => (
                  <Button
                    key={example}
                    variant="outline"
                    size="sm"
                    onClick={() => setPrompt(example)}
                    className="border-border hover:border-primary transition-colors"
                  >
                    {example}
                  </Button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
