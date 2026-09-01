"use client"

import type { MomentData, UserProgress, DayProgress } from "@/lib/types"
import { DEVOCIONALES } from "@/lib/devocionales"
import { LeeStep } from "./steps/lee-step"
import { DescubreStep } from "./steps/descubre-step"
import { ConectaStep } from "./steps/conecta-step"
import { CaminaStep } from "./steps/camina-step"
import { CompletadoStep } from "./completado-step"
import { useState } from "react"
import { getProgress, markMomentCompleted, isMomentCompleted, getNextDia } from "@/lib/storage"
import { useRouter } from "next/navigation"

export function MomentView({
  dia,
  devocional,
  moments,
}: {
  dia: number
  devocional: typeof DEVOCIONALES[0]
  moments: MomentData[]
}) {
  const router = useRouter()
  const [currentMomentIndex, setCurrentMomentIndex] = useState(0)
  const [showCompletion, setShowCompletion] = useState(false)

  const getProgressState = () => getProgress()
  const [progress, setProgress] = useState<UserProgress | null>(getProgressState)

  const currentMoment = moments[currentMomentIndex]

  const handleNextMoment = () => {
    if (currentMomentIndex < moments.length - 1) {
      setCurrentMomentIndex(currentMomentIndex + 1)
      if (progress) {
        const newProgress = markMomentCompleted(progress, dia, currentMoment.id)
        setProgress(newProgress)
      }
    } else {
      setShowCompletion(true)
      if (progress) {
        const newProgress = markMomentCompleted(progress, dia, currentMoment.id)
        setProgress(newProgress)
        const nextDia = getNextDia(newProgress, dia)
        if (nextDia !== dia) {
          setTimeout(() => {
            router.push(`/abriendo-camino/reto/1/dia/${nextDia}`)
          }, 3000)
        }
      }
    }
  }

  const handleMomentClick = (index: number) => {
    if (progress && isMomentCompleted(progress, dia, moments[index].id)) {
      setCurrentMomentIndex(index)
    } else if (index <= currentMomentIndex) {
      setCurrentMomentIndex(index)
    }
  }

  if (showCompletion || currentMoment.id === "completado") {
    return (
      <CompletadoStep
        dia={dia}
        devocional={devocional}
        progress={progress!}
        onNext={() => {
          const nextDia = getNextDia(progress!, dia)
          router.push(`/abriendo-camino/reto/1/dia/${nextDia}`)
        }}
      />
    )
  }

  switch (currentMoment.id) {
    case "lee":
      return (
        <LeeStep
          devocional={devocional}
          onNext={handleNextMoment}
          completed={isMomentCompleted(progress!, dia, "lee")}
        />
      )
    case "descubre":
      return (
        <DescubreStep
          devocional={devocional}
          onNext={handleNextMoment}
          completed={isMomentCompleted(progress!, dia, "descubre")}
        />
      )
    case "conecta":
      return (
        <ConectaStep
          devocional={devocional}
          onNext={handleNextMoment}
          completed={isMomentCompleted(progress!, dia, "conecta")}
        />
      )
    case "camina":
      return (
        <CaminaStep
          devocional={devocional}
          onNext={handleNextMoment}
          completed={isMomentCompleted(progress!, dia, "camina")}
        />
      )
    default:
      return null
  }
}