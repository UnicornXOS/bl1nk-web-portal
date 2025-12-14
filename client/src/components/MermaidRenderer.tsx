import { useEffect, useRef, useState } from "react";
import mermaid from "mermaid";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Copy, AlertCircle } from "lucide-react";
import { toast } from "sonner";

interface MermaidRendererProps {
  code: string;
  title?: string;
  description?: string;
  diagramType?: string;
  onExport?: (format: "svg" | "png") => void;
}

// Generate a valid CSS selector ID (only alphanumeric and hyphens)
function generateValidId(): string {
  return `mermaid-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

export default function MermaidRenderer({
  code,
  title = "Diagram",
  description,
  diagramType = "flowchart",
  onExport,
}: MermaidRendererProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgWrapperRef = useRef<HTMLDivElement>(null);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const renderDiagram = async () => {
      if (!containerRef.current || !code) return;

      try {
        setIsError(false);
        setErrorMessage("");
        setIsLoading(true);

        // Initialize mermaid once
        mermaid.initialize({
          startOnLoad: false,
          theme: "dark",
          securityLevel: "loose",
          fontFamily: "Inter, sans-serif",
          flowchart: {
            useMaxWidth: true,
            htmlLabels: false,
            curve: "linear",
          },
          sequence: {
            useMaxWidth: true,
          },
          class: {
            useMaxWidth: true,
          },
        });

        // Generate valid ID (only alphanumeric and hyphens)
        const diagramId = generateValidId();

        // Render diagram
        const { svg: renderedSvg } = await mermaid.render(diagramId, code);

        if (isMounted && svgWrapperRef.current) {
          // Replace content using textContent to avoid innerHTML issues
          svgWrapperRef.current.innerHTML = "";
          const tempDiv = document.createElement("div");
          tempDiv.innerHTML = renderedSvg;
          
          // Move all children from temp div to wrapper
          while (tempDiv.firstChild) {
            svgWrapperRef.current.appendChild(tempDiv.firstChild);
          }

          setIsLoading(false);
        }
      } catch (error) {
        if (isMounted) {
          setIsError(true);
          setErrorMessage(
            error instanceof Error ? error.message : "Failed to render diagram"
          );
          setIsLoading(false);
          console.error("Mermaid render error:", error);
        }
      }
    };

    renderDiagram();

    return () => {
      isMounted = false;
    };
  }, [code]);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(code);
    toast.success("Diagram code copied to clipboard!");
  };

  const handleExport = (format: "svg" | "png") => {
    if (onExport) {
      onExport(format);
    } else {
      // Default export behavior
      if (svgWrapperRef.current && svgWrapperRef.current.querySelector("svg")) {
        const svgElement = svgWrapperRef.current.querySelector("svg") as SVGElement;
        const svgData = new XMLSerializer().serializeToString(svgElement);
        const blob = new Blob([svgData], { type: "image/svg+xml" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `diagram-${Date.now()}.${format}`;
        link.click();
        URL.revokeObjectURL(url);
        toast.success(`Diagram exported as ${format.toUpperCase()}!`);
      }
    }
  };

  return (
    <Card className="bg-slate-800/50 border-cyan-500/20 rounded-2xl overflow-hidden">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <CardTitle className="text-white">{title}</CardTitle>
            {description && (
              <CardDescription className="text-gray-400 mt-1">
                {description}
              </CardDescription>
            )}
          </div>
          <span className="text-xs bg-cyan-500/20 text-cyan-300 px-2 py-1 rounded">
            {diagramType}
          </span>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Diagram Container */}
        {isError ? (
          <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/30 flex gap-3">
            <AlertCircle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-red-300 font-semibold text-sm">Diagram Error</p>
              <p className="text-red-200/70 text-xs mt-1">{errorMessage}</p>
            </div>
          </div>
        ) : (
          <div
            ref={containerRef}
            className="bg-slate-900/50 rounded-lg p-4 border border-slate-700/50 overflow-auto max-h-96 flex items-center justify-center min-h-64"
          >
            <div
              ref={svgWrapperRef}
              className="w-full flex items-center justify-center"
            >
              {isLoading && (
                <div className="text-gray-500 text-sm">Loading diagram...</div>
              )}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-2 flex-wrap">
          <Button
            onClick={handleCopyCode}
            variant="outline"
            size="sm"
            className="border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10 gap-2"
          >
            <Copy size={14} />
            Copy Code
          </Button>
          <Button
            onClick={() => handleExport("svg")}
            variant="outline"
            size="sm"
            className="border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10 gap-2"
          >
            <Download size={14} />
            Export SVG
          </Button>
          <Button
            onClick={() => handleExport("png")}
            variant="outline"
            size="sm"
            className="border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10 gap-2"
          >
            <Download size={14} />
            Export PNG
          </Button>
        </div>

        {/* Code Preview */}
        <details className="text-sm">
          <summary className="cursor-pointer text-gray-400 hover:text-gray-300 transition-colors">
            View Diagram Code
          </summary>
          <div className="mt-2 p-3 bg-slate-900/50 rounded border border-slate-700/50 overflow-auto max-h-40">
            <pre className="text-gray-300 font-mono text-xs whitespace-pre-wrap break-words">
              {code}
            </pre>
          </div>
        </details>
      </CardContent>
    </Card>
  );
}
