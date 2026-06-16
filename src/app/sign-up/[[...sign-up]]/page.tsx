import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center py-16">
      <SignUp
        appearance={{
          elements: {
            formButtonPrimary: "bg-[#63deff] hover:bg-[#39d7fc] text-[#003641]",
            card: "bg-[#132237] border border-[rgba(0,196,232,0.18)]",
            headerTitle: "text-[#F8FAFF]",
            headerSubtitle: "text-[#8BA3C0]",
            socialButtonsBlockButton: "border-[rgba(0,196,232,0.18)] text-[#d7e3fc]",
            formFieldLabel: "text-[#8BA3C0]",
            formFieldInput: "bg-[#071325] border-[rgba(0,196,232,0.18)] text-[#F8FAFF]",
            footerActionLink: "text-[#63deff]",
          },
        }}
      />
    </div>
  );
}
