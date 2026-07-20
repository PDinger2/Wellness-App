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
    tags: string[];
}

export function WorkoutCard({
    title,
    time,
    difficulty,
    targetAreas,
    tags
}: workoutCardProps){
    return (
        <Card mode="contained" style={{ width: "100%", alignSelf: "stretch"}}>
            <Card.Title
                title={<Text variant="titleMedium">{title}</Text>}
            />
            <Card.Content>
                <HStack style={{ width: "100%", flexWrap: "wrap"}} space="sm">
                    <Chip mode="outlined" compact><Text variant="labelSmall">{time} mins</Text></Chip>
                    <Chip mode="outlined" compact><Text variant="labelSmall">{difficulty}</Text></Chip>
                    <Chip mode="outlined" compact><Text variant="labelSmall">{targetAreas}</Text></Chip>
                </HStack>
            </Card.Content>
        </Card>
    )
}