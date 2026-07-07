import { styles } from "@/constants/styles";
import { VStack } from "@/components/ui/vstack";
import { startOfWeek, addDays } from "date-fns"
import { Text, Button, Avatar, TouchableRipple, useTheme } from "react-native-paper"
import { useState, useEffect, Fragment } from "react";

function getWeek() {
    // using Date() and date-fns to get current week, returning array of objects
    const sunday = startOfWeek(new Date())
    const weekArray = Array.from({length: 7}, (_, cur) => {
        const date = addDays(sunday, cur)
        /* return format:
            label: "Sunday/Monday/Tuesday/etc..."
            fullDate: "mm/dd/yyyy"
            dayNumber: "dd" (integer)
        */
        return {
            label: date.toLocaleString('default', {weekday: "long"}),
            fullDate: date.toLocaleString('default', {year: "numeric", day: "numeric", month: "numeric"}),
            dayNumber: date.toLocaleString('default', {day: "numeric"})
        }
    })

    return weekArray
}


export function WeekStrip() {
    const [ selectedDate, setSelectedDate ] = useState(0)
    const weekArray = getWeek()
    const days = weekArray.map((day) => day.dayNumber)
    return (
        <>
        <Text>Days:</Text>
        <VStack style={styles.columnContainer} space="md">
            {/* todo: create new component for a button with special functionality, using state to change filled/outline status */}
            {weekArray.map((day) => (
                    <Button mode="contained" compact rippleColor="rgba(0,0,0,0)" onPress={() => console.log("pressed")} key={day.dayNumber}>{day.label} {day.fullDate}</Button>
            ))}
        </VStack>
        </>
    )
}