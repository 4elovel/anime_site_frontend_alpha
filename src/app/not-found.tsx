import UniversalErrorPage from "./universal-error-page";

export default function NotFoundPage() {
  return <UniversalErrorPage errorCode={404} />;
}
