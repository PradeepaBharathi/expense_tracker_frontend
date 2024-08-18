import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchExpense } from "../../store/ExpenseSlice";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Cell,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  PieChart,
  Pie,
  Legend,
} from "recharts";
import "./chart.css";


const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#FF6666", "#9966FF"];
function Charts() {
  const dispatch = useDispatch();
  const expenses = useSelector((state) => state.expenses.allExpenses);
  const [monthTotals, setMonthTotals] = useState([]);
  const [categoryTotal, setCategoryTotal] = useState([]);

  useEffect(() => {
    dispatch(fetchExpense());
  }, []);

  useEffect(() => {
    const totals = expenses.reduce((acc, curr) => {
      const date = new Date(curr.date);
      const month = date.toLocaleString("default", { month: "long" });
      if (!acc[month]) {
        acc[month] = 0;
      }
      acc[month] += curr.amount;
      return acc;
    }, {});

    const monthOrder = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];


    const sortedTotal = Object.entries(totals)
      .sort(
        ([monthA], [monthB]) =>
          monthOrder.indexOf(monthA) - monthOrder.indexOf(monthB)
      )
      .map(([month, total]) => ({ month, total })); 

    console.log(sortedTotal);
    setMonthTotals(sortedTotal);

    const categoryTotal = expenses.reduce((acc, curr) => {
      let category = curr.category;
      if (!acc[category]) {
        acc[category] = 0;
      }
      acc[category] += curr.amount;
      return acc;
    }, {});
    console.log(categoryTotal);


    const sortedCategoryTotal = Object.entries(categoryTotal)
      .sort(([, totalA], [, totalB]) => totalA - totalB)
      .map(([category, total]) => ({ category, total })); 
    setCategoryTotal(sortedCategoryTotal);
  }, [expenses]);

  return (
    <Box className="main">
      <Box className="chart-container">
        <Box className="total-container">
          <h4>Month Wise Totals</h4>
          <TableContainer component={Paper} className="monthtable">
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Month</TableCell>
                  <TableCell>Total</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {monthTotals.map(({ month, total }) => (
                  <TableRow key={month}>
                    <TableCell>{month}</TableCell>
                    <TableCell>${total}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <h4>Category Wise Totals</h4>
          <TableContainer component={Paper} className="categorytable">
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Category</TableCell>
                  <TableCell>Total</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {categoryTotal.map(({ category, total }) => (
                  <TableRow key={category}>
                    <TableCell>{category}</TableCell>
                    <TableCell>${total}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
        <Box className="charts">
          <h4>Month Wise Totals</h4>
          <ResponsiveContainer width="100%" height={250} className='linechart'>
            <LineChart data={monthTotals}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <CartesianGrid strokeDasharray="3 3" />
              <Line type="monotone" dataKey="total" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>

          <h4>Category Wise Totals</h4>
          <ResponsiveContainer width="100%" height={300} className='piechart'>
            <PieChart>
              <Pie
                data={categoryTotal}
                dataKey="total"
                nameKey="category"
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                label
              >
                {categoryTotal.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Legend className="pie-chart-legend"/>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Box>
      </Box>
    </Box>
  );
}

export default Charts;
