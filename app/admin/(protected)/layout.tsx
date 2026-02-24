import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Script from "next/script";

export default async function ProtectedAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const cookieStore = await cookies();
  const isAuthenticated = cookieStore.get("admin_auth");

  if (!isAuthenticated || isAuthenticated.value !== "true") {
    redirect("/admin");
  }

  return (
    <>
      {children}

      {/* Auto logout when tab closes */}
      <Script id="auto-logout" strategy="afterInteractive">
        {`
          window.addEventListener("beforeunload", function () {
            navigator.sendBeacon("/api/admin-logout");
          });
        `}
      </Script>
    </>
  );
}