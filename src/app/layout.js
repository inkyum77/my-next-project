import "./globals.css";
import Header from "./components/Header";

export default function RootLayout({ children }) {
  return (
    <html lang="en" style={{textAlign: "center", marginTop: "50px"}}>
      <body>
        <Header/>
        {children}
      </body>
    </html>
  );
}
