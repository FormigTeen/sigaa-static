import { Button } from "../components/ui/button"
import { Github, Terminal } from "lucide-react"
import {getProjectUrl} from "../utils/config.ts";

export default function App() {
  // CTA only – no playground state

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero */}
        <Hero />

      {/* CTA for API v1 */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold font-mono text-center mb-6 terminal-prompt">API v1</h2>
          <p className="text-lg text-muted-foreground font-mono mb-8">{"> Acesse os endpoints disponíveis da API v1"}</p>
          <Button asChild size="lg" className="bg-secondary text-secondary-foreground hover:bg-secondary/80 font-mono">
            <a href={`${getProjectUrl()}/api/v1`} className="inline-flex items-center">
              <Terminal className="w-4 h-4 mr-2" />
              Ir para /api/v1
            </a>
          </Button>
        </div>
      </section>

      {/* Collaboration */}
      <section className="py-20 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold font-mono mb-6 terminal-prompt">Como Contribuir</h2>
          <p className="text-lg text-muted-foreground font-mono mb-8">
            {"> Ajdue a melhorar as ferramentas e recursos do Static SIGAA UFBA"}
            <br />
            {"> Para problemas, sugestões de melhorias ou contribuição em código"}
          </p>

          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button asChild size="lg" className="bg-secondary text-secondary-foreground hover:bg-secondary/80 font-mono">
              <a
                href="https://github.com/FormigTeen/sigaa-cli"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center"
              >
                <Github className="w-5 h-5 mr-2" />
                Repositório da SGIGAA CLI
              </a>
            </Button>
            <Button asChild size="lg" className="bg-secondary text-secondary-foreground hover:bg-secondary/80 font-mono">
              <a
                href="https://github.com/FormigTeen/sigaa-static"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center"
              >
                <Github className="w-5 h-5 mr-2" />
                Repositório do Static SIGAA UFBA
              </a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

const Hero = () => {
    return (
        <section className="flex flex-col items-center justify-center min-h-screen px-4">
            <div className="text-center space-y-4">
                <div className="space-y-2">
                    <h1 className="text-6xl md:text-8xl font-bold font-mono">
                        <span className="inline-block">Static</span>
                        <span className="ml-2">SIGAA</span>
                    </h1>
                    <div className="flex justify-end">
                        <span className="text-2xl md:text-4xl font-mono text-muted-foreground">UFBA</span>
                    </div>
                </div>
                <p className="text-lg md:text-xl text-muted-foreground font-mono max-w-2xl">
                    {"> API Estática do SIGAA da UFBA para desenvolvedores e entusiastas"}
                </p>
            </div>
        </section>
    )
}
