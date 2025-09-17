import { useState } from "react"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select"
import { Card, CardContent } from "../components/ui/card"
import { ChevronDown, ChevronUp, Github, Terminal } from "lucide-react"

export default function App() {
  // Hero text (without animation)
  const displayText = "Static"
  const [isExpanded, setIsExpanded] = useState(false)
  const [terminalOutput, setTerminalOutput] = useState("")
  const [fixedUrl, setFixedUrl] = useState("https://api.sigaa.ufba.br")
  const [sampleSelect, setSampleSelect] = useState("")
  const [textInput, setTextInput] = useState("")

  // Animation removed as requested

  const handleConfirm = () => {
    const output = `> Executing request...\n> URL: ${fixedUrl}\n> Sample: ${sampleSelect}\n> Input: ${textInput}\n> Status: 200 OK\n> Response:{"status": "success", "data": "Sample response data"}\n> Execution completed successfully.`
    setTerminalOutput(output)
    setIsExpanded(true)
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero */}
      <section className="flex flex-col items-center justify-center min-h-screen px-4">
        <div className="text-center space-y-4">
          <div className="space-y-2">
            <h1 className="text-6xl md:text-8xl font-bold font-mono">
              <span className="inline-block">{displayText}</span>
              <span className="ml-2">SIGAA</span>
            </h1>
            <div className="flex justify-end">
              <span className="text-2xl md:text-4xl font-mono text-muted-foreground">UFBA</span>
            </div>
          </div>
          <p className="text-lg md:text-xl text-muted-foreground font-mono max-w-2xl">
            {"> Terminal interface for SIGAA UFBA academic system"}
          </p>
        </div>
      </section>

      {/* Playground */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold font-mono text-center mb-12 terminal-prompt">Playground</h2>

          <Card className="bg-card border-border mb-6">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                <div className="space-y-2">
                  <label className="text-sm font-mono text-foreground">Fixed URL</label>
                  <Input
                    value={fixedUrl}
                    onChange={(e) => setFixedUrl(e.target.value)}
                    className="font-mono bg-input text-foreground border-border"
                    placeholder="https://api.sigaa.ufba.br"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-mono text-foreground">Sample</label>
                  <Select value={sampleSelect} onValueChange={setSampleSelect}>
                    <SelectTrigger className="font-mono bg-input text-foreground border-border">
                      <SelectValue placeholder="Select sample" />
                    </SelectTrigger>
                    <SelectContent className="bg-popover border-border">
                      <SelectItem value="students" className="font-mono">Students</SelectItem>
                      <SelectItem value="courses" className="font-mono">Courses</SelectItem>
                      <SelectItem value="grades" className="font-mono">Grades</SelectItem>
                      <SelectItem value="schedule" className="font-mono">Schedule</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-mono text-foreground">Input</label>
                  <Input
                    value={textInput}
                    onChange={(e) => setTextInput(e.target.value)}
                    className="font-mono bg-input text-foreground border-border"
                    placeholder="Enter parameters..."
                  />
                </div>

                <Button onClick={handleConfirm} className="bg-secondary text-secondary-foreground hover:bg-secondary/80 font-mono">
                  <Terminal className="w-4 h-4 mr-2" />
                  Execute
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardContent className="p-0">
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="w-full p-4 flex items-center justify-between text-left font-mono hover:bg-secondary/10 transition-colors"
              >
                <span className="flex items-center">
                  <Terminal className="w-4 h-4 mr-2" />
                  Terminal Output
                </span>
                {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>

              {isExpanded && (
                <div className="border-t border-border">
                  <div className="p-4 bg-background font-mono text-sm">
                    <pre className="whitespace-pre-wrap text-foreground">
                      {terminalOutput || "> Waiting for execution..."}
                    </pre>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Collaboration */}
      <section className="py-20 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold font-mono mb-6 terminal-prompt">Contribute</h2>
          <p className="text-lg text-muted-foreground font-mono mb-8">
            {"> Help improve Static SIGAA UFBA"}
            <br />
            {"> Report issues, suggest features, or contribute code"}
          </p>

          <Button asChild size="lg" className="bg-secondary text-secondary-foreground hover:bg-secondary/80 font-mono">
            <a
              href="https://github.com/your-repo/static-sigaa-ufba"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center"
            >
              <Github className="w-5 h-5 mr-2" />
              View Repository
            </a>
          </Button>
        </div>
      </section>
    </div>
  )
}
