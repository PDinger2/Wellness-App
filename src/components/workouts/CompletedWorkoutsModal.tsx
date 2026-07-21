import { Button, Text, Modal, Portal, Card, useTheme, Chip, DataTable } from "react-native-paper"
import { useState } from "react"
import { format } from "date-fns"
import { styles } from "@/constants/styles"
import { HStack } from "@/components/ui/hstack"
import { VStack } from "../ui/vstack"
import { Center } from "../ui/center"
import { User } from "@supabase/supabase-js";

type completedWorkoutProps = {
    visible: boolean;
    onDismiss: () => void;
    workouts: Object[];
}

export function CompletedWorkoutsModal({ visible, onDismiss, workouts }: completedWorkoutProps){
    // todo: build modal to display completed workouts
    // should have an entry for each workout, showing data associated with it
    // maybe use a DataTable?
    // modal will be activated via a FAB for now

    const [ time, setTime ] = useState(new Date())

    const theme = useTheme()

    return ( 
        <>
            <Modal
                visible={visible}
                onDismiss={onDismiss}
                contentContainerStyle={styles.modalContent}
            >
                <Card mode="contained" style={styles.modalCard}>
                    <Card.Title
                        title={<Text variant="titleLarge">Completed Workouts</Text>}
                    />

                    <Card.Content style={styles.stepContainer}>
                        {/* main modal content here */}
                        <Text>Completed workouts: {workouts.length}</Text>
                    </Card.Content>

                </Card>

            </Modal>

        </>
    )

}