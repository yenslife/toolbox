import Link from "next/link";
import { ModeToggle } from "@/components/mode-toggle";

export function MainNav() {
  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex h-14 items-center relative">
          <Link href="/" className="absolute left-0 text-xl font-bold hover:text-primary transition-colors">
            Toolbox
          </Link>
          <div className="flex gap-6 mx-auto">
            <Link href="/file-compression" className="hover:text-primary hover:underline transition-colors">
              檔案壓縮
            </Link>
            <Link href="/file-converter" className="hover:text-primary hover:underline transition-colors">
              檔案轉換
            </Link>
            <Link href="/file-transfer" className="hover:text-primary hover:underline transition-colors">
              檔案傳輸
            </Link>
            <Link href="/string-tools" className="hover:text-primary hover:underline transition-colors">
              文字工具
            </Link>
            <Link href="/about" className="hover:text-primary hover:underline transition-colors">
              關於
            </Link>
          </div>
          <div className="absolute right-0">
            <ModeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
} 