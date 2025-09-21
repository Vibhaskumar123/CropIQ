"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AnimatedButton } from "@/components/ui/animated-button"
import { ArrowLeft, MapPin, AlertTriangle, CheckCircle, Info, Lightbulb, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ChevronDown } from "lucide-react"

interface AnalysisResultsProps {
  image: File | null
  crop: string | null
  onAnalysisComplete: (result: any) => void
  onViewCommunity: () => void
  onBack: () => void
}

export function AnalysisResults({ image, crop, onAnalysisComplete, onViewCommunity, onBack }: AnalysisResultsProps) {
  const [isAnalyzing, setIsAnalyzing] = useState(true)
  const [progress, setProgress] = useState(0)
  const [currentStep, setCurrentStep] = useState("")
  const [result, setResult] = useState<any>(null)
  const [expandedSection, setExpandedSection] = useState<string | null>(null)

  const analysisSteps = [
    "Preprocessing image...",
    "Detecting crop features...",
    "Analyzing disease patterns...",
    "Comparing with database...",
    "Generating recommendations...",
  ]

  useEffect(() => {
    if (isAnalyzing) {
      let stepIndex = 0
      const interval = setInterval(() => {
        if (stepIndex < analysisSteps.length) {
          setCurrentStep(analysisSteps[stepIndex])
          setProgress(((stepIndex + 1) / analysisSteps.length) * 100)
          stepIndex++
        } else {
          clearInterval(interval)
          // Simulate analysis completion
          setTimeout(() => {
            const mockResult = {
              disease: {
                name: "Early Blight",
                confidence: 87,
                image: "/plant-disease-early-blight-on-leaves.jpg",
              },
              description:
                "Early blight is a common fungal disease that affects the leaves, stems, and fruits of plants. It typically appears as dark, concentric rings on older leaves.",
              prevention: [
                "Ensure proper air circulation around plants",
                "Avoid overhead watering",
                "Remove infected plant debris",
                "Rotate crops annually",
              ],
              treatment: [
                "Apply copper-based fungicide",
                "Remove affected leaves immediately",
                "Improve drainage around plants",
                "Use organic neem oil spray",
              ],
              location: "Maharashtra, Pune",
            }
            setResult(mockResult)
            setIsAnalyzing(false)
            onAnalysisComplete(mockResult)
          }, 1000)
        }
      }, 800)

      return () => clearInterval(interval)
    }
  }, [isAnalyzing, onAnalysisComplete])

  if (isAnalyzing) {
    return (
      <div className="space-y-6 bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 min-h-screen p-6">
        <div className="flex items-center gap-4">
          <Button
            onClick={onBack}
            variant="ghost"
            size="sm"
            className="flex items-center gap-2 bg-white/80 backdrop-blur-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
          <div>
            <h2 className="text-2xl font-bold text-amber-900">AI Analysis in Progress</h2>
            <p className="text-amber-700">Our AI is analyzing your crop image...</p>
          </div>
        </div>

        <Card className="max-w-2xl mx-auto bg-white/90 backdrop-blur-sm border-amber-200">
          <CardContent className="py-12">
            <div className="text-center space-y-6">
              <div className="mx-auto w-24 h-24 bg-amber-100 rounded-full flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-amber-600 border-t-transparent rounded-full animate-spin" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-amber-900 mb-2">Analyzing Your Crop</h3>
                <p className="text-amber-700 mb-4">{currentStep}</p>
                <div className="w-full bg-amber-200 rounded-full h-2 mb-4">
                  <div
                    className="bg-amber-600 h-2 rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <p className="text-sm text-amber-600">{Math.round(progress)}% Complete</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6 bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 min-h-screen p-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button
          onClick={onBack}
          variant="ghost"
          size="sm"
          className="flex items-center gap-2 bg-white/80 backdrop-blur-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </Button>
        <div>
          <h2 className="text-2xl font-bold text-amber-900">Analysis Results</h2>
          <p className="text-amber-700">AI has completed the analysis of your {crop} image</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Disease Detection Result */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="bg-white/90 backdrop-blur-sm border-amber-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-amber-900">
                <AlertTriangle className="w-5 h-5 text-amber-600" />
                Disease Detected
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4">
                <img
                  src={result?.disease?.image || "/placeholder.svg"}
                  alt={result?.disease?.name}
                  className="w-24 h-24 rounded-lg object-cover animate-in fade-in duration-500"
                />
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-amber-900 mb-2">{result?.disease?.name}</h3>
                  <div className="flex items-center gap-4 mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-amber-800">Confidence:</span>
                      <span className="text-sm font-bold text-green-600">{result?.disease?.confidence}%</span>
                    </div>
                  </div>
                  <p className="text-sm text-amber-700">{result?.description}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Information Sections */}
          <div className="space-y-4">
            <Collapsible
              open={expandedSection === "prevention"}
              onOpenChange={() => setExpandedSection(expandedSection === "prevention" ? null : "prevention")}
            >
              <CollapsibleTrigger asChild>
                <Card className="cursor-pointer hover:shadow-md transition-shadow bg-white/90 backdrop-blur-sm border-amber-200">
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center justify-between text-amber-900">
                      <div className="flex items-center gap-2">
                        <Shield className="w-5 h-5 text-green-600" />
                        Prevention Methods
                      </div>
                      <ChevronDown
                        className={`w-4 h-4 transition-transform ${
                          expandedSection === "prevention" ? "rotate-180" : ""
                        }`}
                      />
                    </CardTitle>
                  </CardHeader>
                </Card>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <Card className="bg-white/90 backdrop-blur-sm border-amber-200">
                  <CardContent className="pt-0">
                    <ul className="space-y-2">
                      {result?.prevention?.map((item: string, index: number) => (
                        <li key={index} className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-amber-800">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </CollapsibleContent>
            </Collapsible>

            <Collapsible
              open={expandedSection === "treatment"}
              onOpenChange={() => setExpandedSection(expandedSection === "treatment" ? null : "treatment")}
            >
              <CollapsibleTrigger asChild>
                <Card className="cursor-pointer hover:shadow-md transition-shadow bg-white/90 backdrop-blur-sm border-amber-200">
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center justify-between text-amber-900">
                      <div className="flex items-center gap-2">
                        <Lightbulb className="w-5 h-5 text-amber-600" />
                        Treatment Options
                      </div>
                      <ChevronDown
                        className={`w-4 h-4 transition-transform ${
                          expandedSection === "treatment" ? "rotate-180" : ""
                        }`}
                      />
                    </CardTitle>
                  </CardHeader>
                </Card>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <Card className="bg-white/90 backdrop-blur-sm border-amber-200">
                  <CardContent className="pt-0">
                    <ul className="space-y-2">
                      {result?.treatment?.map((item: string, index: number) => (
                        <li key={index} className="flex items-start gap-2">
                          <Info className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-amber-800">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </CollapsibleContent>
            </Collapsible>
          </div>
        </div>

        {/* Community Action */}
        <div>
          <Card className="bg-white/90 backdrop-blur-sm border-amber-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-amber-900">
                <MapPin className="w-5 h-5 text-amber-600" />
                Community Insights
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-amber-700">
                Help your farming community by sharing this detection with others in your area.
              </p>
              <AnimatedButton
                onClick={onViewCommunity}
                className="w-full bg-amber-600 hover:bg-amber-700 text-white"
                ripple
              >
                View Community Map
              </AnimatedButton>
              <div className="text-xs text-amber-600 text-center">
                If this crop is from {result?.location}, click above to see regional disease patterns
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
