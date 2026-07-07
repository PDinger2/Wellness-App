import { Card, Text, Switch } from "react-native-paper"
import { HStack } from "@/components/ui/hstack"
import { VStack } from "@/components/ui/vstack"
import { styles } from "@/constants/styles"
import { useState } from "react"

type habitCardProps = {
    title: string;
    time: string;
    isDone: boolean;
    onToggle: () => void;
}

export function HabitCard({
    title,
    time,
    isDone=false,
    onToggle
}: habitCardProps) {


    return (
        <Card mode="contained">
            <Card.Title
                title={<Text style={{
                    textDecorationLine: isDone ? "line-through" : "none",
                    opacity: isDone ? 0.6 : 1
                }}>
                    {title}
                </Text>}
                subtitle={<Text style={{
                    opacity: isDone ? 0.6 : 1
                }}>
                    {time}
                </Text>}
                left={() => (
                    <Switch value={isDone} onValueChange={onToggle}/>
                )}
            />
        </Card>
    )
}