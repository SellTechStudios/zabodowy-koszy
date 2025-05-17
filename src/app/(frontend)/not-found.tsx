import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="py-28 container">
      <div className="max-w-none prose">
        <h1 style={{ marginBottom: 0 }}>404</h1>
        <h3>Ups! Coś poszło nie tak... 😕</h3>
        <p className="mb-4">
          Wygląda na to, że trafiłeś na stronę, której nie ma. Może to nasza wina, a może wpisany
          adres był zły. Ale nie martw się, pomożemy Ci wrócić na właściwy tor!
        </p>
      </div>
      <Link href="/">Wróć na strone główną</Link>
    </div>
  )
}
