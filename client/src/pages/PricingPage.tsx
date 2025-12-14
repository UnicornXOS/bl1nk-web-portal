import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check } from "lucide-react";

interface PricingPlan {
  name: string;
  price: number;
  description: string;
  features: string[];
  cta: string;
  highlighted?: boolean;
}

const pricingPlans: PricingPlan[] = [
  {
    name: "Free",
    price: 0,
    description: "Perfect for getting started",
    features: [
      "Up to 5 AI Agents",
      "Basic documentation support",
      "Community access",
      "1 workspace",
      "Email support",
      "Basic analytics",
    ],
    cta: "Get Started",
  },
  {
    name: "Pro",
    price: 29,
    description: "For growing teams",
    features: [
      "Unlimited AI Agents",
      "Advanced documentation",
      "Priority support",
      "5 workspaces",
      "Email & chat support",
      "Advanced analytics",
      "Custom integrations",
      "API access",
      "Team collaboration",
    ],
    cta: "Start Free Trial",
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: 99,
    description: "For large organizations",
    features: [
      "Everything in Pro",
      "Unlimited workspaces",
      "Dedicated support",
      "Custom integrations",
      "SLA guarantee",
      "Advanced security",
      "SSO & SAML",
      "Custom training",
      "On-premise option",
    ],
    cta: "Contact Sales",
  },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
          Simple, Transparent Pricing
        </h1>
        <p className="text-xl text-muted-foreground">
          Choose the perfect plan for your needs. Always flexible to scale.
        </p>
      </div>

      {/* Pricing Cards */}
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8 mb-12">
        {pricingPlans.map((plan) => (
          <Card
            key={plan.name}
            className={`relative flex flex-col p-8 transition-all duration-300 hover:shadow-xl ${
              plan.highlighted
                ? "border-cyan-500/50 bg-gradient-to-br from-cyan-500/10 via-blue-500/10 to-purple-500/10 scale-105 shadow-lg"
                : "hover:scale-105"
            }`}
          >
            {/* Popular Badge */}
            {plan.highlighted && (
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                  Most Popular
                </span>
              </div>
            )}

            {/* Plan Name */}
            <h3 className="text-2xl font-bold text-foreground mb-2">
              {plan.name}
            </h3>
            <p className="text-muted-foreground mb-6">{plan.description}</p>

            {/* Price */}
            <div className="mb-6">
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold text-foreground">
                  ${plan.price}
                </span>
                <span className="text-muted-foreground">/month</span>
              </div>
              {plan.price === 0 && (
                <p className="text-sm text-muted-foreground mt-2">
                  Forever free, no credit card required
                </p>
              )}
            </div>

            {/* CTA Button */}
            <Button
              className={`w-full mb-8 transition-all duration-300 ${
                plan.highlighted
                  ? "bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white"
                  : "border border-cyan-500/30 text-cyan-500 hover:bg-cyan-500/10"
              }`}
              variant={plan.highlighted ? "default" : "outline"}
            >
              {plan.cta}
            </Button>

            {/* Features List */}
            <div className="space-y-4 flex-1">
              {plan.features.map((feature) => (
                <div key={feature} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-cyan-500 flex-shrink-0 mt-0.5" />
                  <span className="text-foreground">{feature}</span>
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>

      {/* FAQ Section */}
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
          Frequently Asked Questions
        </h2>

        <div className="space-y-6">
          {[
            {
              question: "Can I change plans anytime?",
              answer:
                "Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.",
            },
            {
              question: "Is there a free trial for Pro?",
              answer:
                "Yes, all Pro features are available for free for 14 days. No credit card required.",
            },
            {
              question: "What payment methods do you accept?",
              answer:
                "We accept all major credit cards, PayPal, and wire transfers for Enterprise plans.",
            },
            {
              question: "Do you offer discounts for annual billing?",
              answer:
                "Yes, save 20% when you pay annually. Contact our sales team for custom pricing.",
            },
          ].map((faq, index) => (
            <div key={index} className="border border-border rounded-lg p-6">
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {faq.question}
              </h3>
              <p className="text-muted-foreground">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-4xl mx-auto mt-16 text-center">
        <div className="bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-purple-500/10 border border-cyan-500/20 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            Ready to get started?
          </h2>
          <p className="text-muted-foreground mb-6">
            Join thousands of teams using bl1nk to build AI-powered solutions.
          </p>
          <Button className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white">
            Start Your Free Trial
          </Button>
        </div>
      </div>
    </div>
  );
}
