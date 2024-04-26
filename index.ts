#! /usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";

//Create a unique 5 digit ID for each student
const randonNumber: number = 10000 + Math.random() * 90000;

let myBalance: number = 0;

let answer = await inquirer.prompt([
  {
    name: "student",
    type: "input",
    message: chalk.blue("Enter your Name 🖉 "),
    validate: function (value) {
      if (value.trim() !== "") {
        return true;
      }
      return chalk.red(
        "⚠️  Please enter your name here!\n(Press the arrow buttons to go again)"
      );
    },
  },
  {
    name: "courses",
    type: "list",
    message: chalk.blueBright("Select the course to enrolled"),
    choices: ["HTML", "CSS", "JavaScript", "TypeScript", "Python"],
  },
]);

const tutionFee: { [key: string]: number } = {
  HTML: 2000,
  CSS: 2500,
  JavaScript: 5000,
  TypeScript: 6000,
  Python: 10000,
};

console.log(chalk.yellow(`\nTution Fees: ${tutionFee[answer.courses]}/=\n`));
console.log(chalk.yellow(`Balance: ${myBalance}\n`));

//There are options for how you want to make the payment
let paymentType = await inquirer.prompt([
  {
    name: "payment",
    type: "list",
    message: chalk.blue("Select payment method🌟"),
    choices: ["Bank Transfer", "Easypaisa", "JazzCash"],
  },
  //Select the amount
  {
    name: "amount",
    type: "input",
    message: "Transfer Money:",
    validate: function (value) {
      if (value.trim() !== "") {
        return true;
      }
      return chalk.red(
        "⚠️  Plaese enter your payment!\n(Press the arrow buttons to go again)"
      );
    },
  },
]);
console.log(
  chalk.cyan(`\nYou select payment method ${paymentType.payment}🌟\n`)
);

const tutionFees = tutionFee[answer.courses];

//ParseFloat is a function that converts a string to a number.
const paymentAmount = parseFloat(paymentType.amount);

if (tutionFees === paymentAmount) {
  console.log(
    chalk.magenta(`Congratulations, you have enrolled in ${answer.courses}😊\n`)
  );
  //After enrolling, want to check the status or want to exit
  let ans = await inquirer.prompt([
    {
      name: "select",
      type: "list",
      message: chalk.gray.bold("What would you like to do next🌟"),
      choices: ["View Status", "Exit"],
    },
  ]);
  //By selecting the view status option, the students data is visible
  if (ans.select === "View Status") {
    console.log(chalk.cyan.bold("\n🌟********Status********🌟\n"));
    console.log(chalk.gray(`✔️  Student Name ${answer.student}`));
    console.log(chalk.gray(`✔️  Student ID ${randonNumber}`));
    console.log(chalk.gray(`✔️  Course: ${answer.courses}`));
    console.log(chalk.gray(`✔️  Tution Fees Paid: ${paymentAmount}`));
    console.log(chalk.gray(`✔️  Balance: ${(myBalance += paymentAmount)}`));
  } else {
    console.log(chalk.blueBright("\nExiting Student Management System ➡️\n"));
  }
} else {
  console.log(
    chalk.red(
      "⚠️  An incorrect fee has been paid for the course you have selected\n"
    )
  );
}
