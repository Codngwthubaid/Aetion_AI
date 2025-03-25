import Image from "next/image"
import Link from "next/link"
export default function Navbar() {
    return (
        <div className="root-layout">
            <nav>
                <Link href={"/"} className="flex items-center gap-2">
                    <Image src="/logo.svg" alt="logo" width={50} height={40} />
                    <h2 className="font-bold text-2xl text-primary-100">TYI</h2>
                </Link>
            </nav>
        </div>
    )
}