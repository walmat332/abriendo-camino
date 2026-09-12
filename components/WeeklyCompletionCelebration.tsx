"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

type WeeklyPhase =
  | "CONEXIÓN"
  | "CRECIMIENTO"
  | "SERVICIO"
  | "MULTIPLICACIÓN";

interface WeeklyCelebrationProps {
  semana: number;
  esSemana4: boolean;
  onNavigate: (path: string) => void;
}

const weeklyContent: Record<number, {
  fase: WeeklyPhase;
  frase: string;
  siguientePaso: string;
  botonTexto: string;
}> = {
  1: {
    fase: "CONEXIÓN",
    frase: "No estás llamado a caminar solo. Dios te conecta con Él y con otros.",
    siguientePaso: "CONOCE Y CONECTA",
    botonTexto: "Comenzar Semana 2",
  },
  2: {
    fase: "CRECIMIENTO",
    frase: "Lo que Dios comienza en ti, Él también quiere hacerlo crecer.",
    siguientePaso: "SIGUE CRECIENDO",
    botonTexto: "Comenzar Semana 3",
  },
  3: {
    fase: "SERVICIO",
    frase: "Lo que Dios puso en ti puede convertirse en una bendición para otros.",
    siguientePaso: "PONLO EN ACCIÓN",
    botonTexto: "Comenzar Semana 4",
  },
  4: {
    fase: "MULTIPLICACIÓN",
    frase: "Jesús llamó, formó y envió. Ahora tú puedes ayudar a otros a caminar con Él.",
    siguientePaso: "COMPARTE LO QUE VIVISTE",
    botonTexto: "Finalizar 4 Semanas",
  },
};

const confettiPieces = [
  { left: "10%", delay: 0, duration: 9, color: "#f6d365" },
  { left: "20%", delay: 1.2, duration: 10, color: "#fda085" },
  { left: "30%", delay: 2.1, duration: 8.5, color: "#c3aed6" },
  { left: "42%", delay: 0.7, duration: 9.5, color: "#f6d365" },
  { left: "55%", delay: 1.8, duration: 10.5, color: "#fda085" },
  { left: "68%", delay: 0.4, duration: 9, color: "#c3aed6" },
  { left: "78%", delay: 2.6, duration: 11, color: "#f6d365" },
  { left: "88%", delay: 1.5, duration: 9.2, color: "#fda085" },
] as const;

export function WeeklyCompletionCelebration({ semana, esSemana4, onNavigate }: WeeklyCelebrationProps) {
  const content = weeklyContent[semana];

  if (!content) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-gradient-to-br from-slate-950 via-indigo-950 to-violet-950 flex items-center justify-center p-4">
      <div className="absolute inset-0" aria-hidden="true">
        {confettiPieces.map((piece, index) => (
          <span
            key={index}
            className="absolute top-0 w-2 h-3 rounded-sm opacity-70 animate-confetti"
            style={{
              left: piece.left,
              backgroundColor: piece.color,
              animationDelay: `${piece.delay}s`,
              animationDuration: `${piece.duration}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 w-full max-w-md animate-fade-up">
        <Card className="bg-white/95 backdrop-blur-sm shadow-2xl border border-white/10 rounded-3xl overflow-hidden">
          <div className="h-1.5 bg-gradient-to-r from-amber-400 via-rose-400 to-violet-500" />
          <CardContent className="p-8 text-center">
            <div className="text-6xl mb-4">🎉</div>
            <h1 className="text-2xl font-bold text-slate-900 mb-1">¡Lo lograste!</h1>
            <p className="text-lg text-slate-600 mb-6">Completaste 7 días</p>

            <p className="text-xl font-bold text-slate-900 mb-4">{content.fase}</p>
            <p className="text-slate-700 mb-8 leading-relaxed">{content.frase}</p>

            <div className="mb-8">
              <span className="text-sm font-medium text-slate-500">{content.siguientePaso}</span>
            </div>

            {esSemana4 ? (
              <Button
                className="w-full bg-slate-900 text-white py-3 rounded-xl font-semibold text-lg hover:bg-slate-800 transition-colors"
                onClick={() => onNavigate('/abriendo-camino/grupos')}
              >
                {content.botonTexto}
              </Button>
            ) : (
              <Button
                className="w-full bg-slate-900 text-white py-3 rounded-xl font-semibold text-lg hover:bg-slate-800 transition-colors"
                onClick={() => onNavigate('/abriendo-camino')}
              >
                {content.botonTexto}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            )}

            <p className="mt-6 text-slate-500 text-sm">
              Tu camino continúa. Crece en comunidad.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
