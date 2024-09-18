import CardWrapper from "@/features/auth/components/card-wrapper";
import { FaTriangleExclamation } from "react-icons/fa6";

export default function ErrorPage() {
  return (
    <CardWrapper
      headerLabel="Something went wrong"
      backButtonHref="/auth/login"
      backButtonLabel="Back to login"
    >
      <div className="w-full flex justify-center items-center">
        <FaTriangleExclamation className="text-red-500" />
      </div>
    </CardWrapper>
  );
}
