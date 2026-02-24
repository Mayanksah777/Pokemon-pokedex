import Link from "next/link";
import { Card, CardContent, Stack, Typography } from "@mui/material";

const pages = [
  {
    href: "/pokemon",
    title: "Single Pokemon Fetch",
    description: "Search one Pokemon by name."
  },
  {
    href: "/pokedex",
    title: "Multiple Pokemon Fetch",
    description: "Search multiple Pokemon names as comma-separated input."
  },
  {
    href: "/filterable-pokedex",
    title: "Filterable Pokedex",
    description: "Filter Pokemon by type with pagination."
  },
  {
    href: "/add-pokemon",
    title: "Add Pokemon",
    description: "Create a new Pokemon record in the database."
  }
];

export default function HomePage() {
  return (
    <Stack spacing={2}>
      {pages.map((page) => (
        <Card key={page.href} sx={{ height: "100%" }}>
          <CardContent>
            <Typography variant="h6" component="h2" gutterBottom>
              <Link href={page.href}>{page.title}</Link>
            </Typography>
            <Typography color="text.secondary">{page.description}</Typography>
          </CardContent>
        </Card>
      ))}
    </Stack>
  );
}
