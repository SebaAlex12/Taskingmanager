import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image
} from "@react-pdf/renderer";
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
        <Page size="A4" className="page">
          <View style={styles.header}>
            <Text>Nagłówek</Text>
          </View>
          <View style={styles.container}>
            <View style={styles.top}>
              <View style={styles.logoBox}>
                <Image style={styles.logoImage} src="logo.png" />
              </View>
              <View style={styles.dateOfIssueBox}>
                <View style={styles.dateOfIssueElement}>
                  <Text style={styles.dateOfIssueTitle}>
                    Miejsce wystawienia
                  </Text>
                  <Text style={styles.dateOfIssueValue}>Lodz</Text>
                </View>
              </View>
            </View>
            <Text>Payment number: {paymentNumber}</Text>
          </View>
          <View style={styles.footer}>
            <Text>Stopka</Text>
          </View>
        </Page>
      </Document>
    </PDFViewer>
  );
}

const styles = StyleSheet.create({
  page: {},
  header: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: "red",
    fontSize: 14,
    padding: 15,
    color: "white"
  },
  footer: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: "#000",
    fontSize: 14,
    padding: 15,
    color: "#fff"
  },
  container: {
    display: "flex",
    flexDirection: "column",
    padding: 15
  },
  top: {
    display: "flex",
    flexDirection: "row"
  },
  logoBox: {
    display: "flex",
    width: "50%"
  },
  logoImage: {
    display: "flex",
    width: 250,
    height: "auto"
  },
  dateOfIssueBox: {
    display: "flex",
    width: "100%"
  },
  dateOfIssueElement: {
    display: "flex",
    flexDirection: "row",
    width: "100%"
  },
  dateOfIssueTitle: {
    display: "flex",
    padding: 10,
    fontSize: 10
  },
  dateOfIssueValue: {
    display: "flex",
    padding: 10,
    fontSize: 10
  }
});
