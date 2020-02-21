import React from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";
import { PDFViewer } from "@react-pdf/renderer";

export default function PaymentsToPdfInvoice(props) {
  const {
    item: {
      paymentNumber,
      companyName,
      contractorName,
      companyAddress,
      contractorAddress,
      companyNIP,
      contractorNIP,
      companyWebsite,
      companyPhone,
      contractorPhone,
      companyMail,
      contractorMail,
      companyBankName,
      companyBankAcount,
      description,
      netValue,
      grossValue,
      status,
      paymentMethod,
      createdBy,
      termAt,
      createdAt
    }
  } = props;
  return (
    <PDFViewer>
      <Document>
        <Page size="A4" style={styles.page}>
          <View style={styles.section}>
            <Text>Payment number: {paymentNumber}</Text>
          </View>
          <View style={styles.section}>
            <Text>Section #2</Text>
          </View>
        </Page>
      </Document>
    </PDFViewer>
  );
}

const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#E4E4E4"
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1
  }
});
