import { useState, useEffect, useContext } from "react"
import { userContext } from "../../context/userContext";
import { ScreenView } from "../../ui/ScreenView"
import { Text } from "react-native-paper"

export default function WorkoutTimerPage() {
    const { user } = useContext(userContext)

    return (
        <Text>Placeholder</Text>
    )
}