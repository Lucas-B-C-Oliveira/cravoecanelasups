export async function Breadcrumb() {
  return (
    <nav aria-label="breadcrumb">
      <ol
        className={`
      flex flex-row gap-2
    `}
      >
        <li className="breadcrumb-item">
          <a href="#">Home</a>
        </li>
        <li className="breadcrumb-item">
          <a href="#">Produtos</a>
        </li>
      </ol>
    </nav>
  )
}
