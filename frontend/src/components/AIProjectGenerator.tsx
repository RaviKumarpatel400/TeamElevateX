import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { ArrowLeft, Sparkles, Lightbulb, Target, Code, Zap, RefreshCw } from 'lucide-react'

interface AIProjectGeneratorProps {
  onBack: () => void
}

interface ProjectSuggestion {
  id: string
  title: string
  description: string
  features: string[]
  technologies: string[]
  timeline: string
  complexity: 'Simple' | 'Medium' | 'Complex'
  estimatedCost: string
}

export default function AIProjectGenerator({ onBack }: AIProjectGeneratorProps) {
  const [industry, setIndustry] = useState('')
  const [goals, setGoals] = useState('')
  const [budget, setBudget] = useState('')
  const [suggestions, setSuggestions] = useState<ProjectSuggestion[]>([])
  const [isGenerating, setIsGenerating] = useState(false)
  const [selectedSuggestion, setSelectedSuggestion] = useState<ProjectSuggestion | null>(null)

  const industries = [
    'E-commerce/Retail',
    'Healthcare',
    'Education',
    'Finance/FinTech',
    'Real Estate',
    'Food & Beverage',
    'Travel & Tourism',
    'Fitness & Wellness',
    'Entertainment',
    'Professional Services',
    'Non-Profit',
    'Technology/SaaS',
    'Other'
  ]

  const budgetRanges = [
    'Under $5,000',
    '$5,000 - $15,000',
    '$15,000 - $30,000',
    '$30,000 - $50,000',
    '$50,000+',
    'I need guidance on this'
  ]

  // Mock AI-generated suggestions (in real app, this would call an AI API)
  const generateSuggestions = async () => {
    setIsGenerating(true)
    
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 3000))
    
    const mockSuggestions: ProjectSuggestion[] = [
      {
        id: '1',
        title: 'Smart Inventory Management System',
        description: 'A comprehensive web application for tracking inventory, managing suppliers, and generating automated reports with real-time analytics.',
        features: ['Real-time inventory tracking', 'Supplier management', 'Automated reordering', 'Analytics dashboard', 'Mobile app for warehouse staff'],
        technologies: ['React', 'Node.js', 'MongoDB', 'React Native'],
        timeline: '3-4 months',
        complexity: 'Medium',
        estimatedCost: '$25,000 - $35,000'
      },
      {
        id: '2',
        title: 'Customer Loyalty Mobile App',
        description: 'A cross-platform mobile app that rewards customers for purchases and engagement, with gamification elements and personalized offers.',
        features: ['Points & rewards system', 'Push notifications', 'Personalized offers', 'Social sharing', 'Admin dashboard'],
        technologies: ['React Native', 'Firebase', 'Node.js', 'Stripe'],
        timeline: '2-3 months',
        complexity: 'Simple',
        estimatedCost: '$15,000 - $25,000'
      },
      {
        id: '3',
        title: 'AI-Powered Analytics Platform',
        description: 'Advanced business intelligence platform with machine learning capabilities for predictive analytics and automated insights.',
        features: ['ML-powered insights', 'Custom dashboards', 'Automated reporting', 'Data visualization', 'API integrations'],
        technologies: ['React', 'Python', 'TensorFlow', 'AWS', 'PostgreSQL'],
        timeline: '5-6 months',
        complexity: 'Complex',
        estimatedCost: '$45,000 - $65,000'
      }
    ]
    
    setSuggestions(mockSuggestions)
    setIsGenerating(false)
  }

  const handleSelectSuggestion = (suggestion: ProjectSuggestion) => {
    setSelectedSuggestion(suggestion)
  }

  const getComplexityColor = (complexity: ProjectSuggestion['complexity']) => {
    switch (complexity) {
      case 'Simple': return 'text-green-500 bg-green-500/10'
      case 'Medium': return 'text-orange-500 bg-orange-500/10'
      case 'Complex': return 'text-red-500 bg-red-500/10'
      default: return 'text-gray-500 bg-gray-500/10'
    }
  }

  if (selectedSuggestion) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center mb-8">
          <Button 
            variant="ghost" 
            onClick={() => setSelectedSuggestion(null)}
            className="text-accent hover:text-accent-foreground mr-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Suggestions
          </Button>
          <h2 className="text-3xl font-bold text-foreground">Project Details</h2>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-2xl">
              <Target className="w-6 h-6 mr-3 text-accent" />
              {selectedSuggestion.title}
            </CardTitle>
            <div className="flex items-center gap-4 mt-4">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getComplexityColor(selectedSuggestion.complexity)}`}>
                {selectedSuggestion.complexity}
              </span>
              <span className="text-muted-foreground">{selectedSuggestion.timeline}</span>
              <span className="text-accent font-semibold">{selectedSuggestion.estimatedCost}</span>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Project Description</h3>
              <p className="text-muted-foreground leading-relaxed">
                {selectedSuggestion.description}
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4">Key Features</h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {selectedSuggestion.features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <Zap className="w-4 h-4 text-accent mr-3 flex-shrink-0" />
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4">Recommended Technologies</h3>
              <div className="flex flex-wrap gap-3">
                {selectedSuggestion.technologies.map((tech) => (
                  <span 
                    key={tech}
                    className="px-3 py-2 bg-accent/10 text-accent rounded-lg text-sm font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex gap-4 pt-6">
              <Button 
                size="lg"
                className="bg-accent hover:bg-accent/90 text-accent-foreground"
                onClick={() => {
                  // In real app, this would navigate to consultation form with pre-filled data
                  alert('This would start the consultation process with pre-filled project details!')
                }}
              >
                Start This Project
              </Button>
              <Button 
                size="lg"
                variant="outline"
                onClick={() => setSelectedSuggestion(null)}
              >
                View Other Suggestions
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center mb-8">
        <Button 
          variant="ghost" 
          onClick={onBack}
          className="text-accent hover:text-accent-foreground mr-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Options
        </Button>
        <h2 className="text-3xl font-bold text-foreground">AI Project Generator</h2>
      </div>

      {suggestions.length === 0 ? (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-2xl">
              <Sparkles className="w-6 h-6 mr-3 text-accent" />
              Let AI Generate Perfect Project Ideas
            </CardTitle>
            <CardDescription>
              Tell us about your business and goals, and our AI will suggest customized project solutions.
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <div className="space-y-6">
              <div>
                <Label htmlFor="industry">What industry are you in? *</Label>
                <Select value={industry} onValueChange={setIndustry}>
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Select your industry" />
                  </SelectTrigger>
                  <SelectContent>
                    {industries.map((ind) => (
                      <SelectItem key={ind} value={ind}>{ind}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="goals">What are your main business goals? *</Label>
                <Textarea
                  id="goals"
                  placeholder="e.g., Increase customer engagement, automate processes, improve efficiency, expand online presence..."
                  value={goals}
                  onChange={(e) => setGoals(e.target.value)}
                  rows={4}
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="budget">What's your approximate budget?</Label>
                <Select value={budget} onValueChange={setBudget}>
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Select budget range" />
                  </SelectTrigger>
                  <SelectContent>
                    {budgetRanges.map((range) => (
                      <SelectItem key={range} value={range}>{range}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button
                size="lg"
                onClick={generateSuggestions}
                disabled={!industry || !goals || isGenerating}
                className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                    AI is thinking...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 mr-2" />
                    Generate Project Ideas
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div>
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              AI-Generated Project Suggestions
            </h3>
            <p className="text-muted-foreground">
              Based on your industry and goals, here are some customized project ideas:
            </p>
          </div>

          <div className="grid gap-6">
            {suggestions.map((suggestion, index) => (
              <Card 
                key={suggestion.id}
                className="cursor-pointer hover:shadow-xl transition-all duration-300 hover:scale-[1.02] border-2 hover:border-accent"
                onClick={() => handleSelectSuggestion(suggestion)}
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-xl group-hover:text-accent transition-colors">
                      {suggestion.title}
                    </CardTitle>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getComplexityColor(suggestion.complexity)}`}>
                      {suggestion.complexity}
                    </span>
                  </div>
                  <CardDescription className="leading-relaxed">
                    {suggestion.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {suggestion.technologies.slice(0, 4).map((tech) => (
                      <span 
                        key={tech}
                        className="px-2 py-1 bg-accent/10 text-accent rounded text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                    {suggestion.technologies.length > 4 && (
                      <span className="text-sm text-muted-foreground">
                        +{suggestion.technologies.length - 4} more
                      </span>
                    )}
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">
                      Timeline: {suggestion.timeline}
                    </span>
                    <span className="text-accent font-semibold">
                      {suggestion.estimatedCost}
                    </span>
                  </div>
                  
                  <div className="mt-4 flex items-center text-accent hover:text-accent-foreground font-medium">
                    <Lightbulb className="w-4 h-4 mr-2" />
                    View Details
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8">
            <Button
              variant="outline"
              onClick={() => {
                setSuggestions([])
                setIndustry('')
                setGoals('')
                setBudget('')
              }}
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Generate New Ideas
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}