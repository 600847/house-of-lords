"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/features/auth/components/header";

interface CardWrapperProfileProps {
  children: React.ReactNode;
  headerLabel: string;
}

export default function CardWrapperProfile({
  children,
  headerLabel,
}: CardWrapperProfileProps) {
  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle>{headerLabel}</CardTitle>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}
