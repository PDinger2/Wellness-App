import { Card, Text, Button } from "react-native-paper"
import { HStack } from "../ui/hstack"
import { VStack } from "../ui/vstack"
import { styles } from "@/constants/styles"
import { useState } from "react"

type workoutCardProps = {
    title: string;
    time: Number;
    difficulty: string;
    targetAreas: string;
}

export function WorkoutCard({
    title,
    time,
    difficulty,
    targetAreas
}: workoutCardProps){
    console.log("Title: ", title)
    return (
        <Card mode="contained" style={{ width: "100%", alignSelf: "stretch"}}>
            <Card.Title
                title={<Text>{title}</Text>}
            />
        </Card>
    )
}