import Image from 'next/image'
import LogoSvg from '../assets/Logo.svg'
import Link from 'next/link'

export async function LogoMainMenu() {
  const logoUrl = await fetch('').catch(() => LogoSvg)

  return (
    <Link href="/">
      <Image
        className="inline-block w-auto h-auto max-w-[98px] max-h-[50px] self-start"
        src={logoUrl}
        alt=""
      />
    </Link>
  )
}
