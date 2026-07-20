import { Card, Text, Button, Chip } from "react-native-paper"
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
    return (
        <Card mode="contained" style={{ width: "100%", alignSelf: "stretch"}}>
            <Card.Title
                title={<Text>{title}</Text>}
            />
            <Card.Content>
                <HStack style={{ width: "100%", flexWrap: "wrap"}} space="sm">
                    <Chip mode="outlined" compact>{time} mins</Chip>
                    <Chip mode="outlined" compact>{difficulty}</Chip>
                    <Chip mode="outlined" compact>{targetAreas}</Chip>
                </HStack>
            </Card.Content>
        </Card>
    )
}