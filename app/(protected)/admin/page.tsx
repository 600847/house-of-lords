"use client";
import { useCurrentRole } from "@/features/auth/hooks/use-current-role";

import { Card, CardHeader } from "@/components/ui/card";

export default function AdminPage() {
  const role = useCurrentRole();

  return (
    <Card>
      <CardHeader></CardHeader>
    </Card>
  );
}
