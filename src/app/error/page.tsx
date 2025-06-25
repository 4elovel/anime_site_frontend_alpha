import UniversalErrorPage from "../universal-error-page";

export default function ErrorPage({
  searchParams,
}: {
  searchParams?: { code?: string };
}) {
  // Можна отримати код помилки з query (?code=403)
  const errorCode = searchParams?.code === "403" ? 403 : 403;
  return <UniversalErrorPage errorCode={errorCode} />;
}
