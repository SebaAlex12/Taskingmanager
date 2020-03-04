import React from "react"
import { Text, View, StyleSheet } from "@react-pdf/renderer"

export const BasicDataLeft = ({item:{ companyName, companyAddress, companyNIP, contractorName, contractorAddress, contractorNIP }}) => {
    return(
       <React.Fragment> 
            <View style={styles.contentElement}>
                <Text style={styles.contentLabel}>Sprzedawca</Text>
                <Text style={styles.contentValue}>{companyName}</Text>
            </View>
            <View style={styles.contentElement}>
                <Text style={styles.contentLabel}>Adres</Text>
                <Text style={styles.contentValue}>{companyAddress}</Text>
            </View>
            <View style={styles.contentElement}>
                <Text style={styles.contentLabel}>Numer NIP</Text>
                <Text style={styles.contentValue}>{companyNIP}</Text>
            </View>
            <View style={styles.contentElement}>
                <Text style={styles.contentLabel}>Nabywca</Text>
                <Text style={styles.contentValue}>{contractorName}</Text>
            </View>
            <View style={styles.contentElement}>
                <Text style={styles.contentLabel}>Adres</Text>
                <Text style={styles.contentValue}>{contractorAddress}</Text>
            </View>
            <View style={styles.contentElement}>
                <Text style={styles.contentLabel}>Numer NIP</Text>
                <Text style={styles.contentValue}>{contractorNIP}</Text>
            </View>
    </React.Fragment>
    )
}

export const BasicDataCenter = ({item:{ paymentMethod, termAt, companyBankName, companyBankAcount }}) => {
    return(
       <React.Fragment> 
            <View style={styles.contentCenterHalf}>
                <View style={styles.contentElement}>
                    <Text style={styles.contentLabel}>Sposób zaplaty</Text>
                    <Text style={styles.contentValue}>{paymentMethod}</Text>
                </View>
                <View style={styles.contentElement}>
                    <Text style={styles.contentLabel}>Termin zaplaty</Text>
                    <Text style={styles.contentValue}>{termAt}</Text>
                </View>
            </View>
            <View style={styles.contentCenterHalf}>
                <View style={styles.contentElement}>
                    <Text style={styles.contentLabel}>Bank</Text>
                    <Text style={styles.contentValue}>{companyBankName}</Text>
                </View>
                <View style={styles.contentElement}>
                    <Text style={styles.contentLabel}>Numer konta</Text>
                    <Text style={styles.contentValue}>{companyBankAcount}</Text>
                </View>
            </View>
    </React.Fragment>
    )
}

const styles = StyleSheet.create({
    contentElement:{
        display:"flex",
        flexDirection:"row",
      },
      contentLabel:{
        display:"flex",
        margin:3,
        fontSize: 12,
        textDecoration: "underline",
        fontStyle: "bold"
      },
      contentValue:{
        display:"flex",
        fontSize: 12,
        margin:3
      },
      contentCenterHalf:{
        display:"flex",
        flexDirection: "column"
      },
})