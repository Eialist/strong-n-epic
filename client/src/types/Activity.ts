export interface Activity {
  id: number;
  title: string;
  coach: string;
  day:
    | "Monday"
    | "Tuesday"
    | "Wednesday"
    | "Thursday"
    | "Friday"
    | "Saturday"
    | "Sunday";
  created: string;
  time: string;
  description: string;
}
