import { LoginButton } from "@/features/auth/components/login-button";

import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <section className="h-full">
      <div className="mx-auto flex flex-col justify-center items-center">
        <h1> WELCOME TO HOUSE OF CARDS </h1>

        <div className="space-y-6">
          <LoginButton>
            <Button variant="secondary" size="lg">
              Sign In
            </Button>
          </LoginButton>
        </div>
      </div>
    </section>
  );
}
