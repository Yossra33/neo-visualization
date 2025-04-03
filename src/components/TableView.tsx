import React from "react";
import { Table, TableBody, TableCell, TableHead, TableRow, TableContainer, Paper } from "@mui/material";

interface TableViewProps {
  data: any[];
}

const TableView: React.FC<TableViewProps> = ({ data }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            {data[0]?.map((header: string, index: number) => (
              <TableCell key={index} align="center">
                {header}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.slice(1).map((row: any[], index: number) => (
            <TableRow key={index}>
              {row.map((cell, index) => (
                <TableCell key={index} align="center">
                  {cell}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableView;
