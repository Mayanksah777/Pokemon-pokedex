import type { Metadata } from "next";
import { ThemeProvider } from "@mui/material/styles";
import { AppBar, Box, Container, CssBaseline, Toolbar, Typography } from "@mui/material";
import type { ReactNode } from "react";

import "./globals.css";
import { Providers } from "@/app/providers";
import { appTheme } from "@/app/theme";

export const metadata: Metadata = {
  title: "Pokemon Pokedex",
  description: "Next.js + Prisma + tRPC + MUI Pokemon Pokedex"
};

type RootLayoutProps = Readonly<{
  children: ReactNode;
}>;

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <ThemeProvider theme={appTheme}>
            <CssBaseline />
            <AppBar position="static">
              <Toolbar>
                <Typography variant="h6" component="h1">
                  Pokemon Pokedex
                </Typography>
              </Toolbar>
            </AppBar>
            <Container maxWidth="lg">
              <Box py={4}>{children}</Box>
            </Container>
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}
