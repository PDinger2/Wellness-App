import { Card, Text, Switch } from "react-native-paper"
import { HStack } from "@/components/ui/hstack"
import { VStack } from "@/components/ui/vstack"
import { styles } from "@/constants/styles"
import { useState } from "react"

type habitCardProps = {
    title: string;
    time: string;
    isDone: boolean;
}

export function HabitCard({
    title,
    time,
    isDone=false
}: habitCardProps) {

    const [ finished, setFinished ] = useState(isDone)
    const onToggle = () => setFinished(!finished)

    return (
        <Card mode="contained">
            <Card.Title
                title={<Text style={{
                    textDecorationLine: finished ? "line-through" : "none",
                    opacity: finished ? 0.6 : 1
                }}>
                    {title}
                </Text>}
                subtitle={<Text style={{
                    opacity: finished ? 0.6 : 1
                }}>
                    {time}
                </Text>}
                left={() => (
                    <Switch value={finished} onValueChange={onToggle}/>
                )}
            />
        </Card>
    )
}