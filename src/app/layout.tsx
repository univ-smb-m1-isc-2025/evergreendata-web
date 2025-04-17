import Header from "@/components/Header"

export default function DashboardLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
      <html lang="en" style={{ height: "100%" }}>
        <body            
          style={{
            margin: 0,
            padding: 0,
            height: "100%",
            width: "98%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Header/>
          <main 
            style={{
              flex: 1,
            }}
          >
            {children}
          </main>
        </body>
      </html>
    )
  }