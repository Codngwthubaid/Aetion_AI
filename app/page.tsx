"use client";

import { useTheme } from "next-themes";
import { Sun, Moon, Clock, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Home() {
  const { setTheme } = useTheme();

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-background text-center px-4">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex items-center gap-2 mb-6"
      >
        <Sparkles className="h-8 w-8 text-primary" />
        <h1 className="text-4xl font-bold tracking-tight">AEPTION AI</h1>
      </motion.div>


      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="max-w-2xl text-muted-foreground mb-10 text-lg"
      >
        An AI-powered interviewing platform that automates the first-level candidate screening process.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="p-8 rounded-2xl border bg-card shadow-lg max-w-md w-full space-y-6"
      >
        <h2 className="text-2xl font-semibold">🚀 Coming Soon</h2>
        <p className="text-muted-foreground">
          We’re working hard to bring AEPTION_AI to life. Stay tuned for updates and early access!
        </p>

        <Button className="w-full mt-4">Notify Me</Button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="fixed bottom-6 right-6"
      >
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon" className="relative">
              <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
              <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setTheme("light")}>Light</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("dark")}>Dark</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("system")}>System</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </motion.div>

      <motion.footer
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-12 text-sm text-muted-foreground flex items-center gap-1"
      >
        <Clock className="h-4 w-4" /> AI-powered innovation coming your way.
      </motion.footer>
    </main>
  );
}
