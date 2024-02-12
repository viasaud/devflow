import React from "react";
import { Badge } from "../ui/badge";

interface Props {
  _id: number;
  name: string;
  totalQuestions?: number;
  showCount?: boolean;
}

const Tag = ({ _id, name, totalQuestions, showCount }: Props) => {
  return <Badge />;
};

export default Tag;
