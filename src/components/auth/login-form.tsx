import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Custom
import { AuthInput } from "@/components/auth/auth-input";
import { Mail, Lock } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div className={cn("flex flex-col gap-6 max-w-lg", className)} {...props}>
      <Card className="bg-transparent border-none">
        <CardHeader>
          <CardTitle className="text-center text-white text-4xl">Вхід</CardTitle>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <AuthInput
                  icon={Mail}
                  id="email"
                  type="email"
                  placeholder="E-mail"
                  required
                />
              </div>
              <div className="grid gap-3">
                <AuthInput
                  icon={Lock}
                  id="password"
                  type="password"
                  placeholder="Пароль"
                  required
                />
                <div className="flex items-center">
                  <div className="flex items-center space-x-2">
                    <Checkbox className="data-[state=checked]:bg-blue w-5 h-5 border-blue" id="rememberUser" />
                    <Label className="font-sans text-white">Запам'ятати мене?</Label>
                  </div>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline font-sans bg-transparent text-white"
                  >
                    Забули пароль?
                  </a>
                </div>
              </div>
              <div className="flex justify-center">
                <Button
                  type="submit"
                  size="sm"
                  className="text-white hover:text-dark-white rounded-full px-6 py-2 text-md font-normal font-sans bg-blue hover:bg-dark-blue cursor-pointer"
                >
                  Далі
                </Button>
              </div>
            </div>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <a href="#" className="underline underline-offset-4">
                Sign up
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
