/* eslint-disable react/prop-types */

import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

function DescriptionCard({ description = "" }) {
  return (
    <div className="mt-8">
      <Card className=" md:w-[80%] mx-auto">
        <CardHeader>
          <CardTitle>Description</CardTitle>
          <CardDescription>Short description of the complaint.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">{description}</div>
            <div className="flex flex-col space-y-1.5"></div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center md:justify-end">
          <Button>Update</Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default DescriptionCard;
