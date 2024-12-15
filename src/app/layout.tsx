import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { Roboto } from "next/font/google";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
import "./globals.css";
import AppBarComponent from "@/components/layout/AppBar";
import ConversationList from "@/components/layout/ConversationList";
import ProfileHeader from "@/components/conversation/ProfileHeader";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto",
});

export default function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props;
  return (
    <html lang="en">
      <body className={roboto.variable}>
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          <ThemeProvider theme={theme}>
            <div className="md:h-[90vh]">
              <AppBarComponent />
              <div className="py-10 md:p-10 flex gap-8 h-full">
                {/* List of Chats */}
                <div className="hidden md:block md:w-4/12 h-full">
                  <ConversationList />
                </div>
                {/* Selected Chat */}
                <div className="w-full md:bg-white rounded-3xl">
                  <div className="h-full flex flex-col gap-8">
                    <ProfileHeader />
                    <div className="flex-1 h-full">{children}</div>
                  </div>
                </div>
              </div>
            </div>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
