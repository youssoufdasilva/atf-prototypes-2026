import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/sections/Hero";
import { Impact } from "@/components/sections/Impact";
import { Programs } from "@/components/sections/Programs";
import { SocialProof } from "@/components/sections/SocialProof";
import { Geographic } from "@/components/sections/Geographic";

export const Route = createFileRoute("/")({
  component: LandingPage,
});

function LandingPage() {
  return (
    <>
      <Hero />
      <Impact />
      <Programs />
      <SocialProof />
      <Geographic />
    </>
  );
}
