import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function Home() {
  const tools = [
    {
      title: "檔案壓縮",
      description: "壓縮您的檔案以節省空間",
      link: "/file-compression"
    },
    {
      title: "檔案轉換",
      description: "將檔案轉換為不同格式",
      link: "/file-converter"
    },
    {
      title: "檔案傳輸",
      description: "安全快速地傳輸您的檔案",
      link: "/file-transfer"
    },
    {
      title: "文字工具",
      description: "各種文字處理工具",
      link: "/string-tools"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="grid grid-cols-2 gap-4">
            {tools.map((tool) => (
              <Link key={tool.link} href={tool.link}>
                <Card className="h-full transition-all duration-300 hover:scale-105 dark:hover:bg-accent dark:hover:border-primary/50 hover:shadow-[0_0_15px_rgba(0,0,0,0.2)] dark:hover:shadow-[0_0_15px_rgba(255,255,255,0.1)]">
                  <CardHeader>
                    <CardTitle>{tool.title}</CardTitle>
                    <CardDescription>{tool.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>點擊使用工具</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
