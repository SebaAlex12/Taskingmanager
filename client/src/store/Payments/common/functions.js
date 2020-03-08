import { months } from "../../ini";

export const patternInvoiceNumberGenerator = (
  lastInsertPatternPaymentNumber,
  lastInsertInvoicePaymentNumber,
  pattern = false,
  invoice = false,
  year = "",
  month = ""
) => {
  //   const { lastInsertPattern, lastInsertInvoice } = this.props;
  let number = [];
  let str = "";

  console.log("last insert patt", lastInsertPatternPaymentNumber);
  console.log("last insert inv", lastInsertInvoicePaymentNumber);

  console.log("pattern", pattern);
  console.log("invoice", invoice);
  if (invoice) {
    // generate next invoice number
    let newNumber = 1;
    if (lastInsertInvoicePaymentNumber) {
      let lastInvoiceNumber = lastInsertInvoicePaymentNumber;
      let arr = lastInvoiceNumber.split("/");
      let clearNumber = null;
      console.log("arr", arr);
      arr.forEach(value => {
        if (value.includes("I")) {
          clearNumber = parseInt(value.replace("I", ""));
        }
      });
      newNumber = clearNumber + 1;
    }
    str = "I" + newNumber;
    console.log("str", str);
    number.push(str);
  }
  if (pattern) {
    // generate next pattern number
    let newNumber = 1;
    if (lastInsertPatternPaymentNumber) {
      let lastPatternNumber = lastInsertPatternPaymentNumber;
      let arr = lastPatternNumber.split("/");
      let clearNumber = null;
      console.log("arr", arr);
      arr.forEach(value => {
        if (value.includes("P")) {
          clearNumber = parseInt(value.replace("P", ""));
        }
      });

      newNumber = clearNumber + 1;
    }
    str = "P" + newNumber;
    console.log("str", str);
    number.push(str);
  }
  if (month.length > 0) {
    const monthSelected = months.filter(m => m.name === month);
    number.push("M" + monthSelected[0].value);
  }
  if (year.length > 0) number.push("Y" + year);

  number = number.join("/");

  return number;
};

export const getNumbers = (patternNumber = null, invoiceNumber = null) => {
  let numbers = {};
  let arr = [];
  let clearNumber = "";

  if (patternNumber) {
    arr = patternNumber.split("/");
    arr.forEach(value => {
      if (value.includes("P")) {
        clearNumber = parseInt(value.replace("P", ""));
      }
    });
    numbers.patternNumber = clearNumber;
  }

  if (invoiceNumber) {
    arr = invoiceNumber.split("/");
    arr.forEach(value => {
      if (value.includes("I")) {
        clearNumber = parseInt(value.replace("I", ""));
      }
    });
    numbers.invoiceNumber = clearNumber;
  }
  return numbers;
};
