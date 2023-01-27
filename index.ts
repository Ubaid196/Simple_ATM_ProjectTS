#! /usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";
import chalkAnimation from "chalk-animation";
import showBanner from "node-banner";

async function myBanner() {
  await showBanner(
    "\nATM",
    chalk.blue("Welcome to simple ATM!"),
    "green"
  );
}
await myBanner();

async function bankDetails() {
  type answers = {
    userID: String;
    pin: number;
    accType: String;
    Options: String;
    cashAmount: number;
  };

  let Input: answers = await inquirer.prompt([
    {
      name: "userID",
      type: "string",
      message: "Kindly Enter your User ID: ",
    },
    {
      name: "pin",
      type: "password",
      message: "Kindly Enter your PIN: ",
      when(answers) {
        return answers.userID;
      },
    },
    {
      name: "accType",
      type: "list",
      choices: ["Current Account", "Savings Account"],
      message: "Choose Your Account Type: ",
      when(answers) {
        return answers.pin;
      },
    },
    {
      name: "Options",
      type: "list",
      choices: ["Fast Cash", "Cash Withdrawal"],
      message: "Choose given below: ",
      when(answers) {
        return answers.accType;
      },
    },
    {
      name: "cashAmount",
      type: "list",
      choices: [1000, 3000, 5000, 10000],
      message: "Choose Amount: ",
      when(answers) {
        return answers.Options === "Fast Cash";
      },
    },
    {
      name: "cashAmount",
      type: "number",
      message: "Choose Amount: ",
      when(answers) {
        return answers.Options === "Cash Withdrawal";
      },
    },
  ]);

  // console.log(Input.pin, Input.userID, Input.accType, Input.Options);

  const { userID, pin, accType, Options, cashAmount } = Input;

  const Balance = Math.floor(Math.random() * 100000);

  if (userID && pin && cashAmount) {
    console.log(`Account Balance = ${Balance}`);
    if (Balance > cashAmount) {
      let currentBalance = Balance - cashAmount;
      console.log(
        `Transaction successful! \nYour current balance is ${currentBalance}`
      );
    } else {
      console.log("Transaction stopped! Insufficient Balance.");
    }
  }
}
// bankDetails();

async function againStart() {
  do {
    await bankDetails();
    var goAgain = await inquirer.prompt({
      type: "input",
      name: "restart",
      message: "Do you want to continue? Press y or n: ",
    });
  } while (
    goAgain.restart == "y" ||
    goAgain.restart == "Y" ||
    goAgain.restart == "yes" ||
    goAgain.restart == "YES"
  );
}
againStart();

