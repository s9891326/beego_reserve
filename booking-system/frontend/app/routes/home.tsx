import type { Route } from "./+types/home";
import Calendar from "~/calendar/calendar";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
    return <Calendar/>;
}
