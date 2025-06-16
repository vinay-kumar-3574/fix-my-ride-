import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/card";
import { Button } from "../components/ui/button";

const plans = [
  {
    name: "Silver",
    price: "₹199/month",
    features: ["Basic roadside assistance", "2 service calls/month"],
  },
  {
    name: "Gold",
    price: "₹399/month",
    features: ["Priority service", "5 service calls/month", "Free towing (10km)"],
  },
  {
    name: "Diamond",
    price: "₹699/month",
    features: ["Unlimited service", "Free towing (50km)", "Premium support"],
  },
];

const PricingPage = () => {
  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-10">Subscription Plans</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <Card key={plan.name} className="rounded-2xl shadow-md">
            <CardHeader>
              <CardTitle className="text-xl">{plan.name}</CardTitle>
              <CardDescription className="text-lg">{plan.price}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <ul className="list-disc ml-5 text-sm text-muted-foreground">
                {plan.features.map((feature, i) => (
                  <li key={i}>{feature}</li>
                ))}
              </ul>
              <Button className="w-full mt-4">Choose {plan.name}</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PricingPage;
