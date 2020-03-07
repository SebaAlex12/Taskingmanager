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

import moment from "moment";

import { BasicDataLeft, BasicDataCenter } from "./pdfParts/BasicData";
import { BasicTable, BasicTableSummary } from "./pdfParts/BasicTable";

export default function PaymentsToPdfInvoice(props) {
  const {
    item: { paymentNumber, createdAt }
  } = props;
  return (
    <PDFViewer>
      <Document>
        <Page size="A4" className="page">
          <View style={styles.header}>
            <View style={styles.headerLeft}>
              <Image style={styles.logoImage} src="logo.png" />
              {/* <Text>Image</Text> */}
            </View>
            <View style={styles.headerRight}>
              <View style={styles.dateOfIssueBox}>
                <View style={styles.dateOfIssuePlace}>
                  <Text>Miejsce wystawienia: </Text>
                  <Text>Rzgów</Text>
                </View>
                <View style={styles.dateOfIssueDate}>
                  <Text>Data wystawienia: </Text>
                  <Text>{moment(createdAt).format("D/M/Y")}</Text>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.top}>
            <View style={styles.invoiceTitle}>
              <Text>Faktura VAT nr</Text>
              <Text>{paymentNumber}</Text>
            </View>
          </View>
          <View style={styles.content}>
            <View style={styles.contentLeft}>
              <BasicDataLeft item={props.item} />
            </View>
            <View style={styles.contentCenter}>
              <BasicDataCenter item={props.item} />
            </View>
          </View>
          <BasicTable item={props.item} />
          <View style={styles.summary}>
            <Text style={styles.summaryText}>Podsumowanie:</Text>
            <BasicTableSummary item={props.item} />
          </View>
          <View style={styles.totalPrice}>
            <View style={styles.totalPriceNumeric}></View>
          </View>
          <View style={styles.bottom}></View>
          <View style={styles.footer}>
            <Text>Stopka</Text>
          </View>
        </Page>
      </Document>
    </PDFViewer>
  );
}

const styles = StyleSheet.create({
  page: {
    fontSize: 8
  },
  //  header begin
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    fontSize: 14,
    padding: 15
  },
  headerLeft: {
    display: "flex"
  },
  headerRight: {
    display: "flex"
  },
  logoImage: {
    display: "flex",
    width: 150,
    height: "auto"
  },
  dateOfIssueBox: {
    display: "flex",
    flexDirection: "column"
  },
  dateOfIssuePlace: {
    display: "flex",
    fontSize: 12
  },
  dateOfIssueDate: {
    display: "flex",
    fontSize: 12
  },
  // header end
  // top begin
  top: {
    display: "flex",
    flexDirection: "row"
  },
  invoiceTitle: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    textAlign: "center",
    fontSize: 20,
    fontWeight: 700
  },
  // top end
  // content begin
  content: {
    display: "flex",
    flexDirection: "column",
    padding: 15
  },
  contentLeft: {
    display: "flex",
    flexDirection: "column",
    marginBottom: 15
  },

  contentCenter: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  // content end
  // summary begin
  summary: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end"
  },
  summaryText: {
    display: "inline-flex",
    fontSize: 14,
    marginTop: 15,
    marginBottom: 15,
    marginRight: 15,
    textDecoration: "underline"
  },
  // summary table end
  // bottom begin
  bottom: {
    display: "flex"
  },
  // bottom end
  // footer begin
  footer: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: "#000",
    fontSize: 14,
    padding: 15,
    color: "#fff"
  }
  // footer end
});
