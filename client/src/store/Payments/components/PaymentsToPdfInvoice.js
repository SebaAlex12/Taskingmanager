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

import { BasicDataLeft, BasicDataCenter } from "./pdfParts/BasicData"
import BasicTable from "./pdfParts/BasicTable"

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
      termAt,
      createdAt
    }
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
                      <Text>{moment(createdAt).format("D/M/Y") }</Text>
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
              <View style={styles.summaryTable}>
                <View style={styles.summaryTableHeader}>
                  <Text style={styles.summaryTableHeaderLowPrice}>Cena jedn. netto</Text>
                  <Text style={styles.summaryTableHeaderVat}>Stawka Vat: 23%</Text>
                  <Text style={styles.summaryTableHeaderHightPrice}>Wartosc Brutto</Text>
                </View>
                <View style={styles.summaryTableContent}>
                  <Text style={styles.summaryTableContentLowPrice}>{netValue}</Text>
                  <Text style={styles.summaryTableContentVat}>vat</Text>
                  <Text style={styles.summaryTableContentHightPrice}>{grossValue}</Text>
                </View> 
              </View>
          </View>
          <View style={styles.totalPrice}>
                <View style={styles.totalPriceNumeric}>
                </View>
          </View>
          <View style={styles.bottom}>

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
    display: "flex",
  },
  headerRight: {
    display:"flex",
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
  dateOfIssueDate:{
    display:"flex",
    fontSize:12
  },
  // header end
  // top begin
  top: {
    display: "flex",
    flexDirection: "row"
  },
  invoiceTitle:{
    display:"flex",
    flexDirection: "column",
    justifyContent: "center",
    textAlign:"center",
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
  contentLeft:{
    display:"flex",
    flexDirection: "column",
    marginBottom: 15
  },

  contentCenter:{
    display:"flex",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  // content end
  // summary begin
  summary:{
    display:"flex",
    flexDirection:"row",
    justifyContent: "flex-end"
  },
  summaryText:{
    display:"inline-flex",
    fontSize:14,
    marginTop:15,
    marginBottom:15,
    marginRight:15,
    textDecoration:"underline"
  },
  summaryTable:{
    marginTop: 15,
    marginBottom: 15,
    display:"flex",
    flexDirection:"column"
  },
  summaryTableHeader:{
    flexDirection: 'row',
    borderBottomColor: '#bff0fd',
    backgroundColor: '#bff0fd',
    borderBottomWidth: 1,
    alignItems: 'center',
    textAlign: 'center',
    fontStyle: 'bold',
    fontSize:12,
  },
  summaryTableHeaderLowPrice:{
    width: 100,
    borderRightColor: "grey",
    borderRightWidth: 1,
    display:"inline-flex"
  },
  summaryTableHeaderVat:{
    width: 100,
    borderRightColor: "grey",
    borderRightWidth: 1,
    display:"inline-flex"
  },
  summaryTableHeaderHightPrice:{
    width: 100,
    borderRightColor: "grey",
    display:"inline-flex"
  },
  summaryTableContent:{
    flexDirection: 'row',
    borderBottomColor: '#bff0fd',
    borderBottomWidth: 1,
    alignItems: 'center',
    textAlign: 'center',
    fontStyle: 'bold',
    fontSize:12,
  },
  summaryTableContentLowPrice:{
    width: 100,
    borderRightColor: "grey",
    borderRightWidth: 1,
    display:"inline-flex"
  },
  summaryTableContentVat:{
    width: 100,
    borderRightColor: "grey",
    borderRightWidth: 1,
    display:"inline-flex"
  },
  summaryTableContentHightPrice:{
    width: 100,
    borderRightColor: "grey",
    display:"inline-flex"
  },
  // summary table end
  // bottom begin
  bottom: {
    display:"flex"
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
