import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import { ChevronDown } from "lucide-react";

export default function Contents({
  dataArr,
}: {
  dataArr: {
    question: string;
    answer: string;
  }[];
}) {
  return (
    <div>
      {dataArr.map((item, index) => (
        <Accordion key={index} defaultExpanded={false}>
          <AccordionSummary
            expandIcon={<ChevronDown />}
            aria-controls={`panel${index + 1}-content`}
            id={`panel${index + 1}-header`}
          >
            <Typography component="span">{item.question}</Typography>
          </AccordionSummary>
          <AccordionDetails>{item.answer}</AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
}
