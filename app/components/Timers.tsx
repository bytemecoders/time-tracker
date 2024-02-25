import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { format } from "date-fns";

const TimersTable = ({
  timers,
}: {
  timers: {
    description: string;
    project: string;
    priority: number;
    start: string;
    end: string | null;
  }[];
}) => {
  return (
    <Table>
  <TableCaption>A list of your timers.</TableCaption>
  <TableHeader>
    <TableRow>
      <TableHead className="w-[100px]">Description</TableHead>
      <TableHead>Project</TableHead>
      <TableHead>Priority</TableHead>
      <TableHead className="text-right">Start</TableHead>
      <TableHead className="text-right">End</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {
      timers.map((timer) => (
        <TableRow key={timer.start}>
          <TableCell>{timer.description}</TableCell>
          <TableCell>{timer.project}</TableCell>
          <TableCell>{timer.priority}</TableCell>
          <TableCell className="text-right">
            {format(new Date(timer.start), "pp")}
          </TableCell>
          <TableCell className="text-right">
            {timer.end
              ? format(new Date(timer.end), "pp")
              : "Running"}
          </TableCell>
        </TableRow>
      ))
    }
  </TableBody>
</Table>


    
  );
};

export { TimersTable };
