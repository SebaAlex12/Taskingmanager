import React from "react"
import { Text, View, StyleSheet } from "@react-pdf/renderer"

export default function BasicTable ({item:{netValue,grossValue}}) {
    return(
    <View style={styles.table}>
        <View style={styles.tableHeader}>
          <Text style={styles.tableHeaderLP}>L.p.</Text>
          <Text style={styles.tableHeaderName}>Nazwa towaru / usluga</Text>
          <Text style={styles.tableHeaderAmount}>Ilosc</Text>
          <Text style={styles.tableHeaderLowPrice}>Cena jedn. netto</Text>
          <Text style={styles.tableHeaderVat}>Stawka Vat: 23%</Text>
          <Text style={styles.tableHeaderHightPrice}>Wartosc Brutto</Text>
        </View>
        <View style={styles.tableContent}>
        <Text style={styles.tableContentLP}>1</Text>
          <Text style={styles.tableContentName}>Nazwa towaru / usluga</Text>
          <Text style={styles.tableContentAmount}>1</Text>
          <Text style={styles.tableContentLowPrice}>{netValue}</Text>
          <Text style={styles.tableContentVat}>vat</Text>
          <Text style={styles.tableContentHightPrice}>{grossValue}</Text>
        </View>
    </View>
    )
}

const styles = StyleSheet.create({
    table:{
        marginTop: 15,
        marginBottom: 15,
        display:"flex",
        flexDirection:"column"
      },
      tableHeader:{
        flexDirection: 'row',
        borderBottomColor: '#bff0fd',
        backgroundColor: '#bff0fd',
        borderBottomWidth: 1,
        alignItems: 'center',
        textAlign: 'center',
        fontStyle: 'bold',
        fontSize:12,
      },
      tableHeaderLP:{
        width: 20,
        borderRightColor: "grey",
        borderRightWidth: 1,
        display:"inline-flex"
      },
      tableHeaderName:{
        width: 250,
        borderRightColor: "grey",
        borderRightWidth: 1,
        display:"inline-flex"
      },
      tableHeaderAmount:{
        width: 30,
        borderRightColor: "grey",
        borderRightWidth: 1,
        display:"inline-flex"
      },
      tableHeaderLowPrice:{
        width: 100,
        borderRightColor: "grey",
        borderRightWidth: 1,
        display:"inline-flex"
      },
      tableHeaderVat:{
        width: 100,
        borderRightColor: "grey",
        borderRightWidth: 1,
        display:"inline-flex"
      },
      tableHeaderHightPrice:{
        width: 100,
        borderRightColor: "grey",
        display:"inline-flex"
      },
      tableContent:{
        flexDirection: 'row',
        borderBottomColor: '#bff0fd',
        borderBottomWidth: 1,
        alignItems: 'center',
        textAlign: 'center',
        fontStyle: 'bold',
        fontSize:12,
      },
      tableContentLP:{
        width: 20,
        borderRightColor: "grey",
        borderRightWidth: 1,
        display:"inline-flex"
      },
      tableContentName:{
        width: 250,
        borderRightColor: "grey",
        borderRightWidth: 1,
        display:"inline-flex"
      },
      tableContentAmount:{
        width: 30,
        borderRightColor: "grey",
        borderRightWidth: 1,
        display:"inline-flex"
      },
      tableContentLowPrice:{
        width: 100,
        borderRightColor: "grey",
        borderRightWidth: 1,
        display:"inline-flex"
      },
      tableContentVat:{
        width: 100,
        borderRightColor: "grey",
        borderRightWidth: 1,
        display:"inline-flex"
      },
      tableContentHightPrice:{
        width: 100,
        borderRightColor: "grey",
        display:"inline-flex"
      },
})